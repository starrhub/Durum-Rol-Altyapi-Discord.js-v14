const { Events, EmbedBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: Events.PresenceUpdate,
    async execute(oldPresence, newPresence) {
        if (!oldPresence || !newPresence) return;
        
        const guild = newPresence.guild;
        if (!guild) return;
        
        const member = newPresence.member;
        if (!member) return;
        
        const logChannel = guild.channels.cache.get(config.logChannelId);
        if (!logChannel) return;

        const currentStatus = newPresence.activities
            .map(activity => activity.state)
            .filter(state => state !== null)
            .join(' | ');

        for (const statusRole of config.statusRoles) {
            const role = guild.roles.cache.get(statusRole.roleId);
            if (!role) continue;

            const hasStatus = statusRole.statusTexts.some(text => 
                currentStatus.toLowerCase().includes(text.toLowerCase())
            );

            const hadRole = member.roles.cache.has(role.id);

            if (hasStatus && !hadRole) {
                try {
                    await member.roles.add(role);
                    const addEmbed = new EmbedBuilder()
                        .setColor('#00ff00')
                        .setTitle('🎭 Durum Rolü Verildi')
                        .setDescription(`${member} kullanıcısına **${role.name}** rolü verildi!`)
                        .addFields(
                            { name: '👤 Kullanıcı', value: `${member.user.tag} (${member.id})`, inline: true },
                            { name: '🎯 Rol', value: `${role.name} (${role.id})`, inline: true },
                            { name: '⏰ Zaman', value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true },
                            { name: '📝 Durum', value: `\`${currentStatus || 'Belirtilmemiş'}\`` }
                        )
                        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                        .setTimestamp();

                    logChannel.send({ embeds: [addEmbed] });
                } catch (error) {
                    console.error('Rol verme hatası:', error);
                }
            } else if (!hasStatus && hadRole) {
                try {
                    await member.roles.remove(role);
                    const removeEmbed = new EmbedBuilder()
                        .setColor('#ff0000')
                        .setTitle('🎭 Durum Rolü Alındı')
                        .setDescription(`${member} kullanıcısından **${role.name}** rolü alındı!`)
                        .addFields(
                            { name: '👤 Kullanıcı', value: `${member.user.tag} (${member.id})`, inline: true },
                            { name: '🎯 Rol', value: `${role.name} (${role.id})`, inline: true },
                            { name: '⏰ Zaman', value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true },
                            { name: '📝 Yeni Durum', value: `\`${currentStatus || 'Durum Yok'}\`` }
                        )
                        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                        .setTimestamp();

                    logChannel.send({ embeds: [removeEmbed] });
                } catch (error) {
                    console.error('Rol alma hatası:', error);
                }
            }
        }
    }
};
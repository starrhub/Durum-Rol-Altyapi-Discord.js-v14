# Durum Rol Sistemi Discord.js v14 Altyapısı

Bu altyapı, Discord.js v14 kullanılarak kodlanmış bir durum rol sistemi altyapısıdır.

## 🔧 Kurulum

### Gereksinimler
- [Node.js](https://nodejs.org/en/) (v16.9.0 veya üstü)
- Bir metin editörü (örn: VSCode, Sublime Text)
- Bir Discord botu ([Discord Developer Portal](https://discord.com/developers/applications))

### Adımlar
1. Bu repoyu indirin:

Bu projeyi indirin ve metin editöründe açın.

2. Gerekli modülleri yükleyin:
```bash
npm install
```

3. `config.json` dosyasını düzenleyin:
```json
{
    "token": "BOT_TOKEN",
    "clientId": "BOT_ID",
    "guildId": "SUNUCU_ID",
    "logChannelId": "LOG_ID",
    "statusRoles": [
        {
            "roleId": "ROL_ID",
            "statusTexts": ["Shell Co.", "Altyapılar"]
        },
        {
            "roleId": "ROL_ID",
            "statusTexts": ["Starr Inc.", "Kod"]
        }
    ]
}
```

4. Botu başlatın:
```bash
node .
```

## 📝 Özellikler
- Hızlıca ``config.json`` dosyasından kurulumu yaon.
- İstediğiniz gibi özelleştirin.
- Log kanalı ile tüm yapılan işlemleri kaydedin.

## 🤝 Destek
Herhangi bir sorun için [Shell Co.](https://discord.gg/ekePqzFJUz) Discord sunucumuza katılabilirsiniz.

## 📜 Lisans
Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasına bakın.

## ⭐ Star
Beğendiyseniz star atmayı unutmayın!

---
Developed with ❤️ by [Shell Co.](https://discord.gg/ekePqzFJUz)

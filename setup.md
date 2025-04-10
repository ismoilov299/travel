# West is Best Travel Agency saytini o'rnatish yo'riqnomasi

## 1. Telegram bot yaratish va sozlash

1. Telegram-da @BotFather bilan muloqot boshlang (/start)
2. `/newbot` buyrug'ini yuborib, yangi bot yarating
3. Bot nomini kiritib, keyin uning foydalanuvchi nomini (@username) kiriting
4. BotFather botingizning API tokenini beradi - buni saqlang!

### Chat ID olish

1. Yangi yaratilgan botni guruhga qo'shing yoki personal chat oching
2. Bot bilan bir nechta xabar almashing
3. Brauzerda quyidagi URL manzilga o'ting (tokenni o'zgartiring):
   ```
   https://api.telegram.org/bot<BOT_TOKEN>/getUpdates
   ```
4. Javobdan "chat" -> "id" qiymatini toping. Bu sizning chat ID raqamingiz.

### Bot token va chat ID ni sozlash

scripts.js faylidagi quyidagi qatorlarni o'zgartiring:
```javascript
const botToken = 'BOT_TOKEN'; // O'zingizning bot tokeningiz bilan almashtiring
const chatId = 'CHAT_ID';     // O'zingizning chat ID raqamingiz bilan almashtiring
```

## 2. Fayl tizimni tayyorlash

Serverdagi `/home/travel_agency` papkasini yarating va huquqlarni sozlang:
```bash
sudo mkdir -p /home/travel_agency
sudo chown -R www-data:www-data /home/travel_agency
sudo chmod -R 755 /home/travel_agency
```

## 3. Sayt fayllarini yuklash

Barcha sayt fayllarini yaratilgan papkaga yuklang:
```bash
# Misol uchun SCP orqali yuklash (local kompyuterdan)
scp index.html style.css scripts.js user@server:/home/travel_agency/

# Yoki serverdagi papkaga yangi fayllar yaratib, unga kontent qo'shing
sudo nano /home/travel_agency/index.html
sudo nano /home/travel_agency/style.css
sudo nano /home/travel_agency/scripts.js
```

## 4. Nginx konfiguratsiyasini sozlash

1. Nginx konfiguratsiya faylini yarating:
```bash
sudo nano /etc/nginx/sites-available/westtravel.uz
```

2. Taqdim etilgan Nginx konfiguratsiyasini shu faylga qo'ying

3. Fayl huquqlarini to'g'rilang:
```bash
sudo chmod 644 /etc/nginx/sites-available/westtravel.uz
```

4. Konfiguratsiyani yoqish:
```bash
sudo ln -s /etc/nginx/sites-available/westtravel.uz /etc/nginx/sites-enabled/
```

5. Konfiguratsiyani tekshiring:
```bash
sudo nginx -t
```

6. Nginx qayta ishga tushuring:
```bash
sudo systemctl reload nginx
```

## 5. DNS sozlamalarini o'rnatish

Domain registratoringiz orqali westtravel.uz DNS A yozuvini 46.17.104.198 IP manziliga yo'naltiring.

## 6. SSL sertifikat (ixtiyoriy, lekin tavsiya etiladi)

Let's Encrypt sertifikatini o'rnatish:
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d westtravel.uz -d www.westtravel.uz
```

## 7. Testlash va tekshirish

1. Brauzerda westtravel.uz manzilini oching
2. Saytning to'g'ri ko'rsatilishini tekshiring
3. Forma orqali ma'lumot yuborib, Telegram botda xabar kelishini tekshiring

## Muammolarni bartaraf etish

* Agar sayt ochilmasa:
  * `sudo systemctl status nginx` orqali Nginx holatini tekshiring
  * `sudo tail -f /var/log/nginx/error.log` orqali xatolik loglarini ko'ring
  * DNS-ning to'g'ri sozlanganligini tekshiring

* Agar Telegram xabarlari kelmasa:
  * Bot tokenini va chat ID ni tekshiring
  * Brauzer konsolida xatoliklarni tekshiring
  * `curl -X POST "https://api.telegram.org/bot<TOKEN>/sendMessage" -d "chat_id=<CHAT_ID>&text=Test"` orqali qo'lda testlang
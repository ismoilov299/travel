const botToken = '7689548499:AAFPd9WDlqnPxFSe4nkbvIpb76hrto3iPOU'; 
const chatId = '1161180912';  //'7286297692';     

function sendToTelegram(name, phone) {
    const message = `🔔 Yangi so'rov!\n\n👤 Ism: ${name}\n📞 Telefon: ${phone}`;
    
    // Telegram API URL
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    // Fetch so'rovi orqali xabarni yuborish
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log('Telegram xabari yuborildi');
        } else {
            console.error('Telegram xabarini yuborishda xatolik:', data);
        }
    })
    .catch(error => {
        console.error('Telegram xabarini yuborishda xatolik:', error);
    });
}

// Til almashtirish funksiyasi
function changeLanguage(lang) {
    if (lang === 'uz') {
        document.querySelectorAll('.lang-ru').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.lang-uz').forEach(el => el.style.display = 'block');
    } else if (lang === 'ru') {
        document.querySelectorAll('.lang-uz').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.lang-ru').forEach(el => el.style.display = 'block');
    } else if (lang === 'en') {
        document.querySelectorAll('.lang-uz').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.lang-ru').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'block');
    }
    
    // Linklar va tugmalar uchun inline-block stillarni qo'llash
    document.querySelectorAll('a.lang-' + lang).forEach(el => el.style.display = 'inline-block');
    document.querySelectorAll('button.lang-' + lang).forEach(el => el.style.display = 'inline-block');
    
    // Save language preference to localStorage
    localStorage.setItem('preferredLanguage', lang);
    
    console.log('Til o\'zgartirildi:', lang);
}

// Sahifa elementlari uchun hodisalarni o'rnatish
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM yuklandi');
    
    // Avvalgi til tanlovini tekshirish va qo'llash
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        console.log('Saqlangan til topildi:', savedLanguage);
        changeLanguage(savedLanguage);
        // Update the language selector to match the saved preference
        const languageSelector = document.getElementById('language-selector');
        if (languageSelector) {
            languageSelector.value = savedLanguage;
        }
    } else {
        // Default to Uzbek if no saved preference
        console.log('Standart til o\'rnatildi: uz');
        changeLanguage('uz');
    }
    
    // Til o'zgartirish hodisasini qo'shish
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            console.log('Til tanlagich o\'zgartirildi:', this.value);
            changeLanguage(this.value);
        });
    }
    
    // Aloqa formasini yuborish
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            
            if (name && phone) {
                // Telegram botga xabar yuborish
                sendToTelegram(name, phone);
                
                // Foydalanuvchiga xabar ko'rsatish
                const currentLang = document.getElementById('language-selector').value;
                let message = '';
                
                if (currentLang === 'uz') {
                    message = 'Sizning xabaringiz yuborildi. Tez orada siz bilan bog\'lanamiz!';
                } else if (currentLang === 'ru') {
                    message = 'Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время!';
                } else if (currentLang === 'en') {
                    message = 'Your message has been sent. We will contact you soon!';
                }
                
                alert(message);
                contactForm.reset();
            }
        });
    }
    
    // Animatsiyali sahifaga o'tish
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
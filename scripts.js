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
    
    // Save language preference to localStorage
    localStorage.setItem('preferredLanguage', lang);
}

// Standart til sifatida o'zbek tilini o'rnatish va til tanlash hodisasini qo'shish
window.onload = function() {
    // Check if user has a preferred language saved
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        changeLanguage(savedLanguage);
        // Update the language selector to match the saved preference
        const languageSelector = document.getElementById('language-selector');
        if (languageSelector) {
            languageSelector.value = savedLanguage;
        }
    } else {
        // Default to Uzbek if no saved preference
        changeLanguage('uz');
    }
    
    // Til o'zgartirish hodisasini qo'shish
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            changeLanguage(this.value);
        });
    }
};
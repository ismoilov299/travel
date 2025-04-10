document.addEventListener("DOMContentLoaded", () => {
    // Language selector functionality
    const languageSelector = document.getElementById("language-selector")
  
    // Set default language (Uzbek)
    let currentLanguage = localStorage.getItem("language") || "uz"
    languageSelector.value = currentLanguage
  
    // Apply the saved language on page load
    applyLanguage(currentLanguage)
  
    // Change language when selector changes
    languageSelector.addEventListener("change", function () {
      currentLanguage = this.value
      localStorage.setItem("language", currentLanguage)
      applyLanguage(currentLanguage)
    })
  
    function applyLanguage(lang) {
      // Hide all language elements
      document.querySelectorAll(".lang-uz, .lang-ru, .lang-en").forEach((el) => {
        el.style.display = "none"
      })
  
      // Show only the selected language elements
      document.querySelectorAll(`.lang-${lang}`).forEach((el) => {
        el.style.display = "block"
      })
    }
  
    // Contact form submission
    const contactForm = document.getElementById("contactForm")
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const name = document.getElementById("name").value
        const phone = document.getElementById("phone").value
  
        if (name && phone) {
          // Telegram botga xabar yuborish
          sendToTelegram(name, phone)
  
          // Foydalanuvchiga xabar ko'rsatish
          const currentLang = document.getElementById("language-selector").value
          let message = ""
  
          if (currentLang === "uz") {
            message = "Sizning xabaringiz yuborildi. Tez orada siz bilan bog'lanamiz!"
          } else if (currentLang === "ru") {
            message = "Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время!"
          } else if (currentLang === "en") {
            message = "Your message has been sent. We will contact you soon!"
          }
  
          alert(message)
          contactForm.reset()
        }
      })
    }
  })
  
  // Telegram botga xabar yuborish funksiyasi
  function sendToTelegram(name, phone) {
    const botToken = "7689548499:AAFPd9WDlqnPxFSe4nkbvIpb76hrto3iPOU"
    const chatId = "1161180912" //'7286297692';
  
    const message = `🔔 Yangi so'rov!\n\n👤 Ism: ${name}\n📞 Telefon: ${phone}`
  
    // Telegram API URL
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`
  
    // Fetch so'rovi orqali xabarni yuborish
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          console.log("Telegram xabari yuborildi")
        } else {
          console.error("Telegram xabarini yuborishda xatolik:", data)
        }
      })
      .catch((error) => {
        console.error("Telegram xabarini yuborishda xatolik:", error)
      })
  }
  
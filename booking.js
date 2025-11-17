import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://hrevswjauihonpuubqgi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyZXZzd2phdWlob25wdXVicWdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzOTkwNTgsImV4cCI6MjA3ODk3NTA1OH0.wsZoGyTbH3jNSMN3MldN6zJOt7bueHz2PeS1mabaMGk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentStep = 1;
let selectedCar = null;

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedVehicle = urlParams.get('vehicle');
  if (selectedVehicle) {
    selectCar(selectedVehicle);
  }
});

function nextStep(step) {
  if (!validateStep(step)) return;
  document.getElementById(`step${step}`).style.display = "none";
  const nextStepId = step + 1;
  if (document.getElementById(`step${nextStepId}`)) {
    document.getElementById(`step${nextStepId}`).style.display = "block";
    updateStepTracker(nextStepId);
  }
}

function prevStep(step) {
  document.getElementById(`step${step}`).style.display = "none";
  const prevStepId = step - 1;
  if (prevStepId > 0) {
    document.getElementById(`step${prevStepId}`).style.display = "block";
    updateStepTracker(prevStepId);
  }
}

function selectCar(carName) {
  selectedCar = carName;
  document.querySelectorAll(".fahrzeug-option").forEach(option => {
    option.style.border = "2px solid transparent";
    if (option.querySelector('.fahrzeug-label').innerText === carName) {
      option.style.border = "3px solid gold";
    }
  });
}

async function sendBooking() {
  const lang = getLang();

  // alle Schritte nochmal prüfen
  if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
    return;
  }

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const pickup = document.getElementById('pickup').value;
  const destination = document.getElementById('destination').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const passengers = parseInt(document.getElementById('passengers').value || '0', 10);
  const luggage = document.getElementById('luggage').value;

  // optionale Felder (können fehlen)
  const emailInput = document.getElementById('email');
  const email = emailInput ? emailInput.value : '';

  const messageInput = document.getElementById('message');
  const message = messageInput ? messageInput.value : '';

  const carValue = selectedCar || '';

  try {
    const { error } = await supabase
      .from('bookings')
      .insert([
        {
          name,
          email,
          phone,
          pickup,
          destination,
          pickup_date: date,
          pickup_time: time,
          passengers,
          luggage,
          car: carValue,
          message
        }
      ]);

    if (error) {
      console.error('Supabase insert error:', error);
      showErrorPopup(
        translations[lang].errorTitle,
        translations[lang].errorSend || 'Buchung konnte nicht gespeichert werden.'
      );
      return;
    }

    showSuccessPopup(
      translations[lang].successTitle,
      translations[lang].successMessage
    );

    const form = document.querySelector('form');
    if (form) form.reset();

    document.getElementById(`step2`).style.display = "none";
    document.getElementById(`step3`).style.display = "none";
    document.getElementById(`step1`).style.display = "block";
    currentStep = 1;

  } catch (err) {
    console.error('Supabase connection error:', err);
    showErrorPopup(
      translations[lang].errorTitle,
      (translations[lang].errorConnection || 'Verbindungsfehler: ') + err.message
    );
  }
}

function validateStep(step) {
  const lang = getLang();

  if (step === 1) {
    const pickup = document.getElementById('pickup').value.trim();
    const destination = document.getElementById('destination').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!pickup || !destination || !date || !time || !name || !phone) {
      showErrorPopup(translations[lang].errorTitle, translations[lang].errorFillAllFields);
      return false;
    }
  } else if (step === 2) {
    const passengers = document.getElementById('passengers').value;
    const luggage = document.getElementById('luggage').value;

    if (!passengers || !luggage) {
      showErrorPopup(translations[lang].errorTitle, translations[lang].errorFillAllFields);
      return false;
    }
  } else if (step === 3) {
    if (!selectedCar) {
      showErrorPopup(translations[lang].errorTitle, translations[lang].errorSelectCar);
      return false;
    }

    if (typeof grecaptcha !== 'undefined') {
      if (!grecaptcha.getResponse()) {
        showErrorPopup(translations[lang].errorTitle, translations[lang].errorCaptcha);
        return false;
      }
    }
  }

  return true;
}

function showSuccessPopup(title, message) {
  const oldPopup = document.querySelector(".success-popup");
  if (oldPopup) oldPopup.remove();

  let popup = document.createElement("div");
  popup.classList.add("success-popup");

  popup.innerHTML = `
    <div class="success-popup-content">
      <span class="success-icon">✔</span>
      <h2>${title}</h2>
      <p>${message}</p>
      <button id="success-ok-btn">OK</button>
    </div>
  `;
  document.body.appendChild(popup);

  document.getElementById("success-ok-btn").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  setTimeout(() => {
    window.location.href = "index.html";
  }, 3000);
}

function closeSuccessPopup() {
  let popup = document.querySelector(".success-popup");
  if (popup) {
    popup.remove();
  }
}

function showErrorPopup(title, message) {
  let popup = document.createElement("div");
  popup.classList.add("error-popup");

  popup.innerHTML = `
    <div class="error-popup-content">
      <span class="error-icon">✖</span>
      <h2>${title}</h2>
      <p>${message}</p>
      <button class="error-ok-btn">OK</button>
    </div>
  `;
  document.body.appendChild(popup);

  popup.querySelector(".error-ok-btn").addEventListener("click", () => {
    popup.remove();
  });
}

function closeErrorPopup() {
  let popup = document.querySelector(".error-popup");
  if (popup) {
    popup.remove();
  }
}

function showWarningPopup(title, message) {
  let popup = document.createElement("div");
  popup.classList.add("warning-popup");

  popup.innerHTML = `
    <div class="warning-popup-content">
      <span class="warning-icon">⚠</span>
      <h2>${title}</h2>
      <p>${message}</p>
      <button onclick="closeWarningPopup()">OK</button>
    </div>
  `;
  document.body.appendChild(popup);
}

function closeWarningPopup() {
  let popup = document.querySelector(".warning-popup");
  if (popup) {
    popup.remove();
  }
}

function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('open');
}

function updateStepTracker(activeStep) {
  const trackerSteps = document.querySelectorAll(".step-tracker .step");
  trackerSteps.forEach((stepElem, index) => {
    stepElem.classList.toggle("active", index + 1 === activeStep);
  });
}

const translations = {
  de: {
    errorTitle: "Fehler",
    errorFillAllFields: "Bitte füllen Sie alle Felder aus.",
    errorSelectCar: "Bitte wählen Sie ein Fahrzeug aus.",
    errorCaptcha: "Bitte bestätigen Sie, dass Sie kein Roboter sind.",
    errorSend: "Buchung konnte nicht gespeichert werden.",
    errorConnection: "Verbindungsfehler: ",
    successTitle: "Buchung erfolgreich",
    successMessage: "Vielen Dank, wir haben Ihre Buchung erhalten. Wir melden uns in Kürze."
  },
  en: {
    errorTitle: "Error",
    errorFillAllFields: "Please fill in all required fields.",
    errorSelectCar: "Please select a vehicle.",
    errorCaptcha: "Please confirm that you are not a robot.",
    errorSend: "Booking could not be saved.",
    errorConnection: "Connection error: ",
    successTitle: "Booking successful",
    successMessage: "Thank you, we have received your booking and will contact you shortly."
  }
};

function getLang() {
  return localStorage.getItem("language") || "de";
}

function toggleLanguageDropdown() {
  const dropdown = document.getElementById('language-dropdown');
  const arrow = document.querySelector('.dropdown-arrow');

  if (dropdown.style.display === 'block') {
    dropdown.style.display = 'none';
    arrow.style.transform = 'rotate(0deg)';
  } else {
    dropdown.style.display = 'block';
    arrow.style.transform = 'rotate(180deg)';
  }
}

function switchLanguage(lang) {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[lang][key]) {
            if (key === 'phone') {
                element.innerHTML = lang === 'de'
                    ? 'Telefon: <a class="contact-link" href="tel:+41764630050">+41 76 463 00 50</a>'
                    : 'Phone: <a class="contact-link" href="tel:+41764630050">+41 76 463 00 50</a>';
            } else if (key === 'email') {
                element.innerHTML = lang === 'de'
                    ? 'E-Mail: <a class="contact-link" href="mailto:info@ulas-vip.com">info@ulas-vip.com</a>'
                    : 'Email: <a class="contact-link" href="mailto:info@ulas-vip.com">info@ulas-vip.com</a>';
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    document.getElementById('pickup').placeholder = translations[lang]['pickupPlaceholder'];
    document.getElementById('destination').placeholder = translations[lang]['destinationPlaceholder'];
    document.getElementById('name').placeholder = translations[lang]['namePlaceholder'];
    document.getElementById('phone').placeholder = translations[lang]['phonePlaceholder'];

const passengerSelect = document.getElementById('passengers');
if (passengerSelect) {
    passengerSelect.innerHTML = `
        <option value="">${translations[lang]['passengerOption']}</option>
        <option value="1">1 ${lang === 'de' ? 'Passagier' : 'passenger'}</option>
        <option value="2">2 ${lang === 'de' ? 'Passagiere' : 'passengers'}</option>
        <option value="3">3 ${lang === 'de' ? 'Passagiere' : 'passengers'}</option>
        <option value="4">4 ${lang === 'de' ? 'Passagiere' : 'passengers'}</option>
        <option value="5">5 ${lang === 'de' ? 'Passagiere' : 'passengers'}</option>
        <option value="6">6 ${lang === 'de' ? 'Passagiere' : 'passengers'}</option>
    `;
}

const luggageSelect = document.getElementById('luggage');
if (luggageSelect) {
    luggageSelect.innerHTML = `
        <option value="">${translations[lang]['luggageOption']}</option>
        <option value="0">0 ${lang === 'de' ? 'Gepäckstücke' : 'luggage items'}</option>
        <option value="1">1 ${lang === 'de' ? 'Gepäckstück' : 'luggage item'}</option>
        <option value="2">2 ${lang === 'de' ? 'Gepäckstücke' : 'luggage items'}</option>
        <option value="3">3 ${lang === 'de' ? 'Gepäckstücke' : 'luggage items'}</option>
        <option value="4">4 ${lang === 'de' ? 'Gepäckstücke' : 'luggage items'}</option>
        <option value="5">5 ${lang === 'de' ? 'Gepäckstücke' : 'luggage items'}</option>
    `;
}
    const flag = lang === 'de'
        ? 'https://flagcdn.com/w40/de.png'
        : 'https://flagcdn.com/w40/gb.png';
    const languageText = lang === 'de' ? 'Deutsch' : 'English';

    document.getElementById('current-flag').src = flag;
    document.getElementById('current-language-text').textContent = languageText;
    document.getElementById('language-dropdown').style.display = 'none';
    document.querySelector('.dropdown-arrow').style.transform = 'rotate(0deg)';

    const flagSidebar = document.getElementById('current-flag-sidebar');
    const textSidebar = document.getElementById('current-language-text-sidebar');
    const dropdownSidebar = document.getElementById('language-dropdown-sidebar');

    if (flagSidebar && textSidebar && dropdownSidebar) {
        flagSidebar.src = flag;
        textSidebar.textContent = languageText;

        dropdownSidebar.innerHTML = '';
        if (lang === 'de') {
            dropdownSidebar.innerHTML = `
                <div onclick="switchLanguage('en')">
                    <img src="https://flagcdn.com/w40/gb.png" alt="English"> English
                </div>`;
        } else {
            dropdownSidebar.innerHTML = `
                <div onclick="switchLanguage('de')">
                    <img src="https://flagcdn.com/w40/de.png" alt="Deutsch"> Deutsch
                </div>`;
        }

        dropdownSidebar.style.display = 'none';
    }

    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById("mobileSidebar");
        if (sidebar) sidebar.classList.remove("open");
    }
}

function handleMenuClick() {
  if (window.innerWidth <= 768) {
    toggleMobileSidebar();
  } else {
    toggleMenu();
  }
}

function toggleMobileSidebar() {
  const sidebar = document.getElementById("mobileSidebar");
  sidebar.classList.toggle("open");
}

function toggleLanguageDropdownSidebar() {
  const dropdown = document.getElementById("language-dropdown-sidebar");
  const arrow = dropdown.previousElementSibling.querySelector('.dropdown-arrow');

  if (dropdown.style.display === 'block') {
    dropdown.style.display = 'none';
    arrow.style.transform = 'rotate(0deg)';
  } else {
    dropdown.style.display = 'block';
    arrow.style.transform = 'rotate(180deg)';
  }
}

/* Funktionen global machen, damit onclick im HTML funktioniert */
window.nextStep = nextStep;
window.prevStep = prevStep;
window.sendBooking = sendBooking;
window.selectCar = selectCar;

window.switchLanguage = switchLanguage;
window.toggleLanguageDropdown = toggleLanguageDropdown;
window.handleMenuClick = handleMenuClick;
window.toggleMobileSidebar = toggleMobileSidebar;
window.toggleLanguageDropdownSidebar = toggleLanguageDropdownSidebar;




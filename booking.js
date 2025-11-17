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
      <button onclick="closeErrorPopup()">OK</button>
    </div>
  `;
  document.body.appendChild(popup);
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
  /* dein translations-Objekt unverändert hier … */
  // (lass einfach den Block aus deiner aktuellen Datei stehen)
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
  /* dein vorhandener switchLanguage-Code – ebenfalls einfach übernehmen */
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

window.closeErrorPopup = closeErrorPopup;
window.closeWarningPopup = closeWarningPopup;

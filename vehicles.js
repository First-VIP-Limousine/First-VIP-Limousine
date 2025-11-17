function selectVehicle(vehicle) {
    window.location.href = `booking.html?vehicle=${encodeURIComponent(vehicle)}`;
}

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('open');
}

const sliders = {
    's-klasse-400': 0,
    'v-klasse-250': 0
};

function updateSlider(vehicle) {
    const slider = document.querySelector(`.slider-container[data-vehicle="${vehicle}"] .slider`);
    const images = slider.querySelectorAll('img');
    const indexDisplay = document.getElementById(`index-${vehicle}`);

    images.forEach(img => {
        img.style.display = 'none';
    });       

    sliders[vehicle] = (sliders[vehicle] + images.length) % images.length;
    images[sliders[vehicle]].style.display = 'block';

    indexDisplay.innerText = `${sliders[vehicle] + 1} / ${images.length}`;
}

function prevSlide(vehicle) {
    sliders[vehicle]--;
    updateSlider(vehicle);
}

function nextSlide(vehicle) {
    sliders[vehicle]++;
    updateSlider(vehicle);
}

document.addEventListener('DOMContentLoaded', () => {
    updateSlider('s-klasse-400');
    updateSlider('v-klasse-250');
});

const translations = {
    'de': {
        'welcome': 'First VIP Limousine',
        'bookNow': 'Jetzt buchen',
        'aboutSubtitle': 'Über uns',
        'aboutIntro': 'Luxus, Exklusivität und perfekter Service – das ist unser Versprechen an Sie.',
        'servicesTitle': 'Dienstleistungen',
        'servicesIntro': 'Erleben Sie Exzellenz auf höchstem Niveau – unser exklusiver Chauffeurservice garantiert Luxus, Komfort und absolute Zuverlässigkeit.',
        'bookingSubtitle': 'Buchung',
        'bookingIntro': 'Ihr exklusiver Limousinenservice – Komfort, Pünktlichkeit und Luxus.',
        'vehiclesTitle': 'Fahrzeuge',
        'vehiclesIntro': 'Erleben Sie die perfekte Kombination aus Luxus, Stil und Komfort mit unseren Premium-Fahrzeugen.',
        'vehiclesSubtitle': 'Luxus und Komfort auf höchstem Niveau',
        'vehicleTypeFirst': 'Fahrzeugtyp: First Class',
        'vehicleTypeVan': 'Fahrzeugtyp: Business Van',
        'year2022': 'Baujahr: 2022',
        'year2020': 'Baujahr: 2020',
        'persons3': 'Personen: 3',
        'persons6': 'Personen: 6',
        'luggage3': 'Koffer: 3',
        'luggage5': 'Koffer: 5',
        'bookNow': 'Buchen',
        'companyName': 'First VIP Limousine',
        'address': 'Wehntalerstrasse 188',
        'city': '8057 Zürich',
        'phone': 'Telefon: +41 76 463 00 50',
        'email': 'E-Mail: info@ulas-vip.com',
        'whatsapp': 'Auf WhatsApp schreiben',
        'home': 'Startseite',
        'about': 'Über uns',
        'services': 'Dienstleistungen',
        'booking': 'Buchung',
        'vehicles': 'Fahrzeuge',
        'vehicleNameSClass': 'Mercedes S - Klasse 400',
        'vehicleNameVClass': 'Mercedes V - Klasse 250',
    },
    'en': {
        'welcome': 'First VIP Limousine',
        'bookNow': 'Book Now',
        'aboutSubtitle': 'About Us',
        'aboutIntro': 'Luxury, exclusivity, and perfect service – that is our promise to you.',
        'servicesTitle': 'Services',
        'servicesIntro': 'Experience excellence at the highest level – our exclusive chauffeur service guarantees luxury, comfort, and absolute reliability.',
        'bookingSubtitle': 'Booking',
        'bookingIntro': 'Your exclusive limousine service – comfort, punctuality, and luxury.',
        'vehiclesTitle': 'Vehicles',
        'vehiclesIntro': 'Experience the perfect combination of luxury, style, and comfort with our premium vehicles.',
        'vehiclesSubtitle': 'Luxury and comfort at the highest level',
        'vehicleTypeFirst': 'Vehicle Type: First Class',
        'vehicleTypeVan': 'Vehicle Type: Business Van',
        'year2022': 'Year: 2022',
        'year2020': 'Year: 2020',
        'persons3': 'Passengers: 3',
        'persons6': 'Passengers: 6',
        'luggage3': 'Luggage: 3',
        'luggage5': 'Luggage: 5',
        'bookNow': 'Book Now',
        'companyName': 'First VIP Limousine',
        'address': 'Wehntalerstrasse 188',
        'city': '8057 Zurich',
        'phone': 'Phone: +41 76 463 00 50',
        'email': 'Email: info@ulas-vip.com',
        'whatsapp': 'Contact via WhatsApp',
        'home': 'Home',
        'about': 'About Us',
        'services': 'Services',
        'booking': 'Booking',
        'vehicles': 'Vehicles',
        'vehicleNameSClass': 'Mercedes S - Class 400',
        'vehicleNameVClass': 'Mercedes V - Class 250',
    }
};

// ✅ Sprachumschalter öffnen/schließen
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

document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('language') || 'de';
    switchLanguage(savedLanguage);
});

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

document.querySelectorAll('.slider-btn').forEach(btn => {
    btn.addEventListener('dblclick', e => {
      e.preventDefault();
    });
  });  
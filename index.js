// Menü auf/zu
function toggleMenu() {
    const menu = document.getElementById('menu');
    if (menu) {
        menu.classList.toggle('open');
    }
}

// Links im Menü schließen das Menü auf Mobile wieder
document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll(".menu a");
    menuLinks.forEach(link => {
        link.addEventListener("click", function () {
            const menu = document.getElementById('menu');
            if (menu) {
                menu.classList.remove('open');
            }
        });
    });
});

// -----------------------------------------------------------------------------
// Globale Übersetzungen (für Navigation + allgemeine Texte)
// -----------------------------------------------------------------------------
const translations = {
    de: {
        home: 'Startseite',
        about: 'Über uns',
        services: 'Dienstleistungen',
        booking: 'Buchung',
        vehicles: 'Fahrzeuge',
        welcome: 'First VIP Limousine',
        bookNow: 'Jetzt buchen',
        whyChooseUs: 'Warum uns wählen?',
        whyText1: 'Exklusive Fahrzeuge und erstklassiger Service für Ihre luxuriösen Fahrten.',
        whyText2: '24/7 verfügbar – Pünktlichkeit und Komfort sind unsere Priorität.',
        whyText3: 'Erleben Sie die höchste Qualität und Eleganz bei jeder Fahrt.',
        companyName: 'First VIP Limousine',
        address: 'Wehntalerstrasse 188',
        city: '8057 Zürich',
        phone: 'Telefon: <a class="contact-link" href="tel:+41764630050">+41 76 463 00 50</a>',
        email: 'E-Mail: <a class="contact-link" href="mailto:info@ulas-vip.com">info@ulas-vip.com</a>',
        whatsapp: 'Auf WhatsApp schreiben',

        aboutSubtitle: 'Über uns',
        aboutIntro: 'Luxus, Exklusivität und perfekter Service – das ist unser Versprechen an Sie.',
        aboutPoint1: 'Bei First VIP Limousine steht Ihre Zufriedenheit an erster Stelle. Mehr als nur Transport – wir bieten exklusive, maßgeschneiderte Reiseerlebnisse. Mit unserer erstklassigen Flotte und höchstem Anspruch an Perfektion setzen wir neue Maßstäbe im luxuriösen Chauffeurdienst.',
        aboutPoint2: 'Unsere Mission: Ihre Erwartungen übertreffen. Erleben Sie Reisen auf höchstem Niveau mit einem diskreten Chauffeur, der Ihre Ansprüche versteht. Sorgfältig geplant für maximalen Komfort, Sicherheit und Diskretion – für ein unvergessliches Erlebnis in der Schweiz.',
        aboutPoint3: 'Erleben Sie Exklusivität und Prestige – bereits beim Einsteigen. First VIP Limousine bietet mehr als eine Fahrt: ein luxuriöses Reiseerlebnis, das Ihre Erwartungen übertrifft.',
        aboutClosing: 'Genießen Sie Luxus neu definiert – Ihre Reise beginnt hier.',

        servicesTitle: 'Dienstleistungen',
        servicesIntro: 'Erleben Sie Exzellenz auf höchstem Niveau – unser exklusiver Chauffeurservice garantiert Luxus, Komfort und absolute Zuverlässigkeit.',
        servicesScopeTitle: 'Unser Leistungsspektrum',
        servicesScope: 'Unser Service ist maßgeschneidert für Ihre Bedürfnisse – ob privat oder geschäftlich. Genießen Sie Luxus in der Mercedes S - Klasse oder reisen Sie mit bis zu 15 Personen in unseren komfortablen Sprintern. Ihr persönlicher Chauffeur sorgt mit höchstem Engagement für Ihr Wohlbefinden und spricht Deutsch, Englisch oder Türkisch, um Ihren Aufenthalt so angenehm wie möglich zu gestalten.',
        servicesHighlightTitle: 'Was uns auszeichnet',
        servicesHighlight: 'Ihre Zufriedenheit ist unsere Priorität. Wir stehen für höchste Qualität und Exzellenz in jedem Detail. Unsere erfahrenen Chauffeure garantieren ein stressfreies, luxuriöses Erlebnis – mit Pünktlichkeit, Diskretion und absoluter Sicherheit. Lehnen Sie sich entspannt zurück und genießen Sie unseren erstklassigen Service.',
        servicesRangeTitle: 'Unser Leistungsumfang',
        servicesRange: 'Maßgeschneiderter Transport für jede Reise – ob Kurz oder Langstrecke. Genießen Sie unseren zuverlässigen Flughafentransfer oder eine exklusive Sightseeing-Tour durch die Schweiz. Mit unserem erstklassigen Limousinenservice können Sie sich entspannt zurücklehnen – wir kümmern uns um den Rest.',
        servicesFullServiceTitle: 'Rundumservice',
        servicesFullService: 'Mehr als nur Transport – wir übernehmen auch Ihre Reservierungen und organisieren besondere Geschenke. Unser Rundumservice sorgt dafür, dass kein Wunsch unerfüllt bleibt.'
    },

    en: {
        home: 'Home',
        about: 'About Us',
        services: 'Services',
        booking: 'Booking',
        vehicles: 'Vehicles',
        welcome: 'First VIP Limousine',
        bookNow: 'Book Now',
        whyChooseUs: 'Why choose us?',
        whyText1: 'Exclusive vehicles and first-class service for your luxury rides.',
        whyText2: 'Available 24/7 – punctuality and comfort are our priority.',
        whyText3: 'Experience the highest quality and elegance on every trip.',
        companyName: 'First VIP Limousine',
        address: 'Wehntalerstrasse 188',
        city: '8057 Zurich',
        phone: 'Phone: <a class="contact-link" href="tel:+41764630050">+41 76 463 00 50</a>',
        email: 'Email: <a class="contact-link" href="mailto:info@ulas-vip.com">info@ulas-vip.com</a>',
        whatsapp: 'Contact via WhatsApp',

        aboutSubtitle: 'About Us',
        aboutIntro: 'Luxury, exclusivity, and perfect service – that is our promise to you.',
        aboutPoint1: 'At First VIP Limousine, your satisfaction is our top priority. More than just transportation – we offer exclusive, tailor-made travel experiences. With our first-class fleet and the highest standard of perfection, we are setting new benchmarks in luxury chauffeur services.',
        aboutPoint2: 'Our mission: to exceed your expectations. Experience journeys at the highest level with a discreet chauffeur who understands your needs. Carefully planned for maximum comfort, safety, and discretion – for an unforgettable experience in Switzerland.',
        aboutPoint3: 'Experience exclusivity and prestige – right from the moment you step in. First VIP Limousine offers more than a ride: a luxurious travel experience that exceeds your expectations.',
        aboutClosing: 'Experience luxury redefined – your journey begins here.',

        servicesTitle: 'Services',
        servicesIntro: 'Experience excellence at the highest level – our exclusive chauffeur service guarantees luxury, comfort and absolute reliability.',
        servicesScopeTitle: 'Our Service Spectrum',
        servicesScope: 'Our service is tailored to your needs – whether private or business. Enjoy luxury in the Mercedes S-Class or travel with up to 15 people in our comfortable Sprinters. Your personal chauffeur will ensure your well-being with the highest level of commitment and speaks German, English, or Turkish to make your stay as pleasant as possible.',
        servicesHighlightTitle: 'What sets us apart',
        servicesHighlight: 'Your satisfaction is our priority. We stand for top quality and excellence in every detail. Our experienced chauffeurs guarantee a stress-free, luxurious experience – with punctuality, discretion, and absolute security. Sit back, relax, and enjoy our first-class service.',
        servicesRangeTitle: 'Our Range of Services',
        servicesRange: 'Tailor-made transport for every journey – whether short or long distance. Enjoy our reliable airport transfer or an exclusive sightseeing tour through Switzerland. With our first-class limousine service, you can sit back and relax – we take care of the rest.',
        servicesFullServiceTitle: 'All-Inclusive Service',
        servicesFullService: 'More than just transport – we also handle your reservations and organize special gifts. Our all-inclusive service ensures that no wish goes unfulfilled.'
    }
};

// -----------------------------------------------------------------------------
// Sprach-Dropdown (Desktop)
// -----------------------------------------------------------------------------
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('language-dropdown');
    const arrow = document.querySelector('.dropdown-arrow');
    
    if (!dropdown) return;

    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
        if (arrow) arrow.style.transform = 'rotate(0deg)';
    } else {
        dropdown.style.display = 'block';
        if (arrow) arrow.style.transform = 'rotate(180deg)';
    }
}

// -----------------------------------------------------------------------------
// Zentrale Sprachwechsel-Funktion (für ALLE Seiten)
// -----------------------------------------------------------------------------
function switchLanguage(lang) {
    if (!translations[lang]) {
        lang = 'de';
    }

    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;

    // 1. Allgemeine Texte (überall wo data-key ist und in diesem translations-Objekt existiert)
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        const value = translations[lang][key];

        if (!value) return;

        // Inputs bekommen keinen innerHTML-Text, die Platzhalter macht jede Seite selbst
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            return;
        }

        element.innerHTML = value;
    });

    // 2. Buchungs-spezifische Übersetzungen, falls auf Buchungsseite
    if (typeof window.applyBookingTranslations === 'function') {
        window.applyBookingTranslations(lang);
    }

    // 3. Flaggen & Labels (Header)
    const flag = lang === 'de'
        ? 'https://flagcdn.com/w40/de.png'
        : 'https://flagcdn.com/w40/gb.png';
    const languageText = lang === 'de' ? 'Deutsch' : 'English';

    const flagEl = document.getElementById('current-flag');
    const langEl = document.getElementById('current-language-text');
    const dropdown = document.getElementById('language-dropdown');
    const arrow = document.querySelector('.dropdown-arrow');

    if (flagEl) flagEl.src = flag;
    if (langEl) langEl.textContent = languageText;
    if (dropdown) dropdown.style.display = 'none';
    if (arrow) arrow.style.transform = 'rotate(0deg)';

    // 4. Sidebar-Flagge
    const flagSidebar = document.getElementById('current-flag-sidebar');
    const textSidebar = document.getElementById('current-language-text-sidebar');
    const dropdownSidebar = document.getElementById('language-dropdown-sidebar');

    if (flagSidebar && textSidebar && dropdownSidebar) {
        flagSidebar.src = flag;
        textSidebar.textContent = languageText;

        // nur die andere Sprache als Option zeigen
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

    // 5. Sidebar auf Mobile nach Auswahl schließen
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById("mobileSidebar");
        if (sidebar) {
            sidebar.classList.remove("open");
        }
    }
}

// Beim Laden Sprache aus localStorage setzen (gilt für alle Seiten)
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('language') || 'de';
    switchLanguage(savedLanguage);
});

// -----------------------------------------------------------------------------
// Menü / Sidebar / Sprache (Mobile)
// -----------------------------------------------------------------------------
function handleMenuClick() {
    if (window.innerWidth <= 768) {
        toggleMobileSidebar();
    } else {
        toggleMenu();
    }
}

function toggleMobileSidebar() {
    const sidebar = document.getElementById("mobileSidebar");
    if (sidebar) {
        sidebar.classList.toggle("open");
    }
}

function toggleLanguageDropdownSidebar() {
    const dropdown = document.getElementById('language-dropdown-sidebar');
    if (!dropdown) return;

    const arrowWrapper = dropdown.previousElementSibling;
    const arrow = arrowWrapper ? arrowWrapper.querySelector('.dropdown-arrow') : null;

    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
        if (arrow) arrow.style.transform = 'rotate(0deg)';
    } else {
        dropdown.style.display = 'block';
        if (arrow) arrow.style.transform = 'rotate(180deg)';
    }
}

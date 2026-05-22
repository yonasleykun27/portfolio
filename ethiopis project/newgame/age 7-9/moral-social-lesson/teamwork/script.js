document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const languageToggle = document.getElementById('language-toggle');
    const backButton = document.getElementById('back-button');
    let isAmharic = false;

    // Content data
    const content = {
        english: {
            title: "Teamwork",
            team1Title: "Working Together",
            team1Text: "When we work together, we can do bigger and better things than we can do alone!",
            team2Title: "Helping Each Other",
            team2Text: "In a team, we help each other. If someone is struggling, we offer to help them.",
            team3Title: "Celebrate Together",
            team3Text: "When the team succeeds, we all succeed! Celebrate your team's accomplishments together.",
            // footer: "Teamwork makes the dream work! Together we can achieve amazing things.",
            copyright: "© 2025 Ethiopis. All rights reserved.",
            toggleText: "አማርኛ",
            backButton: "← Back"
        },
        amharic: {
            title: "ቡድን ስራ",
            team1Title: "አብረን መስራት",
            team1Text: "አብረን ስንሰራ ከብቻችን ስናደርገው የበለጠ እና የተሻለ ነገሮችን ማድረግ እንችላለን!",
            team2Title: "እርስ በርስ መርዳት",
            team2Text: "በቡድን ውስጥ እርስ በርስ እንረዳለን። አንድ ሰው ከተቸገረ እርዳታ እንለመድለዋለን።",
            team3Title: "አብረን ማክበር",
            team3Text: "ቡድኑ ሲያሸንፍ ሁላችንም አሸናፊዎች ነን! የቡድንዎን ስኬቶች አብረው ያክብሩ።",
            // footer: "ቡድን ስራ ህልምን ያሳካል! አብረን አስደናቂ ነገሮችን ማሳካት እንችላለን።",
            copyright: "© 2025 ኢትዮጵስ. ሁሉም መብቶች የተጠበቁ ናቸው።",
            toggleText: "English",
            backButton: "← ወደ ኋላ"
        }
    };

    // Initialize content
    updateContent();

    // Event listeners
    languageToggle.addEventListener('click', toggleLanguage);
    if (backButton) backButton.addEventListener('click', goBack);

    // Functions
    function toggleLanguage() {
        isAmharic = !isAmharic;
        updateContent();
    }

    function goBack() {
        window.history.back();
    }

    function updateContent() {
        const lang = isAmharic ? 'amharic' : 'english';
        const langContent = content[lang];

        // Update all text content
        document.getElementById('main-title').textContent = langContent.title;
        document.getElementById('team1-title').textContent = langContent.team1Title;
        document.getElementById('team1-text').textContent = langContent.team1Text;
        document.getElementById('team2-title').textContent = langContent.team2Title;
        document.getElementById('team2-text').textContent = langContent.team2Text;
        document.getElementById('team3-title').textContent = langContent.team3Title;
        document.getElementById('team3-text').textContent = langContent.team3Text;
        document.getElementById('footer-text').textContent = langContent.footer;
        document.querySelector('[data-i18n="footer.copyright"]').textContent = langContent.copyright;
        languageToggle.textContent = langContent.toggleText;
        
        if (backButton) {
            document.querySelector('[data-i18n="nav.back"]').textContent = langContent.backButton;
        }
    }

    // Check screen size and hide back button if mobile
    function checkScreenSize() {
        if (window.innerWidth <= 768 && backButton) {
            backButton.style.display = 'none';
        } else if (backButton) {
            backButton.style.display = 'block';
        }
    }

    // Initial check
    checkScreenSize();

    // Add resize listener
    window.addEventListener('resize', checkScreenSize);
});
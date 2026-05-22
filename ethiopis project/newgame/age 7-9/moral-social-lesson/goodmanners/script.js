document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const languageToggle = document.getElementById('language-toggle');
    const backButton = document.getElementById('back-button');
    let isAmharic = false;

    // Content data
    const content = {
        english: {
            title: "Good Manners",
            manner1Title: "Magic Words",
            manner1Text: 'Always say "please" when asking for something and "thank you" when you receive it. These are called magic words!',
            manner2Title: "Sharing is Caring",
            manner2Text: "Share your toys and snacks with friends. It makes everyone happy and helps you make more friends.",
            manner3Title: "Good Listening",
            manner3Text: "When others are speaking, listen carefully without interrupting. Wait for your turn to talk.",
            // footer: "Remember: Good manners make you a great friend and a wonderful person!",
            copyright: "© 2025 Ethiopis. All rights reserved.",
            toggleText: "አማርኛ",
            backButton: "← Back"
        },
        amharic: {
            title: "መልካም ሥነ ምግባር",
            manner1Title: "ስለታዊ ቃላት",
            manner1Text: 'ለማንኛውም ነገር ሲጠይቁ "እባክህ/እባክሽ" ይበሉ እና ሲያገኙ "አመሰግናለሁ" ይበሉ። እነዚህ ስለታዊ ቃላት ይባላሉ!',
            manner2Title: "ማካፈል እንክብካቤ ነው",
            manner2Text: "ከጓደኞችዎ ጋር መጫወቻዎችዎን እና ቁርስ ያጋሩ። ይህ ሁሉንም ደስ ያሰኛል እና ተጨማሪ ጓደኞች እንዲኖሩዎት ይረዳዎታል።",
            manner3Title: "መልካም መስማት",
            manner3Text: "ሌሎች ሲናገሩ ሳያቋርጡ በጥንቃቄ ይስማ። የእርስዎ ተራ እስኪደርስ ይጠብቁ።",
            // footer: "አስታውሱ፡ መልካም ሥነ ምግባር ጥሩ ጓደኛ እና አስደናቂ ሰው ያደርግዎታል!",
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
        languageToggle.textContent = isAmharic ? content.english.toggleText : content.amharic.toggleText;
    }

    function goBack() {
        window.history.back();
    }

    function updateContent() {
        const lang = isAmharic ? 'amharic' : 'english';
        const langContent = content[lang];

        // Update main content
        document.getElementById('main-title').textContent = langContent.title;
        document.getElementById('manner1-title').textContent = langContent.manner1Title;
        document.getElementById('manner1-text').textContent = langContent.manner1Text;
        document.getElementById('manner2-title').textContent = langContent.manner2Title;
        document.getElementById('manner2-text').textContent = langContent.manner2Text;
        document.getElementById('manner3-title').textContent = langContent.manner3Title;
        document.getElementById('manner3-text').textContent = langContent.manner3Text;
        document.getElementById('footer-text').textContent = langContent.footer;
        
        // Update footer copyright
        document.querySelector('[data-i18n="footer.copyright"]').textContent = langContent.copyright;
        
        // Update back button if it exists
        if (backButton) {
            backButton.textContent = langContent.backButton;
        }
        
        // Update language toggle text
        languageToggle.textContent = langContent.toggleText;
    }
});
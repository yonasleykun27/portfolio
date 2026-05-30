document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('language-toggle');
    const backButton = document.getElementById('back-button');
    let isAmharic = false;

    // English content
    const englishContent = {
        title: "Ethiopian Cultural Traditions",
        coffeeTitle: "Coffee Ceremony",
        coffeeText: "The Ethiopian coffee ceremony is an important part of social life. Green coffee beans are roasted, ground, and brewed in front of guests.",
        foodTitle: "Injera and Wat",
        foodText: "Injera is a spongy flatbread made from teff flour. It's served with wat (stew) and eaten with hands - no forks needed!",
        timkatTitle: "Timkat Festival",
        timkatText: "Timkat celebrates Epiphany with colorful processions, music, and dancing. People wear white clothes and priests carry replicas of the Ark of the Covenant.",
        // footer: "Learn more about Ethiopia's amazing culture!",
        backButton: "← Back",
        toggleText: "አማርኛ"
    };

    // Amharic content
    const amharicContent = {
        title: "የኢትዮጵያ ባህላዊ ሥርዓቶች",
        coffeeTitle: "ቡና ሰርምዓ",
        coffeeText: "የኢትዮጵያ ቡና ሰርምዓ የማህበራዊ ሕይወት አስፈላጊ ክፍል ነው። ደረቅ ቡና ተጋግሎ ተፈጭቶ በእንግዶች ፊት ይፈላል።",
        foodTitle: "እንጀራ እና ወጥ",
        foodText: "እንጀራ ከጤፍ ዱቄት የሚሰራ ስፖንጂ ያለው ቀጠና ዳቦ ነው። ከወጥ ጋር ይቀርባል እና በእጅ ይበላል - ምንቸት አያስፈልግም!",
        timkatTitle: "ጥምቀት በዓል",
        timkatText: "ጥምቀት በቀለም ተራ መርከቦች፣ ሙዚቃ እና ደርሶ ይከበራል። ሰዎች ነጭ ልብስ ይለብሳሉ እና ካህናት የኪዳን ታቦት ምሳሌዎችን ይሸከማሉ።",
        // footer: "ስለ ኢትዮጵያ አስደናቂ ባህል ተጨማሪ ይማሩ!",
        backButton: "← ወደ ኋላ",
        toggleText: "English"
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
        languageToggle.textContent = isAmharic ? englishContent.toggleText : amharicContent.toggleText;
    }

    function goBack() {
        window.history.back();
    }

    function updateContent() {
        const content = isAmharic ? amharicContent : englishContent;
        
        document.getElementById('main-title').textContent = content.title;
        document.getElementById('coffee-title').textContent = content.coffeeTitle;
        document.getElementById('coffee-text').textContent = content.coffeeText;
        document.getElementById('food-title').textContent = content.foodTitle;
        document.getElementById('food-text').textContent = content.foodText;
        document.getElementById('timkat-title').textContent = content.timkatTitle;
        document.getElementById('timkat-text').textContent = content.timkatText;
        document.getElementById('footer-text').textContent = content.footer;
        
        if (backButton) {
            backButton.textContent = content.backButton;
        }
    }
});
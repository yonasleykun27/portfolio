document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const languageToggle = document.getElementById('language-toggle');
    const backButton = document.getElementById('back-button');
    let isAmharic = false;

    // English content
    const englishContent = {
        title: "Ethiopian Historical Figures",
        figure1Name: "Emperor Menelik II",
        figure1Desc: "He led Ethiopia to victory at the Battle of Adwa in 1896 against Italy. He modernized Ethiopia and built the first hospital and school.",
        figure1More: "Emperor Menelik II (1844 – 1913) was Negus of Shewa from 1866 to 1889 and then Emperor of Ethiopia from 1889 to his death. He expanded the Ethiopian Empire to the south and east, leading Ethiopian forces to victory in the First Italo-Ethiopian War, notably at the Battle of Adwa.",
        figure2Name: "Empress Taytu",
        figure2Desc: "A strong leader who helped plan the strategy at Adwa. She founded Addis Ababa and was known for her intelligence and bravery.",
        figure2More: "Empress Taytu Betul (c. 1851 – 1918) was the wife of Emperor Menelik II and a powerful political figure. She was instrumental in resisting Italian expansion and played a key role in the Battle of Adwa. Addis Ababa was reportedly founded at her suggestion.",
        figure3Name: "Emperor Haile Selassie",
        figure3Desc: "The last emperor of Ethiopia. He helped create the Organization of African Unity and modernized Ethiopia's education system.",
        figure3More: "Emperor Haile Selassie I (1892 – 1975) reigned from 1930 to 1974. He is revered by Rastafarians as the returned Messiah. He worked to modernize Ethiopia and was a key figure in the formation of the Organization of African Unity (OAU).",
        figure4Name: "Empress Zewditu",
        figure4Desc: "Ethiopia's first female head of state. She ruled during a time of change and was known for her kindness and devotion to the church.",
        figure4More: "Empress Zewditu (1876 – 1930) was the Empress of Ethiopia from 1916 to 1930. She came to the throne after the deposition of her cousin, Lij Iyasu. Her reign was marked by the power struggle with the then Regent Ras Tafari Makonnen (later Emperor Haile Selassie I).",
        // footer: "Learn about great Ethiopian leaders!",
        copyright: "© 2025 Ethiopis. All rights reserved.",
        backButton: "← Back",
        toggleText: "አማርኛ"
    };

    // Amharic content
    const amharicContent = {
        title: "የኢትዮጵያ ታሪካዊ ሰዎች",
        figure1Name: "ንጉሠ ነገሥት ምኒልክ ፪ኛ",
        figure1Desc: "ኢትዮጵያን በ1896 በዐድዋ ከጣሊያን ጋር በማሸነፍ አሸነፉ። ኢትዮጵያን ዘመናዊ አድርጎ የመጀመሪያውን ሆስፒታል እና ትምህርት ቤት ሠሩ።",
        figure1More: "ንጉሠ ነገሥት ምኒልክ ሁለተኛ (1844 – 1913) ከ1866 እስከ 1889 የሸዋ ንጉሥ እና ከ1889 እስከ ዕለተ ሞቱ ድረስ የኢትዮጵያ ንጉሠ ነገሥት ነበሩ። የኢትዮጵያን ንጉሠ ነገሥትነት ወደ ደቡብ እና ምሥራቅ አስፋተው በመጀመሪያው የጣሊያን-ኢትዮጵያ ጦርነት የኢትዮጵያን ሠራዊት ወደ ድል አምጥተዋል፣ በተለይም በዐድዋ ጦርነት።",
        figure2Name: "ንግሥት ጣይቱ",
        figure2Desc: "በዐድዋ ስልቱን በማዘጋጀት የረዳች ጠንካራ መሪ። አዲስ አበባን ፈጠረች እና በጥበብ እና በግብረገብነት ትታወቅ ነበር።",
        figure2More: "ንግሥት ጣይቱ ብጡል (1851 – 1918) የንጉሠ ነገሥት ምኒልክ ሁለተኛ ሚስት እና ኃይለኛ የፖለቲካ ሰው ነበሩ። የጣሊያንን ዝርፊያ በመቃወም �ላቂ ሚና ተጫውተዋል እና በዐድዋ ጦርነት ወሳኝ ሚና ተጫውተዋል። አዲስ አበባ በእርሷ አስተያየት መሠረት ተመሠረተች ይባላል።",
        figure3Name: "ንጉሠ ነገሥት ኃይለ ሥላሴ",
        figure3Desc: "የኢትዮጵያ የመጨረሻ ንጉሥ። የአፍሪቃ አንድነት ድርጅት ለመፍጠር አስተዋጽኦ አድርገዋል እና የኢትዮጵያን የትምህርት ሥርዓት ዘመናዊ አድርገዋል።",
        figure3More: "ንጉሠ ነገሥት ኃይለ ሥላሴ እኔ (1892 – 1975) ከ1930 እስከ 1974 ድረስ ገዥ ነበሩ። በራስታፋሪያኖች ዘንድ እንደ ተመለሰው መሲህ ይቆጠራሉ። ኢትዮጵያን ዘመናዊ ለማድረግ ሠርተዋል እና በአፍሪቃ አንድነት ድርጅት (OAU) መፍጠር ዋና ሰው ነበሩ።",
        figure4Name: "ንግሥት ዘውዲቱ",
        figure4Desc: "የኢትዮጵያ የመጀመሪያዋ ሴት መሪ። በለውጥ ዘመን ነገሠች እና በርኅራኄ እና በቤተክርስቲያን ተሰጥና ትታወቅ ነበር።",
        // figure4More: "ንግሥት ዘውዲቱ (1876 – 1930) ከ1916 እስከ 1930 ድረስ የኢትዮጵያ ንግሥት ነበሩ። ከእህትሷ ልጅ ሊጅ ኢያሱ ከተወገዱ በኋላ ዙፋን ላይ ተቀመጡ። የእርሷ ዘመን በዚያን ጊዜ ሪጀንት ራስ ተፈሪ ማኮንን (በኋላ ንጉሠ ነገሥት ኃይለ ሥላሴ እኔ) ጋር ባለው የኃይል ግጭት ተለይቷል።",
        // footer: "ታላላቅ የኢትዮጵያ መሪዎችን ይወቁ!",
        copyright: "© 2025 ኢትዮጵስ. ሁሉም መብቶች የተጠበቁ ናቸው።",
        backButton: "← ወደ ኋላ",
        toggleText: "English"
    };

    // Initialize content
    updateContent();

    // Event listeners
    languageToggle.addEventListener('click', toggleLanguage);
    if (backButton) backButton.addEventListener('click', goBack);

    // Learn more buttons functionality
    document.querySelectorAll('.learn-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const figureId = this.id.split('-')[2];
            toggleInfo(`figure${figureId}`);
        });
    });

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
        const langContent = isAmharic ? amharicContent : englishContent;
        
        // Update main elements
        document.getElementById('main-title').textContent = langContent.title;
        document.getElementById('footer-text').textContent = langContent.footer;
        document.querySelector('[data-i18n="footer.copyright"]').textContent = langContent.copyright;
        if (backButton) document.querySelector('[data-i18n="nav.back"]').textContent = langContent.backButton;
        
        // Update figure cards
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`figure${i}-name`).textContent = langContent[`figure${i}Name`];
            document.getElementById(`figure${i}-desc`).textContent = langContent[`figure${i}Desc`];
            document.getElementById(`more-info-${i}`).textContent = langContent[`figure${i}More`];
        }
    }

    function toggleInfo(figureId) {
        const infoBox = document.getElementById(`info-box-${figureId.slice(-1)}`);
        const isVisible = infoBox.style.display === 'block';
        
        // Close all info boxes first
        document.querySelectorAll('.info-box').forEach(box => {
            box.style.display = 'none';
        });
        
        // Toggle the clicked one
        infoBox.style.display = isVisible ? 'none' : 'block';
        
        // Scroll to the info box if opening
        if (!isVisible) {
            infoBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
});
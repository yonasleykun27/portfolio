// Complete Translation Data
const translations = {
    en: {
        title: "Amharic Alphabet",
        subtitle: "Learn all letters from ሀ to ፖ",
        byFamily: "Letter Families",
        byVowel: "Vowel Groups",
        currentMode: "Select learning mode",
        // helpLink: "Help",
        copyright: "© 2025 Ethiopis. All rights reserved.",
        helpTitle: "How to Use",
        helpText: [
            "<strong>Letter Families</strong>: Shows all forms of each base letter",
            "<strong>Vowel Groups</strong>: Shows how vowels change letters",
            "Click any letter to hear pronunciation"
        ],
        translateBtn: "አማርኛ",
        backButton: "← Back"
    },
    am: {
        title: "አማርኛ ፊደል",
        subtitle: "ከ ሀ እስከ ፖ ይማሩ",
        byFamily: "የፊደል ቤተሰቦች",
        byVowel: "የአናባቢ ቡድኖች",
        currentMode: "የመማር ዘዴ ይምረጡ",
        // helpLink: "እርዳታ",
        copyright: "© 2025 ኢትዮጵስ. ሁሉም መብቶች የተጠበቁ ናቸው።",
        helpTitle: "እንዴት ይጠቀማሉ",
        helpText: [
            "<strong>የፊደል ቤተሰቦች</strong>: የእያንዳንዱን መሠረታዊ ፊደል ሁሉንም ቅርጾች ያሳያል",
            "<strong>የአናባቢ ቡድኖች</strong>: አናባቢዎች ፊደሎችን እንዴት እንደሚቀይሩ ያሳያል",
            "ማንኛውንም ፊደል ለመስማት ይጫኑ"
        ],
        translateBtn: "English",
        backButton: "← ወደ ኋላ"
    }
};

// Complete Amharic Alphabet Data
const amharicData = {
    baseLetters: ['ሀ', 'ለ', 'ሐ', 'መ', 'ሠ', 'ረ', 'ሰ', 'ሸ', 'ቀ', 'በ', 'ተ', 'ቸ', 'ኀ', 'ነ', 'ኘ', 'አ', 'ከ', 'ኸ', 'ወ', 'ዐ', 'ዘ', 'ዠ', 'የ', 'ደ', 'ጀ', 'ገ', 'ጠ', 'ጨ', 'ጰ', 'ጸ', 'ፀ', 'ፈ', 'ፐ'],
    
    variations: [
        ['ሀ', 'ሁ', 'ሂ', 'ሃ', 'ሄ', 'ህ', 'ሆ'],
        ['ለ', 'ሉ', 'ሊ', 'ላ', 'ሌ', 'ል', 'ሎ'],
        ['ሐ', 'ሑ', 'ሒ', 'ሓ', 'ሔ', 'ሕ', 'ሖ'],
        ['መ', 'ሙ', 'ሚ', 'ማ', 'ሜ', 'ም', 'ሞ'],
        ['ሠ', 'ሡ', 'ሢ', 'ሣ', 'ሤ', 'ሥ', 'ሦ'],
        ['ረ', 'ሩ', 'ሪ', 'ራ', 'ሬ', 'ር', 'ሮ'],
        ['ሰ', 'ሱ', 'ሲ', 'ሳ', 'ሴ', 'ስ', 'ሶ'],
        ['ሸ', 'ሹ', 'ሺ', 'ሻ', 'ሼ', 'ሽ', 'ሾ'],
        ['ቀ', 'ቁ', 'ቂ', 'ቃ', 'ቄ', 'ቅ', 'ቆ'],
        ['በ', 'ቡ', 'ቢ', 'ባ', 'ቤ', 'ብ', 'ቦ'],
        ['ተ', 'ቱ', 'ቲ', 'ታ', 'ቴ', 'ት', 'ቶ'],
        ['ቸ', 'ቹ', 'ቺ', 'ቻ', 'ቼ', 'ች', 'ቾ'],
        ['ኀ', 'ኁ', 'ኂ', 'ኃ', 'ኄ', 'ኅ', 'ኆ'],
        ['ነ', 'ኑ', 'ኒ', 'ና', 'ኔ', 'ን', 'ኖ'],
        ['ኘ', 'ኙ', 'ኚ', 'ኛ', 'ኜ', 'ኝ', 'ኞ'],
        ['አ', 'ኡ', 'ኢ', 'ኣ', 'ኤ', 'እ', 'ኦ'],
        ['ከ', 'ኩ', 'ኪ', 'ካ', 'ኬ', 'ክ', 'ኮ'],
        ['ኸ', 'ኹ', 'ኺ', 'ኻ', 'ኼ', 'ኽ', 'ኾ'],
        ['ወ', 'ዉ', 'ዊ', 'ዋ', 'ዌ', 'ው', 'ዎ'],
        ['ዐ', 'ዑ', 'ዒ', 'ዓ', 'ዔ', 'ዕ', 'ዖ'],
        ['ዘ', 'ዙ', 'ዚ', 'ዛ', 'ዜ', 'ዝ', 'ዞ'],
        ['ዠ', 'ዡ', 'ዢ', 'ዣ', 'ዤ', 'ዥ', 'ዦ'],
        ['የ', 'ዩ', 'ዪ', 'ያ', 'ዬ', 'ይ', 'ዮ'],
        ['ደ', 'ዱ', 'ዲ', 'ዳ', 'ዴ', 'ድ', 'ዶ'],
        ['ጀ', 'ጁ', 'ጂ', 'ጃ', 'ጄ', 'ጅ', 'ጆ'],
        ['ገ', 'ጉ', 'ጊ', 'ጋ', 'ጌ', 'ግ', 'ጎ'],
        ['ጠ', 'ጡ', 'ጢ', 'ጣ', 'ጤ', 'ጥ', 'ጦ'],
        ['ጨ', 'ጩ', 'ጪ', 'ጫ', 'ጬ', 'ጭ', 'ጮ'],
        ['ጰ', 'ጱ', 'ጲ', 'ጳ', 'ጴ', 'ጵ', 'ጶ'],
        ['ጸ', 'ጹ', 'ጺ', 'ጻ', 'ጼ', 'ጽ', 'ጾ'],
        ['ፀ', 'ፁ', 'ፂ', 'ፃ', 'ፄ', 'ፅ', 'ፆ'],
        ['ፈ', 'ፉ', 'ፊ', 'ፋ', 'ፌ', 'ፍ', 'ፎ'],
        ['ፐ', 'ፑ', 'ፒ', 'ፓ', 'ፔ', 'ፕ', 'ፖ']
    ],
    
    pronunciations: [
        ["ha", "hu", "hi", "ha", "he", "h", "ho"],
        ["la", "lu", "li", "la", "le", "l", "lo"],
        ["ha", "hu", "hi", "ha", "he", "h", "ho"],
        ["ma", "mu", "mi", "ma", "me", "m", "mo"],
        ["sa", "su", "si", "sa", "se", "s", "so"],
        ["ra", "ru", "ri", "ra", "re", "r", "ro"],
        ["sa", "su", "si", "sa", "se", "s", "so"],
        ["sha", "shu", "shi", "sha", "she", "sh", "sho"],
        ["qa", "qu", "qi", "qa", "qe", "q", "qo"],
        ["ba", "bu", "bi", "ba", "be", "b", "bo"],
        ["ta", "tu", "ti", "ta", "te", "t", "to"],
        ["cha", "chu", "chi", "cha", "che", "ch", "cho"],
        ["ha", "hu", "hi", "ha", "he", "h", "ho"],
        ["na", "nu", "ni", "na", "ne", "n", "no"],
        ["nya", "nyu", "nyi", "nya", "nye", "ny", "nyo"],
        ["a", "u", "i", "a", "e", "", "o"],
        ["ka", "ku", "ki", "ka", "ke", "k", "ko"],
        ["kha", "khu", "khi", "kha", "khe", "kh", "kho"],
        ["wa", "wu", "wi", "wa", "we", "w", "wo"],
        ["a", "u", "i", "a", "e", "", "o"],
        ["za", "zu", "zi", "za", "ze", "z", "zo"],
        ["zha", "zhu", "zhi", "zha", "zhe", "zh", "zho"],
        ["ya", "yu", "yi", "ya", "ye", "y", "yo"],
        ["da", "du", "di", "da", "de", "d", "do"],
        ["ja", "ju", "ji", "ja", "je", "j", "jo"],
        ["ga", "gu", "gi", "ga", "ge", "g", "go"],
        ["ta", "tu", "ti", "ta", "te", "t", "to"],
        ["cha", "chu", "chi", "cha", "che", "ch", "cho"],
        ["pa", "pu", "pi", "pa", "pe", "p", "po"],
        ["tsa", "tsu", "tsi", "tsa", "tse", "ts", "tso"],
        ["tsa", "tsu", "tsi", "tsa", "tse", "ts", "tso"],
        ["fa", "fu", "fi", "fa", "fe", "f", "fo"],
        ["pa", "pu", "pi", "pa", "pe", "p", "po"]
    ]
};

// DOM Elements
const elements = {
    mainTitle: document.getElementById('main-title'),
    subtitle: document.getElementById('subtitle'),
    translateBtn: document.getElementById('translate-btn'),
    byFamilyBtn: document.getElementById('by-family'),
    byVowelBtn: document.getElementById('by-vowel'),
    currentMode: document.getElementById('current-mode'),
    amharicGrid: document.getElementById('amharic-grid'),
    helpLink: document.getElementById('help-link'),
    copyright: document.querySelector('[data-i18n="footer.copyright"]'),
    helpModal: document.getElementById('help-modal'),
    helpTitle: document.getElementById('help-title'),
    helpText: document.getElementById('help-text'),
    backButton: document.getElementById('back-button')
};

let currentLang = 'en';
let currentView = 'families';

// Initialize the app
function init() {
    setupEventListeners();
    showLetterFamilies();
    updateTextElements();
}

// Set up event listeners
function setupEventListeners() {
    elements.translateBtn.addEventListener('click', toggleLanguage);
    elements.byFamilyBtn.addEventListener('click', showLetterFamilies);
    elements.byVowelBtn.addEventListener('click', showVowelGroups);
    elements.helpLink.addEventListener('click', showHelpModal);
    document.querySelector('.close').addEventListener('click', hideHelpModal);
    window.addEventListener('click', (e) => {
        if (e.target === elements.helpModal) hideHelpModal();
    });
    
    if (elements.backButton) {
        elements.backButton.addEventListener('click', goBack);
    }
}

// Toggle between English and Amharic
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'am' : 'en';
    updateTextElements();
    refreshCurrentView();
}

// Update all text elements
function updateTextElements() {
    const lang = translations[currentLang];
    elements.mainTitle.textContent = lang.title;
    elements.subtitle.textContent = lang.subtitle;
    elements.translateBtn.textContent = lang.translateBtn;
    elements.byFamilyBtn.textContent = lang.byFamily;
    elements.byVowelBtn.textContent = lang.byVowel;
    elements.currentMode.textContent = lang.currentMode;
    elements.helpLink.textContent = lang.helpLink;
    elements.copyright.textContent = lang.copyright;
    elements.helpTitle.textContent = lang.helpTitle;
    elements.helpText.innerHTML = lang.helpText.map(item => `<p>${item}</p>`).join('');
    
    if (elements.backButton) {
        elements.backButton.textContent = lang.backButton;
    }
}

// Go back to previous page
function goBack() {
    window.history.back();
}

// Refresh current view after language change
function refreshCurrentView() {
    if (currentView === 'families') {
        showLetterFamilies();
    } else {
        showVowelGroups();
    }
}

// Show letter families view
function showLetterFamilies() {
    currentView = 'families';
    const t = translations[currentLang];
    elements.currentMode.textContent = t.byFamily;
    elements.amharicGrid.innerHTML = '';
    
    amharicData.baseLetters.forEach((letter, index) => {
        const btn = document.createElement('button');
        btn.className = 'letter-btn';
        btn.textContent = letter;
        btn.addEventListener('click', () => showLetterVariations(index));
        elements.amharicGrid.appendChild(btn);
    });
}

// Show variations for a specific letter
function showLetterVariations(familyIndex) {
    const t = translations[currentLang];
    elements.currentMode.textContent = `${amharicData.baseLetters[familyIndex]} ${t.byFamily}`;
    elements.amharicGrid.innerHTML = '';
    
    amharicData.variations[familyIndex].forEach((letter, index) => {
        const btn = document.createElement('button');
        btn.className = 'letter-btn';
        btn.textContent = letter;
        btn.addEventListener('click', () => speakLetter(familyIndex, index));
        elements.amharicGrid.appendChild(btn);
    });
}

// Show vowel groups view
function showVowelGroups() {
    currentView = 'vowel';
    const t = translations[currentLang];
    elements.currentMode.textContent = t.byVowel;
    elements.amharicGrid.innerHTML = '';
    
    for (let i = 0; i < 7; i++) {
        const btn = document.createElement('button');
        btn.className = 'letter-btn';
        btn.textContent = amharicData.variations[0][i];
        btn.addEventListener('click', () => showLettersByVowel(i));
        elements.amharicGrid.appendChild(btn);
    }
}

// Show all letters for a specific vowel
function showLettersByVowel(vowelIndex) {
    const t = translations[currentLang];
    elements.currentMode.textContent = `${t.byVowel} ${vowelIndex + 1}`;
    elements.amharicGrid.innerHTML = '';
    
    amharicData.variations.forEach(family => {
        const btn = document.createElement('button');
        btn.className = 'letter-btn';
        btn.textContent = family[vowelIndex];
        elements.amharicGrid.appendChild(btn);
    });
}

// Speak a letter's pronunciation
function speakLetter(familyIndex, vowelIndex) {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(
        amharicData.pronunciations[familyIndex][vowelIndex]
    );
    utterance.rate = 0.8;
    synth.speak(utterance);
}

// Show help modal
function showHelpModal(e) {
    e.preventDefault();
    elements.helpModal.style.display = 'block';
}

// Hide help modal
function hideHelpModal() {
    elements.helpModal.style.display = 'none';
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
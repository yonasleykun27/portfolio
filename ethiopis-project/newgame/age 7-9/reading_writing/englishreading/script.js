document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const languageToggle = document.getElementById('language-toggle');
    const voiceToggle = document.getElementById('voice-toggle');
    const backButton = document.getElementById('back-button');
    const footerCopyright = document.querySelector('[data-i18n="footer.copyright"]');
    const backButtonText = document.querySelector('[data-i18n="nav.back"]');
    
    let isAmharic = false;
    let voiceEnabled = true;
    let speechSynth = window.speechSynthesis;

    // Content data
    const content = {
        english: {
            title: "English Reading Practice",
            lesson1Title: "Lesson 1: Alphabet Sounds",
            lesson1Text: "Let's practice the first five letters of the English alphabet. What sounds do they make?",
            lesson2Title: "Lesson 2: Simple Words",
            word1Text: "🐱",
            word2Text: "🐶",
            word3Text: "☀️",
            lesson3Title: "Lesson 3: Short Sentences",
            sentence1Text: "A simple sentence with 3 words.",
            sentence2Text: "A 4-word sentence.",
            footer: "© 2025 Ethiopis. All rights reserved.",
            backButton: "← Back",
            practice1Btn: "Hear Sounds",
            practice2Btn: "Read Words",
            practice3Btn: "Read Aloud",
            toggleText: "አማርኛ",
            voiceOn: "🔊 Voice On",
            voiceOff: "🔇 Voice Off"
        },
        amharic: {
            title: "የእንግሊዝኛ ንባብ ልምምድ",
            lesson1Title: "ትምህርት 1: ፊደላት ድምፅ",
            lesson1Text: "የእንግሊዝኛ ፊደላትን የመጀመሪያዎቹን አምስት እንለማመድ። ምን ዓይነት ድምፆች አላቸው?",
            lesson2Title: "ትምህርት 2: ቀላል ቃላት",
            word1Text: "🐱",
            word2Text: "🐶",
            word3Text: "☀️",
            lesson3Title: "ትምህርት 3: አጭር ሀረጎች",
            sentence1Text: "3 ቃላት ያሉት ቀላል ሀረግ።",
            sentence2Text: "4 ቃላት ያሉት ሀረግ።",
            footer: "© 2025 ኢትዮጵስ. ሁሉም መብቶች የተጠበቁ ናቸው።",
            backButton: "← ወደ ኋላ",
            practice1Btn: "ድምፆችን ይስማ",
            practice2Btn: "ቃላትን ያንብቡ",
            practice3Btn: "በተናጥል ያንብቡ",
            toggleText: "English",
            voiceOn: "🔊 ድምፅ በርቷል",
            voiceOff: "🔇 ድምፅ ተጠፍቷል"
        }
    };

    // Initialize content
    updateContent();

    // Event listeners
    languageToggle.addEventListener('click', toggleLanguage);
    voiceToggle.addEventListener('click', toggleVoice);
    if (backButton) backButton.addEventListener('click', goBack);
    document.getElementById('practice1-btn').addEventListener('click', practiceSounds);
    document.getElementById('practice2-btn').addEventListener('click', practiceWords);
    document.getElementById('practice3-btn').addEventListener('click', practiceSentences);
    
    // Add click events for word cards and sentences
    document.querySelectorAll('.word-card').forEach(card => {
        card.addEventListener('click', () => {
            const word = card.getAttribute('data-word');
            speak(word);
        });
    });
    
    document.querySelectorAll('.sentence-example').forEach(sentence => {
        sentence.addEventListener('click', () => {
            const sentenceText = sentence.getAttribute('data-sentence');
            speak(sentenceText);
        });
    });

    // Functions
    function toggleLanguage() {
        isAmharic = !isAmharic;
        updateContent();
    }

    function toggleVoice() {
        voiceEnabled = !voiceEnabled;
        updateVoiceButton();
    }

    function goBack() {
        window.history.back();
    }

    function updateVoiceButton() {
        const lang = isAmharic ? 'amharic' : 'english';
        voiceToggle.textContent = voiceEnabled ? content[lang].voiceOn : content[lang].voiceOff;
    }

    function updateContent() {
        const lang = isAmharic ? 'amharic' : 'english';
        const langContent = content[lang];
        
        // Update all text content
        document.getElementById('main-title').textContent = langContent.title;
        document.getElementById('lesson1-title').textContent = langContent.lesson1Title;
        document.getElementById('lesson1-text').textContent = langContent.lesson1Text;
        document.getElementById('lesson2-title').textContent = langContent.lesson2Title;
        document.getElementById('word1-text').textContent = langContent.word1Text;
        document.getElementById('word2-text').textContent = langContent.word2Text;
        document.getElementById('word3-text').textContent = langContent.word3Text;
        document.getElementById('lesson3-title').textContent = langContent.lesson3Title;
        document.getElementById('sentence1-text').textContent = langContent.sentence1Text;
        document.getElementById('sentence2-text').textContent = langContent.sentence2Text;
        document.getElementById('practice1-btn').textContent = langContent.practice1Btn;
        document.getElementById('practice2-btn').textContent = langContent.practice2Btn;
        document.getElementById('practice3-btn').textContent = langContent.practice3Btn;
        languageToggle.textContent = langContent.toggleText;
        
        // Update footer and back button
        if (footerCopyright) footerCopyright.textContent = langContent.footer;
        if (backButtonText) backButtonText.textContent = langContent.backButton;
        
        updateVoiceButton();
    }

    function speak(text) {
        if (!voiceEnabled || !speechSynth) return;
        
        speechSynth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        speechSynth.speak(utterance);
    }

    function practiceSounds() {
        const sounds = isAmharic ? 
            "ድምፆች: ኤ (አፕል), ቢ (boል), ሲ (ካት), ዲ (ዶግ), ኢ (ኤግ)" :
            "Sounds: A (apple), B (ball), C (cat), D (dog), E (egg)";
        
        alert(sounds);
        
        if (voiceEnabled) {
            const letters = ['A', 'B', 'C', 'D', 'E'];
            const examples = ['apple', 'ball', 'cat', 'dog', 'egg'];
            
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    speak(letter);
                    setTimeout(() => {
                        speak(examples[index]);
                    }, 800);
                }, index * 1800);
            });
        }
    }

    function practiceWords() {
        const words = isAmharic ?
            "ቃላትን ያንብቡ: ድመት, ውሻ, ፀሐይ" :
            "Read the words: cat, dog, sun";
        alert(words);
        
        if (voiceEnabled) {
            const wordList = ['cat', 'dog', 'sun'];
            wordList.forEach((word, index) => {
                setTimeout(() => {
                    speak(word);
                }, index * 1500);
            });
        }
    }

    function practiceSentences() {
        const sentences = isAmharic ?
            "ሀረጎችን ያንብቡ: 'The cat sat.' እና 'I see the sun.'" :
            "Read the sentences: 'The cat sat.' and 'I see the sun.'";
        alert(sentences);
        
        if (voiceEnabled) {
            const sentenceList = ['The cat sat.', 'I see the sun.'];
            sentenceList.forEach((sentence, index) => {
                setTimeout(() => {
                    speak(sentence);
                }, index * 3000);
            });
        }
    }

    // Load voices
    if (speechSynth) {
        speechSynth.onvoiceschanged = function() {
            console.log("Voices loaded:", speechSynth.getVoices());
        };
        
        if (speechSynth.getVoices().length === 0) {
            speechSynth.addEventListener('voiceschanged', function() {
                console.log("Voices loaded after event:", speechSynth.getVoices());
            });
        }
    } else {
        console.warn("Speech synthesis not supported");
        voiceToggle.disabled = true;
    }
});
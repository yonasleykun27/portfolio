document.addEventListener('DOMContentLoaded', function() {
    // Character sets
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';

    // DOM elements
    const uppercaseGrid = document.getElementById('uppercase-grid');
    const lowercaseGrid = document.getElementById('lowercase-grid');
    const container = document.querySelector('.container');
    const synth = window.speechSynthesis;
    const backButton = document.getElementById('back-button');

    // Initialize the app
    function init() {
        createButtons();
        if (backButton) {
            backButton.addEventListener('click', goBack);
        }
    }

    // Create all letter buttons
    function createButtons() {
        // Create uppercase letters
        uppercaseLetters.split('').forEach(char => {
            createButton(char, uppercaseGrid, true);
        });

        // Create lowercase letters
        lowercaseLetters.split('').forEach(char => {
            createButton(char, lowercaseGrid, false);
        });
    }

    // Create a single interactive button
    function createButton(char, parent, isUppercase) {
        const button = document.createElement('button');
        button.className = 'item-btn';
        button.textContent = char;
        button.addEventListener('click', () => handleCharacterClick(char, isUppercase));
        parent.appendChild(button);
    }

    // Handle character clicks
    function handleCharacterClick(char, isUppercase) {
        speakCharacter(char);
        showCharacterPage(char, isUppercase);
    }

    // Speak the character using Web Speech API
    function speakCharacter(char) {
        synth.cancel(); // Cancel any ongoing speech

        const utterance = new SpeechSynthesisUtterance(char);
        utterance.rate = 0.8; // Slightly slower for children
        utterance.pitch = 1.1; // Slightly higher pitch

        synth.speak(utterance);
    }

    // Show the character detail page
    function showCharacterPage(char, isUppercase) {
        // Determine character type
        const type = isUppercase ? 'Uppercase Letter' : 'Lowercase Letter';

        container.innerHTML = `
            <div class="character-page">
                <div class="character-display">
                    <div class="character">${char}</div>
                    <p class="type">${type}</p>
                    <button class="sound-btn" id="play-sound">
                        🔊 Hear Again
                    </button>
                </div>
                <button class="back-btn" id="back-to-main">Back to Main</button>
            </div>
        `;

        // Setup event listeners for the new page
        document.getElementById('play-sound').addEventListener('click', () => speakCharacter(char));
        document.getElementById('back-to-main').addEventListener('click', init);
    }

    // Go back to previous page
    function goBack() {
        window.history.back();
    }

    // Initialize the application
    init();
});
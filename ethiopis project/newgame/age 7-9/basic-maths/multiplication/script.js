document.addEventListener('DOMContentLoaded', function() {
    const translations = {
        en: {
            title: "Multiplication Game",
            difficultyLabel: "Difficulty:",
            difficulties: {
                easy: "Easy (1-5)",
                medium: "Medium (1-10)",
                hard: "Hard (1-12)"
            },
            checkBtn: "Check",
            newBtn: "New Problem",
            langBtn: "በአማርኛ",
            correct: "Correct! 🎉",
            incorrect: "Try again! ❌",
            score: "Score: ",
            backButton: "← Back"
        },
        am: {
            title: "የማባዛት ጨዋታ",
            difficultyLabel: "ችግር:",
            difficulties: {
                easy: "ቀላል (1-5)",
                medium: "መካከለኛ (1-10)",
                hard: "ከባድ (1-12)"
            },
            checkBtn: "አረጋግጥ",
            newBtn: "አዲስ ችግር",
            langBtn: "In English",
            correct: "ትክክል! 🎉",
            incorrect: "እንደገና ይሞክሩ! ❌",
            score: "ውጤት: ",
            backButton: "← ወደ ኋላ"
        }
    };

    let currentLang = 'en';
    let score = 0;
    let currentProblem = null;
    let currentDifficulty = 'medium';

    // DOM elements
    const langBtn = document.getElementById('langBtn');
    const backButton = document.getElementById('back-button');
    const titleElement = document.getElementById('title');
    const difficultyLabel = document.getElementById('difficultyLabel');
    const difficultySelect = document.getElementById('difficultySelect');
    const checkBtn = document.getElementById('checkBtn');
    const newBtn = document.getElementById('newBtn');
    const scoreElement = document.getElementById('score');
    const feedbackElement = document.getElementById('feedback');
    const num1Element = document.getElementById('num1');
    const num2Element = document.getElementById('num2');
    const answerElement = document.getElementById('answer');

    // Initialize the game
    initGame();

    function initGame() {
        updateContent();
        currentDifficulty = difficultySelect.value;
        generateNewProblem();
        setupEventListeners();
    }

    function updateContent() {
        titleElement.textContent = translations[currentLang].title;
        difficultyLabel.textContent = translations[currentLang].difficultyLabel;
        
        // Update difficulty options
        difficultySelect.innerHTML = '';
        for (const [value, text] of Object.entries(translations[currentLang].difficulties)) {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = text;
            if (value === currentDifficulty) {
                option.selected = true;
            }
            difficultySelect.appendChild(option);
        }
        
        checkBtn.textContent = translations[currentLang].checkBtn;
        newBtn.textContent = translations[currentLang].newBtn;
        langBtn.textContent = translations[currentLang].langBtn;
        if (backButton) backButton.textContent = translations[currentLang].backButton;
        updateScore();
    }

    function generateNewProblem() {
        let max;
        switch(currentDifficulty) {
            case 'easy': max = 5; break;
            case 'medium': max = 10; break;
            case 'hard': max = 12; break;
            default: max = 10;
        }
        
        const num1 = Math.floor(Math.random() * max) + 1;
        const num2 = Math.floor(Math.random() * max) + 1;
        currentProblem = {
            num1,
            num2,
            answer: num1 * num2
        };
        
        displayProblem();
    }

    function displayProblem() {
        num1Element.textContent = currentProblem.num1;
        num2Element.textContent = currentProblem.num2;
        answerElement.value = '';
        answerElement.focus();
        feedbackElement.textContent = '';
    }

    function updateScore() {
        scoreElement.textContent = translations[currentLang].score + score;
    }

    function showFeedback(isCorrect) {
        feedbackElement.textContent = isCorrect 
            ? translations[currentLang].correct 
            : translations[currentLang].incorrect;
        feedbackElement.style.color = isCorrect ? '#4CAF50' : '#f44336';
    }

    function checkAnswer() {
        const userAnswer = parseInt(answerElement.value);
        if (isNaN(userAnswer)) {
            showFeedback(false);
            return;
        }
        
        if (userAnswer === currentProblem.answer) {
            score++;
            updateScore();
            showFeedback(true);
            setTimeout(generateNewProblem, 1000);
        } else {
            showFeedback(false);
            answerElement.select();
        }
    }

    function changeDifficulty() {
        currentDifficulty = difficultySelect.value;
        generateNewProblem();
    }

    function handleBackButton() {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
    }

    function setupEventListeners() {
        langBtn.addEventListener('click', function() {
            currentLang = currentLang === 'en' ? 'am' : 'en';
            updateContent();
        });

        if (backButton) {
            backButton.addEventListener('click', handleBackButton);
        }

        checkBtn.addEventListener('click', checkAnswer);
        newBtn.addEventListener('click', generateNewProblem);
        difficultySelect.addEventListener('change', changeDifficulty);

        answerElement.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkAnswer();
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const animals = [
        { 
            name: "Lion", 
            nameAm: "አንበሳ", 
            desc: "The lion is known as the king of the jungle!", 
            descAm: "አንበሳ እንደ ንጉስ የጫካ ነው!", 
            habitat: "Savanna", 
            habitatAm: "ሳቫና", 
            image: "Lion.png" 
        },
        { 
            name: "Elephant", 
            nameAm: "ዝሆን", 
            desc: "Elephants are the largest land animals on Earth!", 
            descAm: "ዝሆኖች በምድር ላይ ያሉ ትላልቅ እንስሳት ናቸው!", 
            habitat: "Savanna", 
            habitatAm: "ሳቫና", 
            image: "elephant.png" 
        },
        { 
            name: "Monkey", 
            nameAm: "ዝንጀሮ", 
            desc: "Monkeys love to climb trees and eat bananas!", 
            descAm: "ዝንጀሮዎች ዛፎችን መውጣት እና ሙዝ መብላት ይወዳሉ!", 
            habitat: "Jungle", 
            habitatAm: "ጫካ", 
            image: "monkey.png" 
        },
        { 
            name: "Giraffe", 
            nameAm: "ቀጭኔ", 
            desc: "Giraffes have the longest necks of any animal!", 
            descAm: "ቀጭኔዎች ከማንኛውም እንስሳት ረዣዥም አንገት አላቸው!", 
            habitat: "Savanna", 
            habitatAm: "ሳቫና", 
            image: "giraffe.png" 
        },
        { 
            name: "Penguin", 
            nameAm: "ፕንግዊን", 
            desc: "Penguins are birds that can't fly but swim very well!", 
            descAm: "ፕንግዊኖች መብረር የማይችሉ ግን በጣም ጥሩ የሚያይዙ ወፎች ናቸው!", 
            habitat: "Antarctica", 
            habitatAm: "አንታርክቲካ", 
            image: "penguin.png" 
        },
        { 
            name: "Dolphin", 
            nameAm: "ዶሎፊን", 
            desc: "Dolphins are very smart and playful marine animals!", 
            descAm: "ዶሎፊኖች በጣም ብልህ እና ተጫዋች የባህር እንስሳት ናቸው!", 
            habitat: "Ocean", 
            habitatAm: "ውቅያኖስ", 
            image: "dolphin.png" 
        }
    ];

    // DOM Elements
    const animalList = document.getElementById('animalList');
    const habitat = document.getElementById('habitat');
    const animalDisplay = document.getElementById('animalDisplay');
    const languageToggle = document.getElementById('languageToggle');
    const headerTitle = document.querySelector('header h1');
    const clickSound = document.getElementById('clickSound');
    
    // State
    let currentLanguage = localStorage.getItem('animalExplorerLanguage') || 'en';

    // Initialize
    updateLanguageButton();
    updateUI();

    // Event Listeners
    languageToggle.addEventListener('click', toggleLanguage);

    function toggleLanguage() {
        clickSound.play();
        currentLanguage = currentLanguage === 'en' ? 'am' : 'en';
        localStorage.setItem('animalExplorerLanguage', currentLanguage);
        updateLanguageButton();
        updateUI();
    }

    function updateLanguageButton() {
        languageToggle.textContent = currentLanguage === 'en' ? 'አማርኛ' : 'English';
        languageToggle.style.fontFamily = currentLanguage === 'en' 
            ? "'Comic Neue', cursive" 
            : "'Noto Sans Ethiopic', sans-serif";
    }

    function updateUI() {
        // Update header title
        headerTitle.textContent = currentLanguage === 'en' ? 'Animal Explorer' : 'የእንስሳት መርማሪ';
        
        // Update animal list
        animalList.innerHTML = animals.map(animal => `
            <div class="animal-item" draggable="true" data-name="${animal.name}">
                ${currentLanguage === 'en' ? animal.name : animal.nameAm}
            </div>
        `).join('');

        // Update habitat placeholder
        if (!habitat.dataset.animal) {
            habitat.innerHTML = currentLanguage === 'en' 
                ? "Drop Animal Here to Learn About Its Habitat" 
                : "በዚህ ላይ እንስሳትን ጣል በማድረግ የእርሱን መኖሪያ ቦታ ይወቁ";
        }

        // Reattach event listeners
        attachEventListeners();
    }

    function attachEventListeners() {
        // Animal click event
        document.querySelectorAll('.animal-item').forEach(item => {
            item.addEventListener('click', () => {
                clickSound.play();
                const animalName = item.dataset.name;
                const animal = animals.find(a => a.name === animalName);
                
                animalDisplay.innerHTML = `
                    <img src="images/${animal.image}" alt="${animal.name}" class="language-change">
                    <h2 class="language-change">${currentLanguage === 'en' ? animal.name : animal.nameAm}</h2>
                    <p class="language-change">${currentLanguage === 'en' ? animal.desc : animal.descAm}</p>
                `;
            });
        });

        // Drag and drop events
        document.querySelectorAll('.animal-item').forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', item.dataset.name);
            });
        });

        habitat.addEventListener('dragover', (e) => {
            e.preventDefault();
            habitat.style.backgroundColor = 'rgba(46, 204, 113, 0.3)';
        });
        
        habitat.addEventListener('dragleave', () => {
            habitat.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
        });
        
        habitat.addEventListener('drop', (e) => {
            e.preventDefault();
            clickSound.play();
            habitat.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
            const animalName = e.dataTransfer.getData('text/plain');
            const animal = animals.find(a => a.name === animalName);
            habitat.dataset.animal = animalName;
            habitat.innerHTML = `
                <h3 class="language-change">${currentLanguage === 'en' ? animal.name : animal.nameAm}'s ${currentLanguage === 'en' ? 'Habitat' : 'መኖሪያ ቦታ'}</h3>
                <p class="language-change">${currentLanguage === 'en' ? animal.name : animal.nameAm} ${currentLanguage === 'en' ? 'lives in the' : 'በ'} ${currentLanguage === 'en' ? animal.habitat : animal.habitatAm}${currentLanguage === 'en' ? '' : ' ይኖራል'}</p>
                <img src="images/${animal.habitat.toLowerCase()}.png" alt="${animal.habitat}" style="max-width: 100px; margin-top: 10px;" class="language-change">
            `;
        });
    }
});
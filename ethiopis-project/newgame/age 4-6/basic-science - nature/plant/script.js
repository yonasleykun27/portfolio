document.addEventListener('DOMContentLoaded', () => {
    const plants = [
        { 
            name: "Rose", 
            nameAm: "ሮዝ", 
            desc: "Roses are beautiful flowers with lovely scent! They come in many colors like red, pink, yellow and white.", 
            descAm: "ሮዞች ቆንጆ አበቦች እና ጥሩ ሽታ ያላቸው ናቸው! በብዙ ቀለሞች እንደ ቀይ, ሮዝ, ቢጫ እና ነጭ ይመጣሉ.", 
            image: "rose.png",
            growth: "Roses grow from seeds or cuttings and need plenty of sunlight and water.",
            growthAm: "ሮዞች ከዘር ወይም ከቁርጥ ያድጋሉ እና ብዙ የፀሐይ ብርሃን እና ውሃ ያስፈልጋቸዋል."
        },
        { 
            name: "Sunflower", 
            nameAm: "የፀሐይ አበባ", 
            desc: "Sunflowers turn to face the sun! They can grow very tall and their seeds are tasty and nutritious.", 
            descAm: "የፀሐይ አበቦች ፀሐይን ለመመልከት �ይሽከረክራሉ! በጣም ረጅም ሊሆኑ ይችላሉ እና ዘሮቻቸው ጣፋጭ እና �ላጭ ናቸው.", 
            image: "sunflower.png",
            growth: "Sunflowers grow quickly from seeds and always face the sunlight.",
            growthAm: "የፀሐይ አበቦች በፍጥነት ከዘር ያድጋሉ እና ሁልጊዜ ወደ ፀሐይ ይመለከታሉ."
        },
        { 
            name: "Tree", 
            nameAm: "ዛፍ", 
            desc: "Trees give us oxygen and clean the air! They provide shade, homes for animals, and wood for many uses.", 
            descAm: "ዛፎች ኦክስጅን ይሰጡናል እና አየሩን ያፅዳሉ! ጥላ, ለእንስሳት መኖሪያ እና ለብዙ አገልግሎቶች እንጨት ይሰጣሉ.", 
            image: "tree.png",
            growth: "Trees grow from seeds over many years, developing strong trunks and branches.",
            growthAm: "ዛፎች ከዘር በርካታ ዓመታት ውስጥ ያድጋሉ, ጠንካራ ግንዶች እና ቅርንጫፎች ይፈጥራሉ."
        },
        { 
            name: "Cactus", 
            nameAm: "ካክተስ", 
            desc: "Cacti store water in their stems to survive in dry deserts! They have spines instead of leaves.", 
            descAm: "ካክተሶች በእረኞች ውስጥ ለመትረፍ ውሃን በቅርንጫፎቻቸው ይከማቻሉ! ከቅጠሎች ይልቅ እሾሆች አሏቸው.", 
            image: "cactus.png",
            growth: "Cacti grow slowly and can survive with very little water.",
            growthAm: "ካክተሶች በዝግታ �ይድጋሉ እና በበግር ውሃ ሊቆዩ ይችላሉ."
        },
        { 
            name: "Tulip", 
            nameAm: "ቲዩሊፕ", 
            desc: "Tulips are colorful flowers that bloom in spring! They grow from bulbs underground.", 
            descAm: "ቲዩሊፖች በጽዳት የሚበቡ ሕብረቀለም አበቦች ናቸው! ከመሬት ስር ካሉ አበቦች ያድጋሉ.", 
            image: "tulip.png",
            growth: "Tulip bulbs are planted in fall and bloom beautifully in spring.",
            growthAm: "የቲዩሊፕ አበቦች በመፀው ይተከላሉ እና በጽዳት በጥሩ ሁኔታ ይበባሉ."
        }
    ];

    // DOM Elements
    const plantList = document.getElementById('plantList');
    const plantDisplay = document.getElementById('plantDisplay');
    const languageToggle = document.getElementById('languageToggle');
    const headerTitle = document.querySelector('header h1');
    const growBtn = document.getElementById('growBtn');
    const growthAnimation = document.getElementById('growthAnimation');
    const clickSound = document.getElementById('clickSound');
    
    // State
    let currentLanguage = localStorage.getItem('plantExplorerLanguage') || 'en';

    // Initialize
    updateLanguageButton();
    updateUI();

    // Event Listeners
    languageToggle.addEventListener('click', toggleLanguage);
    growBtn.addEventListener('click', growPlant);

    function toggleLanguage() {
        clickSound.play();
        currentLanguage = currentLanguage === 'en' ? 'am' : 'en';
        localStorage.setItem('plantExplorerLanguage', currentLanguage);
        updateLanguageButton();
        updateUI();
    }

    function updateLanguageButton() {
        languageToggle.textContent = currentLanguage === 'en' ? 'አማርኛ' : 'English';
        languageToggle.style.fontFamily = currentLanguage === 'en' 
            ? "'Comic Neue', cursive" 
            : "'Noto Sans Ethiopic', sans-serif";
        
        // Update grow button text
        growBtn.textContent = currentLanguage === 'en' 
            ? "Make It Grow!" 
            : "እንዲያድግ አድርግ!";
    }

    function updateUI() {
        // Update header title
        headerTitle.textContent = currentLanguage === 'en' 
            ? 'Plant Explorer' 
            : 'የተክል መርማሪ';
        
        // Update plant list
        plantList.innerHTML = plants.map(plant => `
            <div class="plant-item" data-name="${plant.name}">
                ${currentLanguage === 'en' ? plant.name : plant.nameAm}
            </div>
        `).join('');

        // Update default display message if nothing is selected
        if (!plantDisplay.dataset.plant) {
            plantDisplay.innerHTML = `
                <p class="language-change">
                    ${currentLanguage === 'en' 
                        ? "Click on a plant to learn more!" 
                        : "ስለ ተክል ለመማር ከላይ ያለውን ጠቅ አድርግ!"}
                </p>
            `;
        }

        // Reattach event listeners
        attachEventListeners();
    }

    function attachEventListeners() {
        // Plant click events
        document.querySelectorAll('.plant-item').forEach(item => {
            item.addEventListener('click', () => {
                clickSound.play();
                const plantName = item.dataset.name;
                const plant = plants.find(p => p.name === plantName);
                plantDisplay.dataset.plant = plantName;
                
                plantDisplay.innerHTML = `
                    <img src="images/${plant.image}" alt="${plant.name}" class="language-change">
                    <h2 class="language-change">${currentLanguage === 'en' ? plant.name : plant.nameAm}</h2>
                    <p class="language-change">${currentLanguage === 'en' ? plant.desc : plant.descAm}</p>
                    <p class="language-change" style="margin-top: 1rem;">
                        <strong>${currentLanguage === 'en' ? 'How it grows:' : 'እንዴት እንደሚያድግ:'}</strong> 
                        ${currentLanguage === 'en' ? plant.growth : plant.growthAm}
                    </p>
                `;
            });
        });
    }

    function growPlant() {
        clickSound.play();
        // Reset animation
        growthAnimation.style.height = '0';
        void growthAnimation.offsetWidth; // Trigger reflow
        
        // Grow animation
        growthAnimation.style.height = '200px';
        
        // Reset after animation completes
        setTimeout(() => {
            growthAnimation.style.height = '0';
        }, 3000);
    }
});
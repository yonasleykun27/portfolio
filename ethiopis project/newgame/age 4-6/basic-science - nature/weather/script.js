document.addEventListener('DOMContentLoaded', () => {
    const weatherTypes = [
        {
            name: "Sunny",
            nameAm: "ፀሃይ ያበራ",
            desc: "A sunny day is perfect for playing outside! The sun gives us light and warmth. Remember to <a href='#'>wear sunscreen</a>!",
            descAm: "ፀሃያማ ቀን ከቤት ውጭ ለመጫወት ፍጹም ነው! ፀሃይ ብርሃን እና ሙቀት ይሰጠናል። <a href='#'>ፀሐየ ማከሚያ</a> እንደምታጠቃ አትርሳ!",
            icon: "☀️",
            activities: ["Play outside", "Have a picnic", "See your shadow"],
            activitiesAm: ["ከቤት ውጭ ተጫወት", "ፒክኒክ አድርግ", "ጥላህን ርምጠው"]
        },
        {
            name: "Rainy",
            nameAm: "ዝናባማ",
            desc: "Rain helps plants grow and fills our rivers! It's nature's way of watering the earth. Don't forget your <a href='#'>umbrella</a>!",
            descAm: "ዝናብ እፅዋት እንዲበለጥ እና ወንዞቻችን እንዲሞሉ ይረዳል! ይህ ተፈጥሯዊ የምድር መልቀቂያ ነው። <a href='#'>ጦማርህን</a> አትርሳ!",
            icon: "🌧️",
            activities: ["Use an umbrella", "Jump in puddles", "Listen to the rain"],
            activitiesAm: ["ጦማር ይጠቀም", "በውሃ ገባ ጥቅጥቅ", "የዝናብ ድምፅ ስማ"]
        },
        {
            name: "Windy",
            nameAm: "ነፋሳማ",
            desc: "Wind can fly kites and spin wind turbines! It's moving air that we can't see but can feel. Great day to <a href='#'>fly a kite</a>!",
            descAm: "ነፋስ ወረቀት ወፎች እንዲበሩ እና የነፋስ ማማዎች እንዲሽከረከሩ ያደርጋል! ይህ �ይቶ የማናይው ነገር ግን የምናስተውለው አየር ነው። <a href='#'>ወረቀት ወፍ</a> ለማብረር ጥሩ ቀን!",
            icon: "🌪️",
            activities: ["Fly a kite", "Watch leaves blow", "Feel the breeze"],
            activitiesAm: ["ወረቀት ወፍ አብር", "ቅጠሎች እንዴት እንደሚሽከረከሩ ተመልከት", "ነፋሱን አስተውል"]
        },
        {
            name: "Snowy",
            nameAm: "በረዶማ",
            desc: "Snow is frozen water that falls from the sky when it's very cold! Bundle up to <a href='#'>play in the snow</a>!",
            descAm: "በረዶ በጣም በረዶ በሚልቅበት ጊዜ ከሰማይ የሚወድቅ የበረዶ ውሃ ነው! <a href='#'>በበረዶ ውስጥ ለመጫወት</a> ጠብብህ ውሰድ!",
            icon: "❄️",
            activities: ["Build a snowman", "Go sledding", "Make snow angels"],
            activitiesAm: ["የበረዶ ሰው ገንባ", "በሰሌዳ ተንሸራትት", "የበረዶ እንቆቅልሽ አድርግ"]
        },
        {
            name: "Cloudy",
            nameAm: "ደመናማ",
            desc: "Clouds are made of tiny water droplets floating in the sky! Sometimes they look like fun shapes. What shapes do you <a href='#'>see in the clouds</a>?",
            descAm: "ደመናዎች በሰማይ የሚንሸራተቱ ትናንሽ የውሃ ጠብታዎች ናቸው! አንዳንድ ጊዜ አስደሳች ቅርጾች ይመስላሉ። በደመናዎቹ ውስጥ ምን ዓይነት <a href='#'>ቅርጾች</a> ታያለህ?",
            icon: "☁️",
            activities: ["Look for shapes in clouds", "Read a book outside", "Have a relaxing day"],
            activitiesAm: ["በደመናዎቹ ውስጥ ቅርጾችን ፈልግ", "ከቤት ውጭ መጽሐፍ አንብብ", "ለማረፊያ ቀን አድርግ"]
        }
    ];

    // DOM Elements
    const weatherButtons = document.getElementById('weatherButtons');
    const weatherDisplay = document.getElementById('weatherDisplay');
    const languageToggle = document.getElementById('languageToggle');
    const headerTitle = document.querySelector('header h1');
    const clickSound = document.getElementById('clickSound');
    
    // State
    let currentLanguage = localStorage.getItem('weatherExplorerLanguage') || 'en';

    // Initialize
    updateLanguageButton();
    updateUI();

    // Event Listeners
    languageToggle.addEventListener('click', toggleLanguage);

    function toggleLanguage() {
        clickSound.play();
        currentLanguage = currentLanguage === 'en' ? 'am' : 'en';
        localStorage.setItem('weatherExplorerLanguage', currentLanguage);
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
        headerTitle.textContent = currentLanguage === 'en' ? 'Weather Explorer' : 'የአየር ሁኔታ መርማሪ';
        
        // Update weather buttons
        weatherButtons.innerHTML = weatherTypes.map(weather => `
            <button class="weather-btn" data-type="${weather.name}">
                ${weather.icon} ${currentLanguage === 'en' ? weather.name : weather.nameAm}
            </button>
        `).join('');

        // Update default display message if nothing is selected
        if (!weatherDisplay.dataset.weather) {
            weatherDisplay.innerHTML = `
                <p class="language-change">
                    ${currentLanguage === 'en' 
                        ? "Click on a weather type to learn more!" 
                        : "ስለ አየር ሁኔታ ለመማር ከላይ ያለውን አዝራር ጠቅ አድርግ!"}
                </p>
            `;
        }

        // Reattach event listeners
        attachEventListeners();
    }

    function attachEventListeners() {
        // Weather button click events
        document.querySelectorAll('.weather-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                clickSound.play();
                const weatherType = btn.dataset.type;
                const weather = weatherTypes.find(w => w.name === weatherType);
                weatherDisplay.dataset.weather = weatherType;
                
                weatherDisplay.innerHTML = `
                    <div class="weather-icon language-change">${weather.icon}</div>
                    <h2 class="language-change">${currentLanguage === 'en' ? weather.name : weather.nameAm} ${currentLanguage === 'en' ? 'Weather' : 'አየር ሁኔታ'}</h2>
                    <div class="weather-info">
                        <p class="language-change">${currentLanguage === 'en' ? weather.desc : weather.descAm}</p>
                        <h3 class="language-change" style="margin-top: 1rem;">
                            ${currentLanguage === 'en' ? 'Fun Things to Do:' : 'ለመስራት አስደሳች ነገሮች፥'}
                        </h3>
                        <ul style="text-align: left; margin-top: 0.5rem;">
                            ${(currentLanguage === 'en' ? weather.activities : weather.activitiesAm)
                                .map(activity => `<li class="language-change">${activity}</li>`).join('')}
                        </ul>
                    </div>
                `;
            });
        });
    }
});
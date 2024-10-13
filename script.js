function getCurrentYearWithEra() {
    const currentYear = new Date().getFullYear(); // Get the current year
    let era = "AD"; // Default to AD (common era)

    // If the year is BC (you can modify this condition as needed)
    if (currentYear < 0) {
        era = "BC";
    }

    return { year: Math.abs(currentYear), era: era };
}

function getCurrentYuga() {
    const currentYear = new Date().getFullYear(); // Get the current year (e.g., 2024)
    const kaliYugaStart = 3102; // Kali Yuga began in 3102 BCE

    // Calculate the current year in Kali Yuga
    const currentInKaliYuga = (currentYear + kaliYugaStart); // Current year in Kali Yuga

    // Define the durations of each Yuga in years
    const satyaYuga = 1728000;
    const tretaYuga = 1296000;
    const dvaparaYuga = 864000;
    const kaliYuga = 432000;

    // Calculate the total duration of a Maha Yuga
    const totalMahaYuga = satyaYuga + tretaYuga + dvaparaYuga + kaliYuga;

    // Calculate the current position in the Yugas
    let elapsedYears = currentInKaliYuga; // Years since the start of Kali Yuga
    let currentYuga = '';
    let yugaYear = 0;

    if (elapsedYears < kaliYuga) {
        currentYuga = 'Kali Yuga';
        yugaYear = elapsedYears;
    } else if (elapsedYears < kaliYuga + dvaparaYuga) {
        elapsedYears -= kaliYuga;
        currentYuga = 'Dvapara Yuga';
        yugaYear = elapsedYears;
    } else if (elapsedYears < kaliYuga + dvaparaYuga + tretaYuga) {
        elapsedYears -= (kaliYuga + dvaparaYuga);
        currentYuga = 'Treta Yuga';
        yugaYear = elapsedYears;
    } else if (elapsedYears < kaliYuga + dvaparaYuga + tretaYuga + satyaYuga) {
        elapsedYears -= (kaliYuga + dvaparaYuga + tretaYuga);
        currentYuga = 'Satya Yuga';
        yugaYear = elapsedYears;
    } else {
        currentYuga = 'Beyond Current Cycle';
        yugaYear = 0;
    }

    // Display the current Yuga and years in the HTML
    let yugaElement = document.getElementsByClassName("yuga")[0]; // Get the first element with the class 'yuga'
    yugaElement.innerHTML = `${currentYuga}, Year: ${yugaYear}`; // Set the innerHTML to the calculated Yuga and year

    // Calculate the ending year of Kali Yuga
    const kaliYugaEndYear = kaliYugaStart + kaliYuga; // Ending year of Kali Yuga (in BCE)
    let kaliEndElement = document.getElementsByClassName("yuga-end")[0]; // Get the first element with the class 'yuga-end'
    kaliEndElement.innerHTML = `Kali Yuga will end in the year: ${kaliYugaEndYear} BCE`; // Display the Kali Yuga end year
}

function displayCurrentYear() {
    const { year, era } = getCurrentYearWithEra(); // Get current year and era
    let yearElement = document.getElementsByClassName("year")[0]; // Get the element to display year
    yearElement.innerHTML = `${year} ${era}`; // Display the year with AD or BC
}
// Call the function to display the current Yuga
getCurrentYuga();

displayCurrentYear();

function clock() {
    let secDots = document.getElementById('secDots');
    let minDots = document.getElementById('minDots');
    let hrDots = document.getElementById('hrDots');
    let paharDots = document.getElementById('paharaDots');
    let muhDots = document.getElementById('muharataDots');
    let ghatiDots = document.getElementById('ghatiDots');

    let date = new Date();

    let hour = date.getHours();
    let minute = date.getMinutes();
    
    // Calculate the current ghatika (0 to 60)
    let ghatika = Math.floor(((hour * 60) + minute) / 24);

    //Muhurta
    let totalMuhurtas = 30; // Total Muhurtas in a day
    let totalMinutesInDay = 24 * 60; // Total minutes in a day
    let muhurtaDuration = totalMinutesInDay / totalMuhurtas; // Duration of each Muhūrta in minutes
    // Calculate the current Muhūrta
    let currentMinutes = (date.getHours() * 60) + date.getMinutes();
    let muhurta = Math.floor(currentMinutes / muhurtaDuration) + 1; // 1 to 30

    let pahara = Math.floor(date.getHours() / 3); // Use floor to determine pahara
    let hours = date.getHours() % 12; // convert to 12-hour format
    let amPm = date.getHours() >= 12 ? 'PM' : 'AM';
    hours = hours === 0 ? 12 : hours; // handle midnight (0 hours)
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    // Generate second dots
    let secondDots = '';
    for (let i = 1; i <= 60; i++) {
        let rotation = i * 6; // rotate each line by 6 degrees
        if (i === seconds) {
            secondDots += '<div class="dot active" style="transform:rotate(' + rotation + 'deg)"></div>';
        } else {
            secondDots += '<div class="dot" style="transform:rotate(' + rotation + 'deg)"></div>';
        }
    }

    // Generate minute dots
    let minuteDots = '';
    for (let i = 1; i <= 60; i++) {
        let rotation = i * 6; // rotate each line by 6 degrees
        if (i === minutes) {
            minuteDots += '<div class="dot active" style="transform:rotate(' + rotation + 'deg)"></div>';
        } else {
            minuteDots += '<div class="dot" style="transform:rotate(' + rotation + 'deg)"></div>';
        }
    }

    // Generate hour dots
    let hourDots = '';
    for (let i = 1; i < 13; i++) {
        let rotation = i * 30; // rotate each line by 30 degrees
        if (i === hours) {
            hourDots += '<div class="dot active" style="transform:rotate(' + rotation + 'deg)"></div>';
        } else {
            hourDots += '<div class="dot" style="transform:rotate(' + rotation + 'deg)"></div>';
        }
    }

    // Generate pahara dots
    let paharaDots = '';
    for (let i = 1; i < 9; i++) {
        let rotation = i * 45; // rotate each line by 90 degrees
        if (i === pahara) {
            paharaDots += '<div class="dot active" style="transform:rotate(' + rotation + 'deg)"></div>';
        } else {
            paharaDots += '<div class="dot" style="transform:rotate(' + rotation + 'deg)"></div>';
        }
    }

    // Generate Muhūrta dots
    let muhurtaDots = '';
    for (let i = 1; i <= totalMuhurtas; i++) {
        let rotation = i * (360 / totalMuhurtas); // Rotate each line by 12 degrees
        if (i === muhurta) {
            muhurtaDots += '<div class="dot active" style="transform:rotate(' + rotation + 'deg)"></div>';
        } else {
            muhurtaDots += '<div class="dot" style="transform:rotate(' + rotation + 'deg)"></div>';
        }
    }

    // Generate ghatika dots
    let ghatikaDots = '';
    for (let i = 1; i <= 60; i++) {
        let rotation = i * 6; // Each ghatika represents 6 degrees (360 degrees / 60 ghatikās)
        if (i === ghatika) {
            ghatikaDots += '<div class="dot active" style="transform:rotate(' + rotation + 'deg)"></div>';
        } else {
            ghatikaDots += '<div class="dot" style="transform:rotate(' + rotation + 'deg)"></div>';
        }
    }

    // Update inner HTML
    secDots.innerHTML = secondDots + '<b>' + amPm + '</b>' + '<h2>' + zero(seconds) + '<br><span>Seconds</span></h2>';
    minDots.innerHTML = minuteDots + '<h2>' + zero(minutes) + '<br><span>Minutes</span></h2>';
    hrDots.innerHTML = hourDots + '<h2>' + zero(hours) + '<br><span>Hours</span></h2>';
    paharDots.innerHTML = paharaDots + '<h2>' + zero(pahara) + '<br><span>Paharas</span></h2>';
    muhDots.innerHTML = muhurtaDots + '<h2>' + zero(muhurta) + '<br><span>Muhurta</span></h2>';
    ghatiDots.innerHTML = ghatikaDots + '<h2>' + zero(ghatika) + '<br><span>Ghatikās<br>or<br>Dandas</span></h2>';
}

// Add zero in single digit
function zero(val) {
    return val < 10 ? '0' + val : val;
}

setInterval(clock, 1000);

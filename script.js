const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = "!@#$%^&*()_+}{:?>/';][\|=-`~<"
    return symbols[Math.floor(Math.random() * symbols.length)];
}


const generate = document.getElementById('generateBtn');
generate.addEventListener('click', () => {
    console.log('you clicked me boss')
    const length = document.getElementById('passwordLength').value;
    const hasUpper = document.getElementById('upperCase').checked;
    const hasLower = document.getElementById('lowerCase').checked;
    const hasNumber = document.getElementById('numbers').checked;
    const hasSymbol = document.getElementById('symbols').checked;
    const result = document.getElementById('passwordResult');
    result.innerText = generatePassword(length, hasUpper, hasLower, hasNumber, hasSymbol);
})

function generatePassword(length, upper, lower, number, symbol) {
    let generatePassword = "";
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter((item) => Object.values(item)[0])
    for (let index = 0; index < length; index += typesCount) {
        typesArr.forEach((type) => {
            const funcName = Object.keys(type)[0];
            generatePassword += randomFunc[funcName]();
        });
    }
    const finalPassword = generatePassword.slice(0, length)
    return finalPassword;

}
//copy  to clipboardfunction
let button = document.getElementById('clipboardBtn');
// add click event listener on the button
button.addEventListener('click', (e) => {
    e.preventDefault();
    // execute command for the copied text by selecting textarea with the id 
    document.execCommand(
        "copy",
        false,
        document.getElementById('passwordResult').select()
    )
})

/* dark mode toggle  */
const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
);
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "dark") {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    }
}

toggleSwitch.addEventListener("change", switchTheme, false);
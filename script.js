let colorTheme = document.getElementById('colorMode');
let v1 = 'light';
let v2 = 'dark';

colorTheme.onclick = () => {
    document.body.classList.remove(v1);
    document.body.classList.add(v2);

    let aux;
    aux = v1;
    v1 = v2;
    v2 = aux;
}

let mousePos;
let money = {
    shares: document.querySelector('.sharesNumber'),
    price: document.querySelector('.priceNumber'),
    holdings: document.querySelector('.holdingsNumber'),
    converter: document.querySelector('.converter')
}
const slider = document.querySelector('.slider');
const axis = document.querySelector('.axis');
const bubble = document.querySelector('.pointerValue');

let sharesNumber, priceNumber, holdingsNumber;

let pointer = document.querySelector('.pointer');
let pointerValue = document.querySelector('.pointerValue');
let dobi = document.querySelector('.dobi');

priceInput();
bubble.style.left = money.price.value * (680 / maxValue) + axis.offsetLeft + 'px';

// INPUTS //

function shareInput() {

    updateInputs();
    money.holdings.value = parseInt(holdingsNumber);
    money.converter.value = parseInt(holdingsNumber * 4);
}
function priceInput() {

    updateInputs();
    money.holdings.value = parseInt(holdingsNumber);
    money.converter.value = parseInt(holdingsNumber * 4);
    pointerUpdate();
}
function holdingsInput() {
    sharesNumber = parseFloat(money.shares.value);
    holdingsNumber = parseFloat(money.holdings.value);
    priceNumber = parseInt(holdingsNumber / sharesNumber);

    money.price.value = priceNumber;
    updateInputs();
    pointerUpdate();

    money.converter.value = parseInt(holdingsNumber * 4);
}
function convertInput() {
    let convertedVal = money.converter.value;
    
    money.holdings.value = parseInt(convertedVal / 4);
    holdingsInput();
}


function updateInputs() {
    maxValue = document.querySelector('.maxVal');
    sharesNumber = parseFloat(money.shares.value);
    priceNumber = parseFloat(money.price.value);
    if(priceNumber > maxValue.value) {
        maxValue.value = parseInt(priceNumber);
        bubble.innerHTML = parseInt(priceNumber);
    }

    holdingsNumber = sharesNumber * priceNumber;
}


function pointerUpdate() {
    maxValue = document.querySelector('.maxVal').value;
    
    axis.max = maxValue;
    axis.value = money.price.value;

    bubble.style.left = money.price.value * (680 / maxValue) + axis.offsetLeft + 'px';

}


axis.addEventListener('input', ()=> {
    maxValue = document.querySelector('.maxVal').value;
    money.price.value = axis.value;
    priceInput();
    bubble.style.left = money.price.value * (680 / maxValue) + axis.offsetLeft + 'px';
    bubble.innerHTML = axis.value;
})    
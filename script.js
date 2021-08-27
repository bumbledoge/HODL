let endpoint = 'latest'
let access_key = 'c1c7f5eb143732a2c73e40ecf58ecbc9';
let from = 'GBP';

let currency = 0;
fetch('http://data.fixer.io/api/' + endpoint + '?access_key=' + access_key)
    .then(response => response.json())
    .then(data => currency = data.rates);


    
let colorTheme = document.getElementById('colorMode');
let v1 = 'light';
let v2 = 'dark';


// REMEMBER THEME WITH LOCALSTORAGE
const theme = localStorage.getItem('theme');
theme && document.body.classList.add(theme);


colorTheme.onclick = () => {
    document.body.classList.remove(v1);
    document.body.classList.add(v2);
    localStorage.setItem('theme', v2);

    { let aux = v1; v1 = v2; v2 = aux; }
}

// store previous digits nr to prevent overflow
let diggies = {
    shares: 2,
    price: 3,
    holdings: 4,
    converter: 5
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
    if(currency !== 0){
        
        let euros = money.holdings.value / currency.USD;
        money.converter.value =parseInt( euros * currency.RON);
    }
    else {
        money.converter.value = parseInt(holdingsNumber * 4);
    }
    pointerUpdate();
}
function holdingsInput() {
    sharesNumber = parseFloat(money.shares.value);
    holdingsNumber = parseFloat(money.holdings.value);
    priceNumber = parseInt(holdingsNumber / sharesNumber);

    money.price.value = priceNumber;
    updateInputs();
    pointerUpdate();

    if(currency !== 0){

        let euros = money.holdings.value / currency.USD;
        money.converter.value = parseInt(euros * currency.RON);
    }
    else {
        money.converter.value = money.holdings.value * 4;
    }
    
    // money.converter.value = parseInt(holdingsNumber * 4);
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
        bubble.innerHTML = `<span class="pv">${parseInt(priceNumber)}</span>`
        // bubble.innerHTML = parseInt(priceNumber);
    }
    holdingsNumber = sharesNumber * priceNumber;

    // UPDATE BOX SIZE BASED ON NUMEBR SIZE

    let sharesDig = nrDig(money.shares.value),
        priceDig = nrDig(money.price.value),
        holdingsDig = nrDig(money.holdings.value),
        converterDig = nrDig(money.converter.value);
    

    function boxMod(box, digs) {
        box.style.maxWidth = `${60 + 10 * digs}px`;

        return digs;
    }
    
    if(diggies.shares != sharesDig) {
        boxMod(money.shares, sharesDig);
        diggies.shares = sharesDig;
    }
    if(diggies.price != priceDig) {
        boxMod(money.price, priceDig);
        diggies.price = priceDig;
    }
    if(diggies.holdings != holdingsDig) {
        boxMod(money.holdings, holdingsDig);
        diggies.holdings = holdingsDig;
    }
    if(diggies.converter != converterDig) {
        boxMod(money.converter, converterDig);
        diggies.converter = converterDig;
    }
}


function pointerUpdate() {
    maxValue = document.querySelector('.maxVal').value;
    
    axis.max = maxValue;
    axis.value = money.price.value;

    bubble.style.left = money.price.value * (680 / maxValue) + axis.offsetLeft + 'px';

}
function nrDig(number) {
    if (number < 10) return 1;
    return 1 + nrDig(number / 10);
}


axis.addEventListener('input', ()=> {
    maxValue = document.querySelector('.maxVal').value;
    money.price.value = axis.value;
    priceInput();

    bubble.style.left = money.price.value * (680 / maxValue) + axis.offsetLeft + 'px';
    bubble.innerHTML = `<span class="pv">${axis.value}</span>`;
  
    const pv = document.querySelector('.pv');
    pv.style.margin = `${30 - ((nrDig(axis.value)-1) * 6)}px`;
})    



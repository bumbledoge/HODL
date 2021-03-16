let shares = document.querySelector('.sharesNumber');
let price = document.querySelector('.priceNumber');
let holdings = document.querySelector('.holdingsNumber');


let sharesNumber;
let priceNumber;
let holdingsNumber;

function shareInput() {

    updateInputs();
    holdings.value = holdingsNumber;
}
function priceInput() {

    updateinputs();
    holdings.value = holdingsNumber;
}
function holdingsInput() {
    sharesNumber = parseInt(shares.value);
    holdingsNumber = parseInt(holdings.value);
    priceNumber = holdingsNumber / sharesNumber;
    price.value = priceNumber;
}

function updateinputs() {
    sharesNumber = parseInt(shares.value);
    priceNumber = parseInt(price.value);
    holdingsNumber = sharesNumber * priceNumber;
}
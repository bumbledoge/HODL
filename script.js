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
    money.converter.value = holdingsNumber * 4;
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
    priceNumber = holdingsNumber / sharesNumber;

    money.price.value = priceNumber;
    pointerUpdate();

    money.converter.value = parseInt(holdingsNumber * 4);
}
function convertInput() {
    let convertedVal = money.converter.value;
    
    money.holdings.value = parseInt(convertedVal / 4);
    holdingsInput();
}


function updateInputs() {
    sharesNumber = parseFloat(money.shares.value);
    priceNumber = parseFloat(money.price.value);

    holdingsNumber = sharesNumber * priceNumber;
}


function pointerUpdate() {
    maxValue = document.querySelector('.maxVal').value;
    
    axis.max = maxValue;
    axis.value = money.price.value;
}


axis.addEventListener('input', ()=> {
    maxValue = document.querySelector('.maxVal').value;
    money.price.value = axis.value;
    priceInput();
    bubble.style.left = money.price.value * (680 / maxValue) + axis.offsetLeft + 'px';
    bubble.innerHTML = axis.value;
})    



// dragPointer(pointer);
// function dragPointer(elmnt){
//     let pos1 = 0, pos2 = 0;

//     elmnt.onmousedown = dragMouseDown;

//     function dragMouseDown(e) {
//         e = e || window.event;
//         e.preventDefault();
        
//         pos2 = e.clientX;
        
//         document.onmouseup = closeDragElement;
//         document.onmousemove = elementDrag;
//     }
//     function elementDrag(e) {
//         e = e || window.event;
//         e.preventDefault();

//         pos1 = pos2 - e.clientX;
//         pos2 = e.clientX;

//         let newPosition = elmnt.offsetLeft - pos1;
//         if(newPosition > 0 && newPosition < 681) {
            
//             // THE POINTER 
//             elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px';
            
//             // THE VALUE CONTAINER 
//             pointerValue.style.left = (elmnt.offsetLeft - pos1) + 'px';
            
//             maxValue = document.querySelector('.end').value;
//             dobi.value = parseInt(newPosition * (maxValue / 680));
//             money.price.value = dobi.value;
//             priceInput();
//         }
        
//     }
//     function closeDragElement(e) {
//         document.onmouseup = null;
//         document.onmousemove = null;
//     }
// }
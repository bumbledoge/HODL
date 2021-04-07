let money = {
    shares: document.querySelector('.sharesNumber'),
    price: document.querySelector('.priceNumber'),
    holdings: document.querySelector('.holdingsNumber'),
    converter: document.querySelector('.converter')
}

let sharesNumber, priceNumber, holdingsNumber;

let pointer = document.querySelector('.pointer');
let pointerValue = document.querySelector('.pointerValue');
let dobi = document.querySelector('.dobi');

dobi.value = 200;
priceInput();

// INPUTS //

function shareInput() {

    updateinputs();
    money.holdings.value = parseInt(holdingsNumber);
    money.converter.value = holdingsNumber * 4;
}
function priceInput() {

    updateinputs();
    money.holdings.value = parseInt(holdingsNumber);
    money.converter.value = holdingsNumber * 4;
    pointerUpdate();
}
function holdingsInput() {
    sharesNumber = parseFloat(money.shares.value);
    holdingsNumber = parseFloat(money.holdings.value);
    priceNumber = holdingsNumber / sharesNumber;

    money.price.value = priceNumber;
    pointerUpdate();

    money.converter.value = holdingsNumber * 4;
}
function convertInput() {
    let convertedVal = money.converter.value;
    
    money.holdings.value = convertedVal / 4;
    holdingsInput();
}

function updateinputs() {
    sharesNumber = parseFloat(money.shares.value);
    priceNumber = parseFloat(money.price.value);

    holdingsNumber = sharesNumber * priceNumber;
}
function pointerUpdate() {
    maxValue = document.querySelector('.end').value;
    let pntrPosition = 680 / (maxValue / parseFloat(money.price.value));

    pointer.style.left = pntrPosition + 'px';
    pointerValue.style.left = pntrPosition + 'px';
    dobi.value = parseFloat(money.price.value);
}

dragPointer(pointer);

function dragPointer(elmnt){
    let pos1 = 0, pos2 = 0;

    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        
        pos2 = e.clientX;
        
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        pos1 = pos2 - e.clientX;
        pos2 = e.clientX;

        let newPosition = elmnt.offsetLeft - pos1;
        if(newPosition > 0 && newPosition < 681) {
            
            // THE POINTER 
            elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px';
            
            // THE VALUE CONTAINER 
            pointerValue.style.left = (elmnt.offsetLeft - pos1) + 'px';
            
            maxValue = document.querySelector('.end').value;
            dobi.value = parseInt(newPosition * (maxValue / 680));
            money.price.value = dobi.value;
            priceInput();
        }
        
    }
    function closeDragElement(e) {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

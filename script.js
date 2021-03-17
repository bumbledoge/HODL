let shares = document.querySelector('.sharesNumber');
let price = document.querySelector('.priceNumber');
let holdings = document.querySelector('.holdingsNumber');

let sharesNumber;
let priceNumber;
let holdingsNumber;

let pointer = document.querySelector('.pointer');
let pointerContainer = document.querySelector('.pointerContainer');
let pointerValue = document.querySelector('.pointerValue');
let dobi = document.querySelector('.dobi');

dobi.value = 200;
priceInput();

function shareInput() {

    updateinputs();
    holdings.value = parseInt(holdingsNumber);
}
function priceInput() {

    updateinputs();
    holdings.value = parseInt(holdingsNumber);
    maxValue = document.querySelector('.end').value;

    let pntrPosition = 680 / (maxValue / priceNumber);
    pointer.style.left = pntrPosition + 'px';

    pointerValue.style.left = pntrPosition + 'px';
}
function holdingsInput() {
    sharesNumber = parseFloat(shares.value);
    holdingsNumber = parseFloat(holdings.value);
    priceNumber = holdingsNumber / sharesNumber;
    price.value = priceNumber;

    maxValue = document.querySelector('.end').value;
    let pntrPosition = 680 / (maxValue / priceNumber);
    pointer.style.left = pntrPosition + 'px';
}
function updateinputs() {
    sharesNumber = parseFloat(shares.value);
    priceNumber = parseFloat(price.value);
    holdingsNumber = sharesNumber * priceNumber;
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

        let pos3 = pos1;
        pos1 = pos2 - e.clientX;
        pos2 = e.clientX;

        let newPosition = elmnt.offsetLeft - pos1;
        if(newPosition > 0 && newPosition <681) {
            
            // let difference = elmnt.offsetLeft - pointerValue.offsetLeft;
            elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px';
            pointerValue.style.left = (elmnt.offsetLeft - pos1) + 'px';

            maxValue = document.querySelector('.end').value;
            dobi.value = parseInt(newPosition * (maxValue / 680));
            price.value = dobi.value;
            priceInput();
        }
        
    }
    function closeDragElement(e) {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

var count = 0;

function duplicate(div) {
    var original = document.getElementById(div);
    var clone = original.cloneNode(true);
    clone.id = "witness" + ++count;
    var inputs = clone.querySelectorAll('input')
    for (var x = 0; x < 3; x++) {
        
        inputs[x].name += (++count).toString();
    }
    
    original.parentNode.appendChild(clone);
}
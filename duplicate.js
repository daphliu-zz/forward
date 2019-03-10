import { get, set, keys } from "/web_modules/idb-keyval.js";

async function duplicate(div) {
    var noWit = await get('number-of-witnesses');
    var original = document.getElementById(div);
    var clone = original.cloneNode(true);
    var inputs = clone.querySelectorAll('input');
    if (noWit == null) {
        noWit = 0;
    }
    set('number-of-witnesses', ++noWit);
    for (var x = 0; x < 3; x++) {
        inputs[x].name += (noWit - 1).toString();
    }
    
    original.parentNode.appendChild(clone);
}

async function duplicateSaved(div) {
    var max = await get('number-of-witnesses');

    for(var y = 0; y < max; y++) {
        var original = document.getElementById(div);
        var clone = original.cloneNode(true);
        var inputs = clone.querySelectorAll('input');
        for (var x = 0; x < 3; x++) {
            inputs[x].name += (y).toString();
        }
        
        original.parentNode.appendChild(clone);
    }
}

duplicateSaved('witness1');

window.duplicate = duplicate;
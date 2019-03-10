function duplicate(div) {
    var original = document.getElementById(div);
    var clone = original.cloneNode(true);
    clone.id = "";
    original.parentNode.appendChild(clone);
}
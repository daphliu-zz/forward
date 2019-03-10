function toggle(button) {
    var div_1 = document.getElementById('div_1');
    var div_2 = document.getElementById("div_2");
    var div_3 = document.getElementById("div_3");

    if (button == 1) {
        div_1.style.display = "block";
        div_2.style.display = "none";
        div_3.style.display = "none";
    } else if (button == 2){
        div_1.style.display = "none";
        div_2.style.display = "block";
        div_3.style.display = "none";
    } else if (button == 3){
        div_1.style.display = "none";
        div_2.style.display = "none";
        div_3.style.display = "block";
    }
  }
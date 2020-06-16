$(document).ready(function hello() {
  var nav = document.getElementById("navbar1");
  window.onscroll = function(){
    if (pageYOffset > 500) {
      nav.style.background = "#c2a876";
    }else{
      nav.style.background = "transparent";
    }
  }
});

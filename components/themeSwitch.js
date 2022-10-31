function getCookieValue(key) {
    var cookies = document.cookie.split('; ');
    for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
      if (decode(parts.shift()) === key) {
        return decode(parts.join('='));
      }
    }
    return null;
  }
  
function decode(s) {
    return decodeURIComponent(s.replace(/\+/g, ' '));  
}

function lightMode(){
    if(getCookieValue("style") == "light"){
        console.log("Switching to dark mode...");
        document.cookie = "style=dark";
        setStyle();
    }
    else if(getCookieValue("style") == "dark"){
        console.log("Switching to light mode...");
        document.cookie = "style=light";
        setStyle();
    }
}

function setStyle(){
    var root = document.querySelector(":root");
    if(getCookieValue("style") == undefined){
        document.cookie = "style=dark";
    }
    if(getCookieValue("style") == "dark"){
        console.log("Dark Mode");
        root.style.setProperty("--header-color", "#c1edcc");
        root.style.setProperty("--page-color", "#453f3c");
        root.style.setProperty("--default-header-color", "#797270");
        root.style.setProperty("--default-font-color", "#b0c0bc");
    }
    else if(getCookieValue("style") == "light"){
        console.log("Light Mode");
        root.style.setProperty("--header-color", "#453f3c");
        root.style.setProperty("--page-color", "white");
        root.style.setProperty("--default-header-color", "#b0c0bc");
        root.style.setProperty("--default-font-color", "#453f3c");
    }
}
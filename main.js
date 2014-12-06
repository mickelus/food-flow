scheduler.init(recipes.soup);
document.querySelector('#progress').style.height="43%";

window.addEventListener("load",function() {
    // Set a timeout...
    setTimeout(function(){
        // Hide the address bar!
        window.scrollTo(0, 1);
    }, 0);
});
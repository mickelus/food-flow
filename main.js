scheduler.init(recipes.soup);

window.addEventListener("load",function() {
    // Set a timeout...
    setTimeout(function(){
        // Hide the address bar!
        window.scrollTo(0, 1);
    }, 0);
});

//Update progressBar
scheduler.onChange(function() {
    var progress = scheduler.getProgress();
    document.querySelector('#progress').style.height= (progress*99 + 1) + "%";    
})
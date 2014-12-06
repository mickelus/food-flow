scheduler.init(recipes.soup);

//Update progressBar
scheduler.onChange(function() {
    var progress = scheduler.getProgress();
    document.querySelector('#progress').style.height= (progress*99 + 1) + "%";    
})
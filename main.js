scheduler.init(recipes.soup);

//Update progressBar
scheduler.onChange(function() {
    var progress = scheduler.getProgress();
    document.querySelector('#progress').style.height= (progress*99 + 1) + "%";    
})


$(".nextButton").click(function() {
   console.log("hola chicos")
    var current = $(".screen.current").addClass("past");
    current.next().addClass("current");
    current.removeClass("current");
})
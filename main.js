scheduler.init(recipes.soup);

//Update progressBar
scheduler.onChange(function() {
    var progress = scheduler.getProgress();
    document.querySelector('#progress').style.height = (progress*99 + 1) + "%";    
})

//Update Timer
scheduler.onChange(function(){
	var activeTimers = scheduler.getTimers();
	if(activeTimers.length>0){
		var lowestTimer = activeTimers[0];
		
		for (var i = 0; i < activeTimers.length; i++) {
			if(activeTimers[i].ends<lowestTimer.ends){
				lowestTimer = activeTimers[i];
			}
		}
		var currentTime = new Date().getTime();
		var remaining = lowestTimer.ends - currentTime;
		var minutes = Math.floor((remaining/1000) / 60);
		var seconds = Math.floor((remaining/1000)) - minutes * 60;
		document.querySelector('#time').innerHTML = minutes + ":" + seconds;
		document.querySelector('#timerProgress').style.height = ((lowestTimer.ends - lowestTimer.started)/remaining)*100 + "%";
	}
	//If no timers, do nothing?  
})


$(".nextButton").click(function() {
   console.log("hola chicos")
    var current = $(".screen.current").addClass("past");
    current.next().addClass("current");
    current.removeClass("current");
})
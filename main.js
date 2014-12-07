scheduler.init(recipes.soup);

//Update progressBar
scheduler.onChange(function() {
    var progress = scheduler.getProgress();
    document.querySelector('#progress').style.height = (progress*99 + 1) + "%";    
})

var activeTimerGlobal;
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
		remainingGlobal = remaining;
		activeTimerGlobal = lowestTimer;
		var minutes = Math.floor((remaining/1000) / 60);
		var seconds = Math.floor((remaining/1000)) - minutes * 60;
		document.querySelector('#time').innerHTML = (minutes<10?'0':'') + minutes + ":" + (seconds<10?'0':'') + seconds;
		document.querySelector('#timerProgress').style.height = (remaining/(lowestTimer.ends - lowestTimer.started))*100 + "%";
	}
	//If no timers, do nothing?  
})

scheduler.onTick(function(){
	var currentTime = new Date().getTime();
	var remaining = activeTimerGlobal.ends - currentTime;
	var minutes = Math.floor((remaining/1000) / 60);
	var seconds = Math.floor((remaining/1000)) - minutes * 60;
	document.querySelector('#time').innerHTML = (minutes<10?'0':'') + minutes + ":" + (seconds<10?'0':'') + seconds;
	document.querySelector('#timerProgress').style.height = (remaining/(activeTimerGlobal.ends - activeTimerGlobal.started))*100 + "%";
})


$(".nextButton").click(function() {
   console.log("hola chicos")
    var current = $(".screen.current").addClass("past");
    current.next().addClass("current");
    current.removeClass("current");
})


for (var i = 0; i < scheduler.tools.length; i++) {
    var item = $("<li>");
    item.append(scheduler.tools[i]);
    $("#toolList").append(item);
}

for (var i = 0; i < scheduler.ingredients.length; i++) {
    var item = $("<li><paper-checkbox></paper-checkbox></li>");
    item.append(scheduler.ingredients[i]);
    $("#shoppingList").append(item);
}
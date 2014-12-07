scheduler.init(recipes.soup);

//Update progressBar
scheduler.onChange(function() {
    var progress = scheduler.getProgress();
    document.querySelector('#progress').style.height = (progress*99 + 1) + "%";    
})

var activeTimerGlobal;
scheduler.fastTimers = true;
//Update Timer
scheduler.onChange(function(){
	var activeTimers = scheduler.getTimers();
	if(activeTimers.length>0){
		timerVisible(true);
		var lowestTimer = activeTimers[0];
		
		for (var i = 0; i < activeTimers.length; i++) {
			if(activeTimers[i].ends<lowestTimer.ends){
				lowestTimer = activeTimers[i];
			}
		}
		var currentTime = new Date().getTime();
		var remaining = lowestTimer.ends - currentTime;
		activeTimerGlobal = lowestTimer;
		if(remaining>0){
			var minutes = Math.floor((remaining/1000) / 60);
			var seconds = Math.floor((remaining/1000)) - minutes * 60;
			document.querySelector('#time').innerHTML = (minutes<10?'0':'') + minutes + ":" + (seconds<10?'0':'') + seconds;
			var progress = remaining/(lowestTimer.ends - lowestTimer.started);
			showTimerProgress(progress);
		}
	}
	else{
		timerVisible(false);
	}
	//If finished, say so
})

scheduler.onTick(function(){
	var currentTime = new Date().getTime();
	var remaining = activeTimerGlobal.ends - currentTime;
	if(remaining<=0){
		timerVisible(false);
	}
	else{
		timerVisible(true);
		var minutes = Math.floor((remaining/1000) / 60);
		var seconds = Math.floor((remaining/1000)) - minutes * 60;
		document.querySelector('#time').innerHTML = (minutes<10?'0':'') + minutes + ":" + (seconds<10?'0':'') + seconds;

		var progress = remaining/(activeTimerGlobal.ends - activeTimerGlobal.started);
		showTimerProgress(progress);
	}
})

function showTimerProgress(progress) {
		var style = document.querySelector('#timerProgress').style;
		style.width = (progress*100) + "%";
		style.height = (progress*100) + "%";
		style.left = (50 - progress*50) + "%";
		style.top = (50 - progress*50) + "%";
}

function timerVisible(b){
	if(b){
		document.querySelector('#time').style.visibility = "visible";
		document.querySelector('#timerProgress').style.visibility = "visible";
	}
	else{
		document.querySelector('#time').style.visibility = "hidden";
		document.querySelector('#timerProgress').style.visibility = "hidden";
	}
}

$(".nextButton").click(function() {
   console.log("hola chicos")
    var current = $(".screen.current").addClass("past");
    current.next().addClass("current");
    current.removeClass("current");
})


for (var tool in scheduler.tools) {
    var item = $("<li>");
    item.append(tool);
    $("#toolList").append(item);
}

for (var i = 0; i < scheduler.ingredients.length; i++) {
    var item = $("<li><paper-checkbox></paper-checkbox></li>");
    item.append(scheduler.ingredients[i]);
    $("#shoppingList").append(item);
}
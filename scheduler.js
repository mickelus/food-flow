var scheduler = {
	_steps: [],
	_completedSteps: [],
	_listeners: [],
	init: function(recipe) {
		scheduler._steps = [];
		scheduler._completedSteps = [];
		
		for (var i = 0; i < recepie.steps.length; i++) {
			scheduler._steps.push(recepie.steps[i]);
		}

		for (var j = 0; j < scheduler._listeners.length; j++) {
			scheduler._listeners[j]();
		}
	},
	completeStep: function(stepId) {
		for (var i = 0; i  < scheduler._steps.length; i++) {
			var step = scheduler._steps[i];
			if(step.id == stepId) {
				scheduler._steps.splice(i, 1);
				scheduler._completedSteps.push(step);

				for (var j = 0; j < scheduler._listeners.length; j++) {
					scheduler._listeners[j]();
				}

				break;
			}
		}
	},
	getCurrentStep: function() {
		if(scheduler._steps.length === 0) {
			return null;
		} else {
			return scheduler._steps[0];
		}
	},
	onChange: function(callback) {
		scheduler._listeners.push(callback);
	},
	getTimers: function() {
		return [];
	},
	getProgress: function() {
		var sum = scheduler._steps.length + scheduler._completedSteps.length;
		if(sum === 0) {
			return 0;
		} else {
			return scheduler._steps.length / sum;
		}
	}
};
var scheduler = {
	_steps: [],
	_completedSteps: [],
	_listeners: [],
	init: function(recipe) {
		scheduler._steps = [];
		scheduler._completedSteps = [];
		
		for (var i = 0; i < recipe.steps.length; i++) {
			scheduler._steps.push(recipe.steps[i]);
		}

		scheduler._reschedule();

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

				scheduler._reschedule();

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
			return scheduler._completedSteps.length / sum;
		}
	},

	_reschedule: function() {
		var scheduled = [];

		while(scheduler._steps.length > 0) {
			for(var s = 0; s < scheduler._steps.length; s++)  {
				var step = scheduler._steps[s];
				var requirementsFound = 0;

				for (var i = step.requires.length - 1; i >= 0; i--) {
					var found = false;
					var id = step.requires[i];

					for (var j = scheduler._completedSteps.length - 1; j >= 0; j--) {
						if(scheduler._completedSteps[j].id === id) {
							found = true;
							break;
						}
					}

					if(!found) {
						for (j = scheduled.length - 1; j >= 0; j--) {
							if(scheduled[j].id === id) {
								found = true;
								break;
							}
						}
					}

					if(found) {
						requirementsFound++;
					}
				}

				if(requirementsFound == step.requires.length) {
					scheduled.push(step);
					scheduler._steps.splice(s, 1);
					s = 0;
				}
			}
		}

		scheduler._steps = scheduled;
	}
};
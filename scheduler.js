var scheduler = {
	_steps: [],
	_queued: [],
	_completedSteps: [],
	_delayedSteps: [],
	_listeners: [],
	_activeTimers: [],

	_timerLoop: null,

	fastTimers: false,
	tools: [],
	ingredients: [],

	init: function(recipe) {
		scheduler._steps = [];
		scheduler._queued = [];
		scheduler._completedSteps = [];
		scheduler._delayedSteps = [];
		scheduler._activeTimers = [];
		scheduler._timerLoop = null;

		scheduler.tools = [];
		scheduler.ingredients = [];
		
		for (var i = 0; i < recipe.steps.length; i++) {
			var step = recipe.steps[i];

			if(typeof step.delay !== "undefined") {
				scheduler._delayedSteps.push(step);
			} else {
				scheduler._steps.push(step);
			}

			if(Array.isArray(step.tools)) {
				scheduler.tools = scheduler.tools.concat(step.tools);
			}

			if(Array.isArray(step.ingredients)) {
				scheduler.ingredients = scheduler.ingredients.concat(step.ingredients);
			}
		}

		scheduler._reschedule();
		scheduler._callListeners();
	},
	completeStep: function(stepId) {
		for (var i = 0; i  < scheduler._queued.length; i++) {
			var step = scheduler._queued[i];
			if(step.id == stepId) {
				scheduler._queued.splice(i, 1);
				scheduler._completedSteps.push(step);

				scheduler._reschedule();

				scheduler._callListeners();

				break;
			}
		}
	},
	getCurrentStep: function() {
		if(scheduler._queued.length === 0) {
			return null;
		} else {
			return scheduler._queued[0];
		}
	},
	onChange: function(callback) {
		scheduler._listeners.push(callback);
	},
	getTimers: function() {
		var timeouts = [];
		for (var i = 0; i < scheduler._activeTimers.length; i++) {
			var timer = scheduler._activeTimers[i];
			timeouts.push({
				started: timer.triggerTime,
				ends: timer.triggerTime
			});
		}

		return timeouts;
	},
	getProgress: function() {
		var sum = scheduler._steps.length +
				scheduler._completedSteps.length +
				scheduler._queued.length +
				scheduler._delayedSteps.length +
				scheduler._activeTimers.length;

		if(sum === 0) {
			return 0;
		} else {
			return scheduler._completedSteps.length / sum;
		}
	},

	_reschedule: function() {
		var queued = [];
		var waiting = scheduler._steps.concat(scheduler._queued);

		var added, step, s, i, j, requirementsFound, found, id;

		do {
			added = 0;

			for(s = 0; s < waiting.length; s++)  {
				step = waiting[s];
				requirementsFound = 0;

				for (i = step.requires.length - 1; i >= 0; i--) {
					found = false;
					id = step.requires[i];

					for (j = scheduler._completedSteps.length - 1; j >= 0; j--) {
						if(scheduler._completedSteps[j].id === id) {
							found = true;
							break;
						}
					}

					if(!found) {
						for (j = queued.length - 1; j >= 0; j--) {
							if(queued[j].id === id) {
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
					queued.push(step);
					waiting.splice(s, 1);
					s = 0;
					added++;
				}
			}
		} while(added > 0);

		for (s = scheduler._delayedSteps.length - 1; s >= 0; s--) {
			step = scheduler._delayedSteps[s];
			requirementsFound = 0;

			for (i = step.requires.length - 1; i >= 0; i--) {
				found = false;
				id = step.requires[i];

				for (j = scheduler._completedSteps.length - 1; j >= 0; j--) {
					if(scheduler._completedSteps[j].id === id) {
						found = true;
						break;
					}
				}

				if(found) {
					requirementsFound++;
				}
			}

			if(requirementsFound === step.requires.length) {
				console.log("'" + step.description + "' will be activated");
				var scale = 1;
				var now = new Date().getTime();

				if(scheduler.fastTimers) {
					scale = 1 / 60;
				}

				scheduler._activeTimers.push({
					step: step,
					started: now,
					triggerTime: now + step.delay * 1000 * scale
				});

				scheduler._delayedSteps.splice(s, 1);

				if(scheduler._timerLoop === null) {
					scheduler._timerLoop = setInterval(scheduler._checkTimers, 200);
				}
			}
		}

		scheduler._queued = queued;
		scheduler._steps = waiting;
	},
	_checkTimers: function() {
		var changed = false;
		for (var i = scheduler._activeTimers.length - 1; i >= 0; i--) {
			var timer = scheduler._activeTimers[i];
			if(timer.triggerTime <= new Date().getTime()) {
				scheduler._activeTimers.splice(i, 1);
				scheduler._queued.unshift(timer.step);
				changed = true;
			}
		}

		if(changed) {
			scheduler._callListeners();
		}
	},
	_callListeners: function() {
		for (var i = 0; i < scheduler._listeners.length; i++) {
			scheduler._listeners[i]();
		}
	}
};
var View          = require('famous/core/View');
var Surface       = require('famous/core/Surface');
var Transform     = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');

AppView = function () {
    View.apply(this, arguments);

    _addSimulationView.call(this);
    _addSettingsView.call(this);
}

function _addSimulationView() {
	var simulationView = new SimulationView();

	var simulationModifier = new StateModifier({
		align: [0,0],
		origin: [0,0]
	});

	this.add(simulationModifier).add(simulationView);
}

function _addSettingsView() {
	var settingsView = new SettingsView();

	var settingsModifier = new StateModifier({
		align: [1, 0],
		origin: [1, 0]
	});

	this.add(settingsModifier).add(settingsView);
}

AppView.prototype = Object.create(View.prototype);
AppView.prototype.constructor = AppView;

AppView.DEFAULT_OPTIONS = {};
var View          = require('famous/core/View');
var Surface       = require('famous/core/Surface');
var Transform     = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');

AppView = function () {
    View.apply(this, arguments);

    _addSimulationView.call(this);
    _addSettingsView.call(this);
    _setListener.call(this);
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
	this.settingsView = new SettingsView();

	var settingsModifier = new StateModifier({
		align: [1, 0],
		origin: [1, 0]
	});

	this.add(settingsModifier).add(this.settingsView);
}

function _setSettingsViewListener(parameter, self) {
	self.settingsView.on('settingsChange' + parameter.parameter, function() {
		console.log('appView heard ' + parameter.parameter);
	});
}

function _setListener() {
	var settingsValues = this.settingsView.getSettings();

	for (var i = 0; i < settingsValues.length; i++) {
		_setSettingsViewListener(settingsValues[i], this);
	}

}

AppView.prototype = Object.create(View.prototype);
AppView.prototype.constructor = AppView;

AppView.prototype.getSettingsView = function() {
	return this.settingsView;
}

AppView.DEFAULT_OPTIONS = {};
var View          = require('famous/core/View');
var Surface       = require('famous/core/Surface');
var Transform     = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');

AppView = function () {
    View.apply(this, arguments);

    this.positionArray = [];

    _addSimulationView.call(this);
    _addSettingsView.call(this);
    _addGraphView.call(this);
    _setListener.call(this);
    _setRunSimulationListener.call(this);
}

function _addSimulationView() {
	this.simulationView = new SimulationView();

	var simulationModifier = new StateModifier({
		align: [0,0],
		origin: [0,0]
	});

	this.add(simulationModifier).add(this.simulationView);
}

function _addSettingsView() {
	this.settingsView = new SettingsView();

	var settingsModifier = new StateModifier({
		align: [1, 0],
		origin: [1, 0],
		size: [300, 200],
		transform: Transform.translate(-50, 20, 0)
	});

	this.add(settingsModifier).add(this.settingsView);
}

function _addGraphView() {
	this.graphView = new GraphView();

	var graphViewModifier = new StateModifier({
		align: [1, 1],
		origin: [1, 1],
		size: [800, 400],
	});

	this.add(graphViewModifier).add(this.graphView);
}

function _setSettingsViewListener(parameter, self) {
	self.settingsView.on('settingsChange' + parameter.parameter, function() {
		self.changeSetting(parameter);
	});
}

function _setListener() {
	var settingsValues = this.settingsView.getSettings();

	for (var i = 0; i < settingsValues.length; i++) {
		_setSettingsViewListener(settingsValues[i], this);
	}

}

function _setRunSimulationListener() {
	this.settingsView.on('runSimulation', function() {
		this.simulationView.resetPositionArray();
		this.simulationView.run();
		this.simulationView.massSurface.particle.setVelocity(-0.2, 0, 0);
	}.bind(this));

	this.settingsView.on('stopSimulation', function() {
		this.simulationView.stopRunning();
		this.simulationView.massSurface.particle.setVelocity(0, 0, 0);
		this.simulationView.massSurface.particle.setPosition(0, 0, 0);

		this.positionArray = this.simulationView.getMassPositionOverTime();
		this.simulationView.resetPositionArray();

		this.graphView.setPositionData(this.positionArray);
	}.bind(this));
}



AppView.prototype = Object.create(View.prototype);
AppView.prototype.constructor = AppView;

AppView.prototype.getSettingsView = function() {
	return this.settingsView;
}

AppView.prototype.changeSetting = function(settingToChangeObject) {
	var options = this.simulationView.springView.options;
	options[settingToChangeObject.parameter] = settingToChangeObject.paramValue;
	this.simulationView.springView.changeOptions(options);
}


AppView.DEFAULT_OPTIONS = {};
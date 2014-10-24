/*
* SettingsView
*
* This is the view container in which all of the settings to change the simulation will be stored.
* This will include the different varibales that can be changed in the simulation as well as
* the actual run button of the simulation. The SettingsView is composed of several ParameterViews,
* which is what contains the actual slider widget.
*/

var View          = require('famous/core/View');
var Surface       = require('famous/core/Surface');
var Transform     = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');

SettingsView = function () {
    View.apply(this, arguments);

    this.settings = [];
    this.settingsName = [];
    this.settingsObject = {};

    _addSomeParamters.call(this);
    _addRunSimulationButton.call(this);
    _setSimulationControlButtonListener.call(this);
}

//Function to add some ParametViews right now used for testing. Later, it will be replaced by 
//SettingsView.addParameter (see belw)
function _addSomeParamters() {
	var parameters = ['mass', 'period', 'dampingRatio'];

	var parametersMinsMaxes = [{min: 5, max: 50}, {min: 500, max: 3000}, {min: 0, max: 1}];

	for (var i=0; i < parameters.length; i++) {
		var parameter = new ParameterView(parameters[i], parametersMinsMaxes[i]['min'], parametersMinsMaxes[i]['max']);

		var parameterModifier = new StateModifier({
			align: [1, 0],
			origin: [1, 0],
			transform: Transform.translate(-20, i*50, 0)
		});

		this.settingsName.push(parameters[i]);
		this.settings.push(parameter);

		this.addParameter(parameters[i], parameter);

		this.add(parameterModifier).add(parameter);

		setParameterViewListener(parameter, this);

	}
}

function _addRunSimulationButton() {
	this.simulationControlSurface = new Surface({
		size: [150, 20],
		content: 'Run Simulation',
		properties: {
			backgroundColor: 'green',
			textAlign: 'center'
		}
	});

	var simulationControlModifier = new StateModifier({
		align: [0.5, 1],
		origin: [0.5, 1]
	});

	this.add(simulationControlModifier).add(this.simulationControlSurface);

}

function _setSimulationControlButtonListener() {
	this.running = false;
	this.simulationControlSurface.on('click', function() {
		if (!this.running) {
			this._eventOutput.emit('runSimulation');
			this.simulationControlSurface.setContent('Stop Simulation');
		}
		else {
			this._eventOutput.emit('stopSimulation');
			this.simulationControlSurface.setContent('Run Simulation');
		}

		this.running = !this.running;

	}.bind(this));
}

//Function that adds the eventListener to the parameter view objects
//Is passed the parameterViewObject as well as self (which is the current SettingsView instance)
function setParameterViewListener(parameterViewObject, self) {
	parameterViewObject.on('change' + parameterViewObject.parameter, function() {
		self._eventOutput.emit('settingsChange' + parameterViewObject.parameter);
	});
}


SettingsView.prototype = Object.create(View.prototype);
SettingsView.prototype.constructor = SettingsView;

SettingsView.DEFAULT_OPTIONS = {};

SettingsView.prototype.addParameter = function(parameterName, parameterObject) {
	this.settingsObject[parameterName] = parameterObject;
}

SettingsView.prototype.getSettings = function() {
	return this.settings;
}


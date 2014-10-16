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

    _addSomeParamters.call(this);
}

//Function to add some ParametViews right now used for testing. Later, it will be replaced by 
//SettingsView.addParameter (see belw)
function _addSomeParamters() {
	for (var i=0; i < 3; i ++) {
		var paramter = new ParameterView();

		var parameterModifier = new StateModifier({
			transform: Transform.translate(-20, 200 + i*50, 0)
		});

		this.add(parameterModifier).add(paramter);
	}
}

SettingsView.prototype = Object.create(View.prototype);
SettingsView.prototype.constructor = SettingsView;

SettingsView.DEFAULT_OPTIONS = {};

// Function that will enable users to add parameters to the SettingsView. Not entieraly sure when 
// this funciton will start being used as of now
SettingsView.prototype.addParameter = function(paramter) {
	this.add(paramter);

	this.settings.push(paramter);
}


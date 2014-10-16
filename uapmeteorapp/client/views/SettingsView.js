var View          = require('famous/core/View');
var Surface       = require('famous/core/Surface');
var Transform     = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');

SettingsView = function () {
    View.apply(this, arguments);

    this.settings = [];

    _addSomeParamters.call(this);
}

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

SettingsView.prototype.addParameter = function(paramter) {
	this.add(paramter);

	this.settings.push(paramter);
}


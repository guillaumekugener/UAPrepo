/*
* ParameterView.js
*
* This module creates the basic parameter control widget. The variables in the simulation
* will be changed using this widget. Multiple ParameterViews are added to the SettingsView
* where a slider widget allows users to change the value. I will also implement an editable
* value textbox so that users can manually input the values that they want to simulate.
*/

var View          = require('famous/core/View');
var Surface       = require('famous/core/Surface');
var Transform     = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');

var Draggable     = require('famous/modifiers/Draggable');

ParameterView = function (parameter) {
    View.apply(this, arguments);

    this.parameter = parameter;

    _createParameterLabels.call(this);
    _createRangeSurface.call(this);
    _createSlidingCircleController.call(this);

    _addControllerEventListeners.call(this);
}

//Create the two labels (which variable and its value) for the slider widget.
function _createParameterLabels() {

	var labelSurface = new Surface({
		size: [100, 30],
		content: this.parameter,
		properties: {
			textAlign: 'center'
		}
	});

	var labelModifier = new StateModifier({
		transform: Transform.translate(-250, 0, 0)
	});

	this.add(labelModifier).add(labelSurface);

	this.parameterValueSurface = new Surface({
		size: [50, 30],
		content: 'value',
		properties: {
			textAlign: 'center'
		}
	});

	var parameterValueModifier = new StateModifier({
		transform: Transform.translate(20, 0, 0)
	});

	this.add(parameterValueModifier).add(this.parameterValueSurface);
}

// Create the back of the slider
function _createRangeSurface() {
	var rangeSurface = new Surface({
		size: [300, 10],
		properties: {
			border: '1px solid black'
		}
	});
	var rangeModifier = new StateModifier({
		origin: [1, 0.5],
		transform: Transform.translate(0, 30, 0)
	});

	this.add(rangeModifier).add(rangeSurface);
}

// Create the controller that users will actually be able to drag around. Confine it to the range
// of the surface right below it (right now they are not linked, should look into linking the two
// surfaces together potentially)
function _createSlidingCircleController() {
	this.controllerSurface = new Surface({
		size: [15, 15],
		properties: {
			border: '1px solid black',
			borderRadius: 10,
			backgroundColor: 'red',
			zIndex: 1
		}
	});

	this.circleDraggable = new Draggable({
		xRange: [-150, 150],
		yRange: [0, 0]
	});

	this.controllerSurface.pipe(this.circleDraggable);

	controllerModifier = new StateModifier({
		origin: [0.5, 0.5],
		transform: Transform.translate(-150, 30, 0)
	});


	this.add(controllerModifier).add(this.circleDraggable).add(this.controllerSurface);
}

/*
* Function to add the even listeners on the widget. This is how the value text gets changed
* as the controller is being dragged. Several event listeners will come out of this
*/
function _addControllerEventListeners() {
	this.circleDraggable.on('end', function() {
		this.paramValue = this.circleDraggable.getPosition()[0] + 150;
		this.parameterValueSurface.setContent(this.paramValue);
		this._eventOutput.emit('change' + this.parameter);
	}.bind(this));
}

ParameterView.prototype = Object.create(View.prototype);
ParameterView.prototype.constructor = ParameterView;

ParameterView.DEFAULT_OPTIONS = {};
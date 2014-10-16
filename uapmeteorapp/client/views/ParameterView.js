var View          = require('famous/core/View');
var Surface       = require('famous/core/Surface');
var Transform     = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');

var Draggable     = require('famous/modifiers/Draggable');

ParameterView = function () {
    View.apply(this, arguments);

    _createParameterLabels.call(this);
    _createRangeSurface.call(this);
    _createSlidingCircleController.call(this);

    _addControllerEventListeners.call(this);
}

function _createParameterLabels() {
	var labelSurface = new Surface({
		size: [100, 30],
		content: 'Mass',
		properties: {
			textAlign: 'center'
		}
	});

	var labelModifier = new StateModifier({
		transform: Transform.translate(-250, 0, 0)
	});

	this.add(labelModifier).add(labelSurface);

	var parameterValueSurface = new Surface({
		size: [50, 30],
		content: 'value',
		properties: {
			textAlign: 'center'
		}
	});

	var parameterValueModifier = new StateModifier({
		transform: Transform.translate(20, 0, 0)
	});

	this.add(parameterValueModifier).add(parameterValueSurface);
}

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

function _addControllerEventListeners() {
	this.circleDraggable.on('end', function() {
		console.log(this.circleDraggable.getPosition());
	}.bind(this));
}

ParameterView.prototype = Object.create(View.prototype);
ParameterView.prototype.constructor = ParameterView;

ParameterView.DEFAULT_OPTIONS = {};
/*
* This will be the spring module. It will build the spring view that will later be draggable as well so
* that users can select it from a box and drag it into the simulation view
*/

var View          = require('famous/core/View');
var Surface       = require('famous/core/Surface');
var Transform     = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');

var Spring        = require('famous/physics/forces/Spring');
var Modifier      = require('famous/core/Modifier');
var Vector        = require('famous/math/Vector');

SpringView = function () {
    View.apply(this, arguments);

    _createSpringSurface.call(this);
    _createSpringForce.call(this);
}

//Create the actual spring surface. Right now it is just a rectangle but work will be done
//to make it look like an actual spring fairly soon.
function _createSpringSurface() {
	var movingSpringSurface = new Surface({
		properties: {
			backgroundColor: 'black'
		}
	});

	// The spring positioning here is determined relative to the view.
	// the views position will be determined at a higher level
	this.movingSpringModifier = new Modifier({
		align: [0 , 0],
		origin: [0, 0]
	});

	this.add(this.movingSpringModifier).add(movingSpringSurface);
}

//Create the actual spring force from the options passed into the SpringView constructor.
//Right now, it is just using the default options but later on it will use the arguments
// loctaed in the constructor when a SpringView is initialized.
function _createSpringForce() {
	var springForce = new Spring({
		anchor: new Vector(this.options.springRestLength, 0, 0),
		period: this.options.period,
		dampingRatio: this.options.dampingRatio,
		length: this.options.springRestLength
	});

	this.springForce = springForce;
}


SpringView.prototype = Object.create(View.prototype);
SpringView.prototype.constructor = SpringView;

SpringView.DEFAULT_OPTIONS = {
	springRestLength: 100,
	anchorWallPoint: 300,
	period: 3000,
	dampingRatio: 0.1,
	springWidth: 20
};



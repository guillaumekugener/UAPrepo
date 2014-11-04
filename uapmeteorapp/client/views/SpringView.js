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
var Matrix		  = require('famous/math/Matrix');
var ModifierChain       = require("famous/modifiers/ModifierChain");

var ContainerSurface = require('famous/surfaces/ContainerSurface');

SpringView = function () {
    View.apply(this, arguments);

    _createSpringSurface.call(this);
    _createSpringPieces.call(this);
    _createSpringForce.call(this);
}

//Create the actual spring surface. Right now it is just a rectangle but work will be done
//to make it look like an actual spring fairly soon.
function _createSpringSurface() {
	this.movingSpringSurface = new ContainerSurface({
		// properties: {
		// 	backgroundColor: 'black'
		// }
	});

	// The spring positioning here is determined relative to the view.
	// the views position will be determined at a higher level
	this.movingSpringModifier = new Modifier({
		align: [0 , 0.5],
		origin: [0, 0.5],
	});

	this.add(this.movingSpringModifier).add(this.movingSpringSurface);
}

//Create the actual spring force from the options passed into the SpringView constructor.
//Right now, it is just using the default options but later on it will use the arguments
// located in the constructor when a SpringView is initialized.
function _createSpringForce() {
	var springForce = new Spring({
		anchor: new Vector(this.options.springRestLength, 0, 0),
		period: this.options.period,
		dampingRatio: this.options.dampingRatio,
		length: this.options.springRestLength
	});

	this.springForce = springForce;
}

//Create the spring surfaces that, linked together, will make it look like spring when it is compressing and 
//and expanding
function _createSpringPieces() {

	var sizeOfSpring = this.options.springRestLength * 1.0;
	var widthOfSpring = this.options.springWidth * 1.0;

	var leftEndSurface = new Surface({
		size: [sizeOfSpring/10, widthOfSpring/2],
		properties: {
			backgroundColor: 'black'
		}
	});

	var leftEndModifier = new Modifier({
		align: [0, 0.5],
		origin: [0, 0.5]
	});

	var translationAmount = 10;

	var leftHalfLengthSurface = new Surface({
		size: [sizeOfSpring*2/25, widthOfSpring/2],
		properties: {
			backgroundColor: 'black'
		}
	});

	var leftHalfLengthModifierChain = new ModifierChain();

	var positionLeftHalfLengthModifier = new StateModifier({
		origin: [0, 1],
		align: [0, 1],
	});
	positionLeftHalfLengthModifier.setTransform(Transform.translate(translationAmount, widthOfSpring/2/2, 0));
	translationAmount += leftHalfLengthSurface.getSize()[0];

	var skewLeftHalfLengthModifier = new StateModifier({});
	skewLeftHalfLengthModifier.setTransform(Transform.skewY(-1.0*Math.PI/4));

	leftHalfLengthModifierChain.addModifier(positionLeftHalfLengthModifier);
	leftHalfLengthModifierChain.addModifier(skewLeftHalfLengthModifier);

	var longDiagonalSurface = new Surface({
		size: [sizeOfSpring*4/25, widthOfSpring/2],
		properties: {
			backgroundColor: 'black'
		}
	});

	var longDiagonalModifierChain = new ModifierChain();

	var positionLongDiagonalModifier = new StateModifier({
		origin: [0, 0],
		align: [0, 0],
	});
	positionLongDiagonalModifier.setTransform(Transform.translate(translationAmount, -1*widthOfSpring-1, 0));
	translationAmount += longDiagonalSurface.getSize()[0];

	var skewLongDiagonalModifier = new StateModifier({});
	skewLongDiagonalModifier.setTransform(Transform.skewY(1*Math.PI/4));

	longDiagonalModifierChain.addModifier(positionLongDiagonalModifier);
	longDiagonalModifierChain.addModifier(skewLongDiagonalModifier);

	var longDiagonalSurface2 = new Surface({
		size: [sizeOfSpring*4/25, widthOfSpring/2],
		properties: {
			backgroundColor: 'black'
		}
	});

	var longDiagonalModifierChain2 = new ModifierChain();

	var positionLongDiagonalModifier2 = new StateModifier({
		origin: [0, 1],
		align: [0, 1],
	});
	positionLongDiagonalModifier2.setTransform(Transform.translate(translationAmount, 2*(widthOfSpring-1), 0));
	translationAmount += longDiagonalSurface2.getSize()[0];

	var skewLongDiagonalModifier2 = new StateModifier({});
	skewLongDiagonalModifier2.setTransform(Transform.skewY(-1*Math.PI/4));

	longDiagonalModifierChain2.addModifier(positionLongDiagonalModifier2);
	longDiagonalModifierChain2.addModifier(skewLongDiagonalModifier2);

	var longDiagonalSurface3 = new Surface({
		size: [sizeOfSpring*4/25, widthOfSpring/2],
		properties: {
			backgroundColor: 'black'
		}
	});

	var longDiagonalModifierChain3 = new ModifierChain();

	var positionLongDiagonalModifier3 = new StateModifier({
		origin: [0, 0],
		align: [0, 0],
	});
	positionLongDiagonalModifier3.setTransform(Transform.translate(translationAmount, 2*(-1*widthOfSpring-1)-widthOfSpring/2, 0));
	translationAmount += longDiagonalSurface3.getSize()[0];

	var skewLongDiagonalModifier3 = new StateModifier({});
	skewLongDiagonalModifier3.setTransform(Transform.skewY(1*Math.PI/4));

	longDiagonalModifierChain3.addModifier(positionLongDiagonalModifier3);
	longDiagonalModifierChain3.addModifier(skewLongDiagonalModifier3);


	var longDiagonalSurface4 = new Surface({
		size: [sizeOfSpring*4/25, widthOfSpring/2],
		properties: {
			backgroundColor: 'black'
		}
	});

	var longDiagonalModifierChain4 = new ModifierChain();

	var positionLongDiagonalModifier4 = new StateModifier({
		origin: [0, 1],
		align: [0, 1],
	});
	positionLongDiagonalModifier4.setTransform(Transform.translate(translationAmount, 2*2*(widthOfSpring-1)-widthOfSpring/4, 0));
	translationAmount += longDiagonalSurface4.getSize()[0];

	var skewLongDiagonalModifier4 = new StateModifier({});
	skewLongDiagonalModifier4.setTransform(Transform.skewY(-1*Math.PI/4));

	longDiagonalModifierChain4.addModifier(positionLongDiagonalModifier4);
	longDiagonalModifierChain4.addModifier(skewLongDiagonalModifier4);

	var longDiagonalSurface5 = new Surface({
		size: [sizeOfSpring*2/25, widthOfSpring/2],
		properties: {
			backgroundColor: 'black'
		}
	});

	var longDiagonalModifierChain5 = new ModifierChain();

	var positionLongDiagonalModifier5 = new StateModifier({
		origin: [0, 0],
		align: [0, 0],
	});
	positionLongDiagonalModifier5.setTransform(Transform.translate(translationAmount, 4*(-1*widthOfSpring-1), 0));
	translationAmount += longDiagonalSurface5.getSize()[0];

	var skewLongDiagonalModifier5 = new StateModifier({});
	skewLongDiagonalModifier5.setTransform(Transform.skewY(1*Math.PI/4));

	longDiagonalModifierChain5.addModifier(positionLongDiagonalModifier5);
	longDiagonalModifierChain5.addModifier(skewLongDiagonalModifier5);


	var rightEndSurface = new Surface({
		size: [sizeOfSpring/10+2, widthOfSpring/2],
		properties: {
			backgroundColor: 'black'
		}
	});

	var rightEndModifier = new Modifier({
		align: [1, 0.5],
		origin: [1, 0.5]
	});

	this.movingSpringSurface.add(leftEndModifier).add(leftEndSurface);
	this.movingSpringSurface.add(leftHalfLengthModifierChain).add(leftHalfLengthSurface);
	this.movingSpringSurface.add(longDiagonalModifierChain).add(longDiagonalSurface);
	this.movingSpringSurface.add(longDiagonalModifierChain2).add(longDiagonalSurface2);
	this.movingSpringSurface.add(longDiagonalModifierChain3).add(longDiagonalSurface3);
	this.movingSpringSurface.add(longDiagonalModifierChain4).add(longDiagonalSurface4);
	this.movingSpringSurface.add(longDiagonalModifierChain5).add(longDiagonalSurface5);
	this.movingSpringSurface.add(rightEndModifier).add(rightEndSurface);

}


SpringView.prototype = Object.create(View.prototype);
SpringView.prototype.constructor = SpringView;

SpringView.prototype.changeOptions = function(newOptions) {
	this.springForce.setOptions(newOptions);
}

SpringView.DEFAULT_OPTIONS = {
	springRestLength: 100,
	anchorWallPoint: 300,
	period: 3000,
	dampingRatio: 0.1,
	springWidth: 20
};



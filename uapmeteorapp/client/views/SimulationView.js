var View            = require('famous/core/View');
var Surface         = require('famous/core/Surface');
var Transform       = require('famous/core/Transform');
var Modifier        = require('famous/core/Modifier');
var Transitionable  = require('famous/transitions/Transitionable');

var StateModifier   = require('famous/modifiers/StateModifier');

var Engine          = require('famous/core/Engine');
var PhysicsEngine   = require('famous/physics/PhysicsEngine');
var Body            = require('famous/physics/bodies/Body');
var Rectangle       = require('famous/physics/bodies/Rectangle');
var Spring          = require('famous/physics/forces/Spring');
var Particle        = require('famous/physics/bodies/Particle');

var Vector = require('famous/math/Vector');

SimulationView = function () {
    View.apply(this, arguments);

    _CreateTheSimulation.call(this);
}

function _CreateTheSimulation() {
	var physicsEngine = new PhysicsEngine();

	/*
	* Create all the surfaces that will need to exist on the screen
	*/
	var wallWidth = 200;
	var springRestLength = 100;
	var blockSideLength = 50;
	// Set the start state of the transitionable to be the springs rest length. We will update the state
	// of the transitionable to the length of the spring.
	var springTransitionable = new Transitionable(springRestLength-60);


	var leftMajorWallSurface = new Surface({
	    size: [wallWidth, undefined],
	    properties: {
	        backgroundColor: 'brown'
	    }
	});

	// For now, initialized with a width of the springs rest length, and a width of 20
	var movingSpringSurface = new Surface({
	    properties: {
	        backgroundColor: 'black'
	    }
	});

	var massSurface = new Surface({
	    size: [blockSideLength, blockSideLength],
	    properties: {
	        backgroundColor: 'red'
	    }
	});

	/*
	* Decide where to place these surfaces at the beginning of the experiment, right now, independent
	* of the forces that will later be applied on them, which will take effect once the mass is clicked on
	*/
	var windowWidth = window.innerWidth;

	var leftMajorWallModifier = new StateModifier({
	    origin: [1, 0.5],
	    align: [wallWidth/windowWidth, 0.5],
	});

	var movingSpringModifier = new Modifier({
	    align: [wallWidth/windowWidth, 0.5],
	    origin: [0, 0.5],
	});

	var massModifier = new Modifier({
	    align: [(wallWidth+springRestLength)/windowWidth, 0.5],
	    origin: [0, 0.5]
	});

	this.add(leftMajorWallModifier).add(leftMajorWallSurface);
	this.add(movingSpringModifier).add(movingSpringSurface);
	this.add(massModifier).add(massSurface);

	/*
	* Now, we apply a force to the mass and keep track of it's positioning in an array. The mass surface
	* now has a paricle property attached to it
	*/

	var massSurfaceClicked = false;
	var massPositionArray = [];

	massSurface.particle = new Rectangle({
	    size: [blockSideLength, blockSideLength]
	});

	movingSpringSurface.particle = new Particle({});

	physicsEngine.addBody(massSurface.particle);
	physicsEngine.addBody(movingSpringSurface.particle);

	/* 
	* Create the spring force that will be applied on the rectangular particle
	*
	* Note: set the anchor to spring's resting length so it does not move on start
	*/

	var springForce = new Spring({
	    anchor: new Vector(springRestLength, 0, 0),
	    period: 3000,
	    dampingRatio: 0.1,
	    length: springRestLength
	});

	//The force is now attached to the spring
	physicsEngine.attach(springForce, [massSurface.particle]);

	massSurface.on('click', function() {
	    massSurface.particle.setVelocity([-0.2, 0, 0]);
	}.bind(this));

	var massPositionOverTime = [];
	// Required to get the surface to move. Also, push the mass' poisiton into an array for graphing later
	Engine.on('prerender', function(){
	    massModifier.setTransform(massSurface.particle.getTransform());
	    massPositionOverTime.push(massSurface.particle.getPosition());
	});

	/*
	* Now get the spring surface to extend and contract in relation to the position of the massSurface
	* particle using a transitionable
	*/
	movingSpringModifier.sizeFrom(changeSpringLength);
	function changeSpringLength() {
	    return [massSurface.particle.getPosition()[0] + springRestLength + 2, 20];
	}
}

SimulationView.prototype = Object.create(View.prototype);
SimulationView.prototype.constructor = SimulationView;

SimulationView.DEFAULT_OPTIONS = {};
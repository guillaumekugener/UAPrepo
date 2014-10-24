var View          = require('famous/core/View');
var Surface       = require('famous/core/Surface');
var Transform     = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');

GraphView = function () {
    View.apply(this, arguments);

    _createGraphBackground.call(this);
}

function _createGraphBackground() {
	var graphContainerSurface = new Surface({
		size: [800, 400],
		properties: {
			backgroundColor: 'orange'
		}
	});

	var graphContainerModifier = new StateModifier({});

	var templateContainer = document.createElement('div');

	Blaze.render(Template.highChart, templateContainer);

	graphContainerSurface.setContent(templateContainer);

	this.add(graphContainerModifier).add(graphContainerSurface);
}


GraphView.prototype = Object.create(View.prototype);
GraphView.prototype.constructor = GraphView;

GraphView.DEFAULT_OPTIONS = {};
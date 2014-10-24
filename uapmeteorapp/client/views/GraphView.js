var View          = require('famous/core/View');
var Surface       = require('famous/core/Surface');
var Transform     = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');

GraphView = function () {
    View.apply(this, arguments);

    _createGraphBackground.call(this);
}

function _createGraphBackground() {
	this.graphContainerSurface = new Surface({
		size: [800, 400],
		properties: {
			backgroundColor: 'orange'
		}
	});

	var graphContainerModifier = new StateModifier({});

	this.add(graphContainerModifier).add(this.graphContainerSurface);
}


GraphView.prototype = Object.create(View.prototype);
GraphView.prototype.constructor = GraphView;

GraphView.prototype.setPositionData = function(data) {
	var templateContainer = document.createElement('div');

	Blaze.renderWithData(Template.highChart, data, templateContainer);

	this.graphContainerSurface.setContent(templateContainer);
}

GraphView.DEFAULT_OPTIONS = {};
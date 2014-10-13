var View          = require('famous/core/View');
var Surface       = require('famous/core/Surface');
var Transform     = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');

SettingsView = function () {
    View.apply(this, arguments);
}

SettingsView.prototype = Object.create(View.prototype);
SettingsView.prototype.constructor = SettingsView;

SettingsView.DEFAULT_OPTIONS = {};
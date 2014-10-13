// Rig some famo.us deps
famous.polyfills;
famous.core.famous;

// Make sure dom got a body...
var mainContext = famous.core.Engine.createContext();

var appView = new AppView();

mainContext.add(appView);

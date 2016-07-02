// Load these node modules
var load_modules = [
    'angular.js',
    'angular-animate.js',
    'angular-aria.js',
    'angular-material.js'
];


// **** AUTO LOADER ****
var read = require('fs-readdir-recursive');
// Make an array of all files in the scripts folder
// Note: might be done with a builder and written to a file for browser
var scripts = read('scripts');
var self = document.currentScript.src;
self = self.split("/").pop();
scripts.splice(scripts.indexOf(self), 1);

// Global app
var app;

var _modules = [];
var modules = read('node_modules');
modules.forEach(function (module) {
    module = module.split("\\").join("/");
    var file = module.split('/').pop();
    if(load_modules.indexOf(file) !== -1) {
        _modules.push(module);
    }
});

// Start loading the required modules
loadScripts(0, _modules, "node_modules/", function() {
    // All modules are loaded, initialize the angular app
    app = angular.module('app', []);

    // Start loading user script
    loadScripts(0, scripts, "scripts/", function() {
        // When everything is done loading, set the ng-app on body to bootstrap
        document.getElementsByTagName('body')[0].setAttribute('ng-app', "app");
    });
});

// One by one loading of all scripts
function loadScripts(index, arr, prefix, cb) {
    var next = index + 1;

    var file = arr[index];

    var head = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = prefix + file;

    // Fire the loading
    head.appendChild(script);

    script.onload = function () {
        loadScripts(next, arr, prefix, cb);
    };
    script.onreadystatechange = function () {
        loadScripts(next, arr, prefix, cb);
    };

    if(next === arr.length) {
        script.onload = cb;
        script.onreadystatechange = cb;
    }
}
(function (app) {
    app.controller('mainController', ['$scope', function ($scope) {
        document.getElementsByTagName("body")[0].style.display = "block"; // done loading.

        $scope.welcome = "Welcome to the NodeJS Webkit Scaffolding";
        $scope.description = "This project loads all required files dynamically, if you need any more from node_modules, add them to app.js";
    }]);
})(app);

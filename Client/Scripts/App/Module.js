(function () {
    app = angular.module('vickProjectModule', ['ngRoute']);
})();

//*-- Routes --*

app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'templates/pages/home.html',
            controller: 'HomeController'
        });
});
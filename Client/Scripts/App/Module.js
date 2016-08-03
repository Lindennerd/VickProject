(function () {
    app = angular.module('vickProjectModule', ['ngRoute']);
})();

//*-- Routes --*

app.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'templates/pages/home.html',
            controller: 'HomeController'
        })
        .when('/sign-up', {
            templateUrl: 'templates/pages/signUp.html',
            controller: 'SignUpController'
        })
        .when('/login', {
          templateUrl: 'templates/pages/login.html',
          controller: 'LoginController'
        })
});

(function () {
    app = angular.module('vickProjectModule', ['ngRoute'])
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/login', {
                    templateUrl: 'Views/Login/Login.html',
                    controller: 'login'
                })
                .when('/', {
                    templateUrl: 'Views/Home/Index.html',
                    controller: 'home'
                })
        })
})();
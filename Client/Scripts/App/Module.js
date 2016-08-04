(function () {
    app = angular.module('vickProjectModule', ['ngRoute', 'ngStorage']);
})();

//*-- Routes --*

app.config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/pages/home.html',
            controller: 'HomeController',
            resolve: {
                factory: checkRouting
            }
        })
        .when('/sign-up', {
            templateUrl: 'templates/pages/signUp.html',
            controller: 'SignUpController'
        })
        .when('/login', {
            templateUrl: 'templates/pages/login.html',
            controller: 'LoginController'
        })
        .when('/profile', {
            templateUrl: 'templates/pages/profile.html',
            controller: 'ProfileController',
            resolve: {
                factory: checkAuthState
            }
        });

    $httpProvider.interceptors.push('APIInterceptor');
}).service('APIInterceptor', function ($rootScope, $localStorage) {
    var service = this;

    service.request = function (config) {
        var currentUser = $localStorage.user,
            access_token = currentUser ? currentUser.token : null;

        if (access_token) {
            config.headers['x-access-token'] = access_token;
        }
        return config;
    };

    service.responseError = function (response) {
        if (response.status === 401) {
            $rootScope.$broadcast('unauthorized');
        }
        return response;
    };
});

var checkRouting = function ($q, $rootScope, $location, AuthService) {
    if (!AuthService.getUser()) {
        return true;
    } else {
        $location.path('/profile');
    }
}

var checkAuthState = function ($q, $rootScope, $location, AuthService) {
    if (AuthService.getUser()) {
        return true;
    } else {
        $location.path('/login');
    }
}
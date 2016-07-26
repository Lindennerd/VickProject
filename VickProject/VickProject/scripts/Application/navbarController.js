app.controller('navbar', function ($scope, $route, $routeParams, $location) { 
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
});
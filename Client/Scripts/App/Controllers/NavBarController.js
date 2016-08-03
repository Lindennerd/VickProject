app.controller('NavBarController', ['$scope', 'AuthService', function ($scope, authService) {
    $scope.loggedUser = authService.getUser;
    
    $scope.logout = function () {
        authService.logout();
        window.location = '/#';
    }
}]);
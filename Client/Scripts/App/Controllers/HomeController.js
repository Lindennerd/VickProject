app.controller('HomeController', ["$scope", "AuthService", function ($scope, authService) {
    $scope.title = "Arckivare";
    $scope.loggedUser = authService.getUser();
}])
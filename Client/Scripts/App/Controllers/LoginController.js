app.controller('LoginController', ['$scope', '$rootScope', 'AuthService', function ($scope, $rootScope, AuthService) {
    $scope.login = function () {
        var user = {
            userName: $scope.username,
            password: $scope.password
        };
        AuthService.login(user, function (result) {
            if (result.success) {
                window.location = '#/';
            } else {
                $scope.hasError = result.message;
            }
        });
    }
}]);
app.controller('ProfileController', ['$scope', '$http', 'AuthService', function ($scope, $http, AuthService) {
	$scope.loggedUser = AuthService.getUser();
}]);
app.controller('ProfileController', ['$scope', '$http', 'AuthService', function ($scope, $http, AuthService) {
	$scope.loggedUser = AuthService.getUser();
	$scope.activateNav = function (event) {
		event.preventDefault();
		$(event.target).tab('show');
	}
}]);
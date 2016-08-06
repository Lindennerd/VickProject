app.controller('EditProfileController', ['$scope','AuthService', function($scope, AuthService){
	$scope.user = AuthService.getUser();
	$scope.update = function () {
		AuthService.update($scope.user, function (data) {
			if (data.success) {
				$('#update-success').modal('show');
				$('#update-success').on('hidden.bs.modal', function () {
					window.location = '#/';				
				});
			}
		});
	}
}]);
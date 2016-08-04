app.controller('ProfileController', ['$scope', '$http', function ($scope, $http) {
    $http.get(routes.bears.list)
        .success(function (data, status) {
            $scope.bears = data;
        });
}]);
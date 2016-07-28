app.controller('loginController',['$scope', 'signUp', function ($scope, signUp) {
    $scope.title = 'Crie aqui seu usuário';
    $scope.newUser = {
        userName: '',
        password: '',
        emailAddress: '',
        confirmPassword: ''
        
    };

    $scope.signUp = function () {
        signUp($scope.newUser)
            .success(function (data, status) {
                alert('criado');
            })
            .error(function () {
                alert('erro ocorrido');
            });
    };
}]);

app.service('signUp', ['$http', function ($http) {
    return function (newUser) {
        return $http.post('/api/Users', newUser);
    }
}]);

app.directive('password', function ($timeout) {
    return {
        require: 'ngModel',
        controller: function ($element) {
            var ctrl = $element.controller('ngModel');

            ctrl.$validators.password =
              function (modelValue, viewValue) {
                  return viewValue && viewValue.length >= 4
                    && /[0-9]/.test(viewValue)
                    && /[a-z]/i.test(viewValue);
              };
        }
    };
});

app.directive('equals', [
  function () {

      var link = function ($scope, $element, $attrs, ctrl) {

          var validate = function (viewValue) {
              var comparisonModel = $attrs.equals;

              if (!viewValue || !comparisonModel) {
                  ctrl.$setValidity('equals', true);
              }

              ctrl.$setValidity('equals', viewValue == comparisonModel);
              return viewValue;
          };

          ctrl.$parsers.unshift(validate);
          ctrl.$formatters.push(validate);

          $attrs.$observe('equals', function (comparisonModel) {
              return validate(ctrl.$viewValue);
          });

      };

      return {
          require: 'ngModel',
          link: link
      };

  }
]);
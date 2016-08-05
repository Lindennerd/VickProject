//TODO - Refactor this file

app.controller('SignUpController',['$scope', 'AuthService', function ($scope, AuthService) {
    $scope.title = 'Crie aqui seu usuário';
    $scope.newUser = {
        userName: '',
        password: '',
        emailAddress: '',
        confirmPassword: ''
        
    };

    $scope.signUp = function () {
        AuthService.signUp($scope.newUser)
            .success(function (data, status) {
                $('#signup-success').modal('show');
                $('#signup-success').on('hidden.bs.modal', function () {
                  window.location = '#/login';
                });
            })
            .error(function () {
                $('#signup-error').modal('show');
            });
    };
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

app.directive('username', function($q, $timeout, $http) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$asyncValidators.username = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty model valid
          return $q.when();
        }

        var def = $q.defer();

        $http.get(routes.users.usernames)
          .success(function (data, status) {
            if (data.filter(function(object) { 
              return object.name == modelValue 
            }).length > 0) {
              def.reject();
            } else {
              def.resolve();
            }
          });

        return def.promise;
      };
    }
  };
});

app.directive('emailvalid', function($q, $timeout, $http) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      ctrl.$asyncValidators.emailvalid = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty model valid
          return $q.when();
        }

        var def = $q.defer();

        $http.get(routes.users.usernames)
          .success(function (data, status) {
            if (data.filter(function(object) { 
              return object.email == modelValue 
            }).length > 0) {
              def.reject();
            } else {
              def.resolve();
            }
          });

        return def.promise;
      };
    }
  };
});
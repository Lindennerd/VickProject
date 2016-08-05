app.factory('AuthService', ['$http', '$localStorage', function ($http, $localStorage) {
    return {
        login: function (credentials, callback) {
            $http.post(routes.auth.login, credentials)
                .success(function (data, status) {
                    if (data.success) {
                        $localStorage.user = {
                            token: data.token,
                            username: data.username,
                            userId: data.id
                        };
                        callback({ success: data.success });

                    } else {
                        callback(data);
                    }
                });
        },
        logout: function () {
            $localStorage.user = null;
        },
        signUp: function (newUser) {
            return $http.post(routes.signUp.users, newUser);
        },
        getUser: function () {
            return ($localStorage.user) ? $localStorage.user : false;
        }
    }
}]);
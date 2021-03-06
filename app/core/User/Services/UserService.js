angular.module('UserModule').factory('UserService', [
    '$http',
    '$q',
    function ($http, $q) {
        return {
            new: function () {
                return {
                    _id: null,
                    firstName: null,
                    lastName: null,
                    login: null
                };
            },

            list: function () {
                var deferred = $q.defer();

                $http
                    .get('http://localhost:3000/user')
                    .success(function (reponse) {
                        deferred.resolve(reponse.data);
                    })
                    .error(function (response) {
                        deferred.reject(response);
                    });

                return deferred.promise;
            },

            get: function (userId) {
                var deferred = $q.defer();

                $http
                    .get('http://localhost:3000/user/' + userId)
                    .success(function (reponse) {
                        deferred.resolve(reponse.data);
                    })
                    .error(function (reponse) {
                        deferred.reject(reponse);
                    });

                return deferred.promise;
            },

            save: function (user) {
                var deferred = $q.defer();

                if (user._id) {
                    // Edit mode
                    var request = $http.put('http://localhost:3000/user/' + user._id, user);
                } else {
                    // Create mode
                    var request = $http.post('http://localhost:3000/user/', user);
                }

                request
                    .success(function (reponse) {
                        deferred.resolve(reponse.data);
                    })
                    .error(function (reponse) {
                        deferred.reject(reponse);
                    });

                return deferred.promise;
            }
        };
    }
]);
loginModule.controller('LoginController', ['$scope', 'LoginService', '$window', '$cookies', 'AdminService', function ($scope, LoginService, $window, $cookies, AdminService) {

    $scope.logOut = function () {
        $cookies.remove('logged-in-email-id');
        $cookies.remove('session-id');
        $cookies.remove('admin-status');

        // clear notificaction list
        $scope.notificationsList = [];

        // redirect to login page
        $window.location.href = '#!/login';
    }

    $scope.login = function () {
        //console.log($scope.loginDetails);
        LoginService.login($scope.loginDetails).then(
            (response) => {
                console.log(response);
                // TODO: change this once session is added
                $scope.currentUserEmail = $scope.loginDetails.username;

                // persist session-id in a cookie
                $cookies.put('session-id', response.data);
                $cookies.put('access-token', response.data.access_token); 

                // persist email-id in a cookie
                // TODO: remove this when session functionality is complete
                $cookies.put('logged-in-email-id', $scope.loginDetails.username);

                AdminService.checkIfUserIsAdmin().then(
                    (response) => {
                        $cookies.put('admin-status', response.data);
                        console.log($cookies.get('admin-status'));
                        //$scope.adminStatus = $cookies.get('admin-status');
                    },
                    (error) => {
                        console.log(error);
                    }
                );

                // redirect to catalogue page on successful login
                $window.location.href = '#!/home/catalogue';
            },
            (error) => {
                console.log(error);
            }
        );
    };
}]);
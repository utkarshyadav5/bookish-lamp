loginModule.controller('LoginController', ['$scope', 'LoginService', '$window', '$cookies', 'AdminService', function ($scope, LoginService, $window, $cookies, AdminService) {

    $scope.logOut = function () {
        $cookies.remove('logged-in-email-id');
        //$cookies.remove('session-id');
        $cookies.remove('admin-status');
        $cookies.remove('access-token');
        $cookies.remove('user-id');
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
                // $cookies.put('session-id', response.data);
                $cookies.put('access-token', response.data.access_token); 
                $cookies.put('admin-status', response.data.roles);
                $cookies.put('user-id', response.data.userId);

                // persist email-id in a cookie
                // TODO: remove this when session functionality is complete
                $cookies.put('logged-in-email-id', $scope.loginDetails.username);

                AdminService.checkIfUserIsAdmin().then(
                    (response) => {
                        //$cookies.put('admin-status', response.data.roles);
                        //console.log(response.data.roles);
                        $scope.adminStatus = $cookies.get('admin-status');
                        //console.log($scope.adminStatus);
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
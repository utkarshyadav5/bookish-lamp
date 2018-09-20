angular.module('LoginModule').service('LoginService', ['$http', '$cookies', function ($http, $cookies) {


    var DOMAIN_NAME = 'http://localhost:54580/';
    var LOGIN = 'token';

    this.serviceWorks = function () {
        //console.log("regisetr service works");
    };

    this.login = function (loginDetails) {
        // send email-id with the request-header
        $http.defaults.headers.common.EmailId = $cookies.get('logged-in-email-id');
        loginDetails.grant_type = "password";

        console.log(JSON.stringify(loginDetails));

        return $http.post(DOMAIN_NAME + LOGIN,
            "userName=" + loginDetails.username +
            "&password=" + loginDetails.Password +
            "&grant_type=password",
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
    };
}]);
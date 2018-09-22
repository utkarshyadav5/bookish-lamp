angular.module('RegisterModule').service('RegisterService', ['$http', function ($http) {

    var DOMAIN_NAME = 'http://localhost:54580/';
    var REGISTER = 'api/account/register';
    
    this.serviceWorks = function () {
        //console.log("regisetr service works");
    };

    this.register = function (registrationDetails) { 
        console.log(JSON.stringify(registrationDetails));

        $http.post(DOMAIN_NAME+REGISTER,JSON.stringify(registrationDetails));
    };
}]);
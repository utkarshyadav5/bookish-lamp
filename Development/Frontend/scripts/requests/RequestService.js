angular.module('RequestModule').service('RequestService', ['$http', '$cookies', function ($http, $cookies) {

    var token = $cookies.get('access-token');
    $http.defaults.headers.common['Authorization'] = "Bearer " + token;

    // send email-id with the request-header
    $http.defaults.headers.common.EmailId = $cookies.get('logged-in-email-id');

    var DOMAIN_NAME = 'http://localhost:54580/api/order';
    var GET_PENDING_REQUESTS = '';
    var REQUEST = "/"

    this.serviceWorks = function () {
        console.log("request service works");
    };

    this.getPendingRequests = function () {
        return $http.get(DOMAIN_NAME + GET_PENDING_REQUESTS);
    };

    this.reject = function (rentalDetails) {
        var OrderId = rentalDetails.OrderId;
        console.log(OrderId);
        return $http.put(DOMAIN_NAME + REQUEST + OrderId, JSON.stringify(rentalDetails));
    };

    this.approve = function (rentalDetails) {
        var OrderId = rentalDetails.OrderId;
        console.log(OrderId);
        return $http.put(DOMAIN_NAME + REQUEST + OrderId, JSON.stringify(rentalDetails));
    };
}]);
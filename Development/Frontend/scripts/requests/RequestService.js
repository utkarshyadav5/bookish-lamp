angular.module('RequestModule').service('RequestService', ['$http', '$cookies', function ($http, $cookies) {

    var token = $cookies.get('access-token');
    $http.defaults.headers.common['Authorization'] = "Bearer " + token;

    // send email-id with the request-header
    $http.defaults.headers.common.EmailId = $cookies.get('logged-in-email-id');

    var DOMAIN_NAME = 'http://localhost:54580/api/order';
    var GET_PENDING_REQUESTS = '?status=Waiting';
    var GET_APPROVED_REQUESTS = '?status=Approved';
    var GET_REJECTED_REQUESTS = '?status=Rejected';
    var REQUEST = "/"

    this.serviceWorks = function () {
        console.log("request service works");
    };

    this.getPendingRequests = function () {
        if ($cookies.get('admin-status') != "Admin") {
            return $http.get(DOMAIN_NAME + '/' + $cookies.get('user-id'));
        }
        else {
            return $http.get(DOMAIN_NAME + GET_PENDING_REQUESTS);
        }
    };

    this.getAllRequests = function () {
        return $http.get(DOMAIN_NAME);
    };

    this.getApprovedRequests = function () {
        return $http.get(DOMAIN_NAME + GET_APPROVED_REQUESTS);
    };

    this.getRejectedRequests = function () {
        return $http.get(DOMAIN_NAME + GET_REJECTED_REQUESTS);
    };

    this.getBook = function (bookId) {
        return $http.get('http://localhost:54580/api/book/' + bookId);
    };

    this.increaseCount = function (bookDetails) {
        //console.log(bookDetails);
        bookDetails.AvailableNumber++;
        return $http.put('http://localhost:54580/api/book/' + bookDetails.BookId, JSON.stringify(bookDetails));
    }

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
angular.module('WishlistModule').service('WishlistService', ['$http', '$cookies', function ($http, $cookies) {

    var token = $cookies.get('access-token');
    $http.defaults.headers.common['Authorization'] = "Bearer " + token;

    var DOMAIN_NAME = 'http://localhost:54580/api/';
    var WISHLIST = 'user/wishlist';

    this.serviceWorks = function () {
        console.log("wishlist service works");
    };

    this.getAllBooksForCurrentUser = function () {
        // send email-id with the request-header
        $http.defaults.headers.common.EmailId = $cookies.get('logged-in-email-id');
        return $http.get(DOMAIN_NAME + WISHLIST);
    };
}]);
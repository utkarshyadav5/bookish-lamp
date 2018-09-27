angular.module('WishlistModule').service('WishlistService', ['$http', '$cookies', function ($http, $cookies) {

    var token = $cookies.get('access-token');
    $http.defaults.headers.common['Authorization'] = "Bearer " + token;

    var DOMAIN_NAME = 'http://localhost:54580/api/';
    var WISHLIST = 'wishlists';
    var GET_ALL_BOOKS = 'book';

    this.serviceWorks = function () {
        console.log("wishlist service works");
    };

    this.getAllBooksForCurrentUser = function () {
        // send email-id with the request-header
        if ($cookies.get('admin-status') != "Admin"){
            return $http.get(DOMAIN_NAME + WISHLIST + '/' + $cookies.get('user-id'));
        }
        else{
            return $http.get(DOMAIN_NAME + WISHLIST);
        }
    };

    this.getAllBooks = function () {
        return $http.get(DOMAIN_NAME + GET_ALL_BOOKS);
    };

    this.removeFromWishList = function (wishListId) {
        return $http.delete(DOMAIN_NAME + WISHLIST + '/' + wishListId);
    }
    
}]);
angular.module('CatalogueModule').service('catalogueService', ['$http', '$cookies', function ($http, $cookies) {

    // send session id with the request
    var token = $cookies.get('access-token');
    $http.defaults.headers.common['Authorization'] = "Bearer "+ token;

    // send email-id with the request-header
    $http.defaults.headers.common.EmailId = $cookies.get('logged-in-email-id');

    var DOMAIN_NAME = 'http://localhost:54580/api/';
    var GET_ALL_BOOKS = 'book';
    var GET_BOOKS_BY_GENRE = 'Books/genre';
    var GET_BOOKS_BY_AUTHOR = 'Books/author';
    var ADD_BOOK = 'Books/add';
    var DELETE_BOOK = 'Books/delete';
    var GET_USERS_FOR_BOOK = 'Books/users';

    var MAKE_BOOK_ISSUE_REQUEST = 'Books/issue';
    var ADD_TO_WISHLIST = 'user/wishlist';

    this.foo = function () {
        console.log("Catalogue Service works...");
    };

    this.addBook = function (bookDetails) {
        return $http.post(DOMAIN_NAME + ADD_BOOK, JSON.stringify(bookDetails));
    }

    this.getAllBooks = function () {
        return $http.get(DOMAIN_NAME + GET_ALL_BOOKS);
    };

    this.makeBookIssueRequest = function (bookDetails) {
        //console.log(bookDetails);

        return $http.post(DOMAIN_NAME + MAKE_BOOK_ISSUE_REQUEST, JSON.stringify(bookDetails));
    }

    this.addToWishList = function (bookDetails) {
        // console.log(bookDetails);
        return $http.post(DOMAIN_NAME + ADD_TO_WISHLIST, JSON.stringify(bookDetails));
    };


}]);
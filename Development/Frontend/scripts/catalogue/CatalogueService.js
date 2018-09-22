angular.module('CatalogueModule').service('catalogueService', ['$http', '$cookies', function ($http, $cookies) {

    // send session id with the request
    var token = $cookies.get('access-token');
    $http.defaults.headers.common['Authorization'] = "Bearer "+ token;

    // send email-id with the request-header
    $http.defaults.headers.common.EmailId = $cookies.get('logged-in-email-id');

    var DOMAIN_NAME = 'http://localhost:54580/api/';
    var GET_ALL_BOOKS = 'book';
    var GET_BOOKS_BY_GENRE = 'book/genre';
    var GET_BOOKS_BY_AUTHOR = 'book/author';
    var ADD_BOOK = 'book';
    var DELETE_BOOK = 'book';
    var GET_USERS_FOR_BOOK = 'book/users';

    var MAKE_BOOK_ISSUE_REQUEST = 'order';
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
        bookDetails.UserId = "ac1bbd5d-7e42-4df3-95d2-69006dd1c7d2";
        bookDetails.Status = "Waiting";
        var today = new Date();
        var oDate = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
        var rDate = today.getFullYear() + '-' + today.getMonth() + '-' + (today.getDate()+7);
        bookDetails.OrderDate = oDate;
        bookDetails.ReturnDate = rDate;
        console.log(bookDetails);
        return $http.post(DOMAIN_NAME + MAKE_BOOK_ISSUE_REQUEST, JSON.stringify(bookDetails));
    }

    this.addToWishList = function (bookDetails) {
        // console.log(bookDetails);
        return $http.post(DOMAIN_NAME + ADD_TO_WISHLIST, JSON.stringify(bookDetails));
    };


}]);
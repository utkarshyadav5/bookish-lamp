angular.module("WishlistModule").controller('WishlistController', ['WishlistService', 'catalogueService', '$scope', function (WishlistService, catalogueService,$scope) {
    console.log("wishlist");

    getAll = function(){
        WishlistService.getAllBooksForCurrentUser().then((response) => {
            $scope.wishlistRecords = response.data;

            WishlistService.getAllBooks().then((response) => {
                $scope.allBooks = response.data;

                angular.forEach($scope.wishlistRecords, function (value, index) {
                    angular.forEach($scope.allBooks, function (bookValue, bookIndex) {
                        if (value.BookId == bookValue.BookId) {
                            value.Book = bookValue;
                        }
                    });
                });

                //console.log($scope.wishlistRecords);
            }, (error) => {
                console.log(error);
            })
        }, (error) => {
            console.log(error);
        })
    }

    getAll();

    $scope.removeFromWishList = function (wishListId) {
        console.log("Removing " + wishListId + " from wishlist");
        WishlistService.removeFromWishList(wishListId);
        getAll();
        getAll();
    };

    $scope.issueBook = function (book) {
        var bookId = book.BookId;
        console.log("issue book " + bookId);
        catalogueService.makeBookIssueRequest({ "BookId": bookId });
        catalogueService.decreaseCount(book);
    }
}]);
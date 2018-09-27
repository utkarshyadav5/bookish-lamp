angular.module('RequestModule').controller('RequestController', ['$scope', 'RequestService', function ( $scope, RequestService) {
    console.log("requests");

    $scope.getPending = function() {
        RequestService.getPendingRequests()
            .then(
                (response) => {
                    console.log(response.data);
                    $scope.pendingRentalsList = response.data;
                },
                (error) => {
                    console.log(error);
                }
            );
    }
    
    $scope.getPending();

    $scope.getAll = function () {
        RequestService.getAllRequests()
            .then(
                (response) => {
                    console.log(response.data);
                    $scope.pendingRentalsList = response.data;
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    $scope.getApproved = function () {
        RequestService.getApprovedRequests()
            .then(
                (response) => {
                    console.log(response.data);
                    $scope.pendingRentalsList = response.data;
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    $scope.getRejected = function () {
        RequestService.getRejectedRequests()
            .then(
                (response) => {
                    console.log(response.data);
                    $scope.pendingRentalsList = response.data;
                },
                (error) => {
                    console.log(error);
                }
            );
    }
    

    $scope.approve = function (rentalDetails) {
        rentalDetails.Status = "Approved";
        //console.log(rentalDetails);
        RequestService.approve(rentalDetails);
        RequestService.getPendingRequests();
    };

    $scope.reject = function (rentalDetails) {
        console.log(rentalDetails);
        RequestService.getBook(rentalDetails.BookId).then(
            (response) => {
                $scope.booksList = response.data;
                RequestService.increaseCount($scope.booksList);
            },
            (error) => {
                console.log(error);
            }
        );
        rentalDetails.Status = "Rejected";
        RequestService.reject(rentalDetails);
        RequestService.getPendingRequests()
    };

    $scope.return = function (rentalDetails) {
        console.log(rentalDetails);
        RequestService.getBook(rentalDetails.BookId).then(
            (response) => {
                $scope.booksList = response.data;
                RequestService.increaseCount($scope.booksList);
            },
            (error) => {
                console.log(error);
            }
        );
        rentalDetails.Status = "Returned";
        RequestService.reject(rentalDetails);
        RequestService.getPendingRequests()
    };

}]);
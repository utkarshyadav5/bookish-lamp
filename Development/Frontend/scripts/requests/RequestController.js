angular.module('RequestModule').controller('RequestController', ['$scope', 'RequestService', function ( $scope, RequestService) {
    console.log("requests");

    // TODO: auto-refresh periodically
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

    $scope.approve = function (rentalDetails) {
        rentalDetails.Status = "Approved";
        console.log(rentalDetails);
        RequestService.approve(rentalDetails);
        RequestService.getPendingRequests();
    };

    $scope.reject = function (rentalDetails) {
        rentalDetails.Status = "Rejected";
        console.log(rentalDetails);
        RequestService.reject(rentalDetails);
        RequestService.getPendingRequests()
    };

}]);
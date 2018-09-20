angular.module('NotificationModule', []).controller('NotificationController', ['$scope', '$cookies', '$interval', 'NotificationService', function ($scope, $cookies, $interval, NotificationService) {

    let NOTIFICATION_REFRESH_INTERVAL_IN_SECONDS = 60;

    $scope.notificationsList = [];

    // make all notifications inactive at the start
    $scope.currentlySelectedNotification = -1;

    // fetches all notifications for the logged-in user
    $scope.getAllNotificationsForCurrentUser = function () {

        NotificationService.getAllNotificationsForUser().then(
            (response) => {
                $scope.notificationsList = response.data;
            },
            (error) => {
                console.log("Notification error is ");
                console.log(error);
            }
        );
    }

    // get notificactions once at page reload
    $scope.getAllNotificationsForCurrentUser();

    // refresh notifications
    $interval($scope.getAllNotificationsForCurrentUser, NOTIFICATION_REFRESH_INTERVAL_IN_SECONDS*1000);

}]);
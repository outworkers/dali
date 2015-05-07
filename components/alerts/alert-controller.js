var alerts = angular.module('alerts', ['ui.bootstrap.alert']);

alerts.controller('AlertController', ['$scope', 'AlertService', function ($scope, alertService) {

  $scope.service = alertService;

  $scope.alerts = alertService.alerts;

}]);

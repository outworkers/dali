dali.utils.namespace("dali.bootstrap");

/**
 * Dali bootstrap alert.
 * @type {angular.Module}
 */
dali.bootstrap.alerts = angular.module('alerts', ['ui.bootstrap.alert']);

angular.module('alerts').controller('AlertController', [
  '$scope',
  'AlertService',
  function ($scope, alertService) {

  $scope.service = alertService;

  $scope.alerts = alertService.alerts;

  $scope.dismissAlert = function(alertId) {
    alertService.dismissAlert(alertId);
  };

}]);

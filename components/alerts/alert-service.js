dali.utils.namespace("dali.services");

dali.services.AlertService = function() {
  this.alerts = [];

  this.timeout_ = null;
};
dali.addSingletonGetter(dali.services.AlertService);

dali.services.AlertService.prototype.setTimeout = function(timeout) {
  this.timeout_ = timeout;
  return this;
};

dali.services.AlertService.prototype.getAlerts = function() {
  return this.alerts_;
};

dali.services.AlertService.prototype.error = function(message) {
  this.alerts.push({
    type: 'danger',
    msg: message,
    expired: false
  });

  this.expire_(this.alerts.length - 1);
};

dali.services.AlertService.prototype.success = function(message) {
  this.alerts.push({
    type: 'success',
    msg: message,
    expired: false
  });

  this.expire_(this.alerts.length - 1);
};

dali.services.AlertService.prototype.expire_ = function(index) {
  var scope = this;
  (function(i) {
    scope.timeout_(function() {
      scope.closeAlert(i);
    }, 1700);
  })(index);
};

dali.services.AlertService.prototype.addAlert = function(message) {
  this.alerts.push({msg: message});
};

dali.services.AlertService.prototype.closeAlert = function(index) {
  this.alerts.splice(index, 1);
};

alerts.factory('AlertService', ['$timeout', function($timeout) {
  return dali.services.AlertService.getInstance().setTimeout($timeout);
}]);

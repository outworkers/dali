dali.utils.namespace("dali.services");

dali.services.AlertService = function() {
  this.alerts = {};

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

  var id = dali.uuid();

  this.alerts[id] = {
    type: 'danger',
    msg: message,
    expired: false
  };

  this.expire_(id);
};

dali.services.AlertService.prototype.success = function(message) {

  var id = dali.uuid();

  this.alerts[id] = {
    type: 'success',
    msg: message,
    expired: false
  };

  this.expire_(id);
};

dali.services.AlertService.prototype.expire_ = function(index) {
  var scope = this;
  (function(id) {
    scope.timeout_(function() {
      scope.closeAlert(id);
    }, 1700);
  })(index);
};

dali.services.AlertService.prototype.closeAlert = function(id) {
  delete this.alerts[id];
};

alerts.factory('AlertService', ['$timeout', function($timeout) {
  return dali.services.AlertService.getInstance().setTimeout($timeout);
}]);

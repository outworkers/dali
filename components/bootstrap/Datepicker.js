dali.utils.namespace("dali.bootstrap");
dali.utils.namespace("dali.bootstrap.datepicker");

dali.bootstrap.datepicker.Defaults = {
  FORMAT: "dd/MM/yyyy",
  OPTIONS: {
    formatYear: 'yy',
    startingDay: 1
  },
  /**
   * @return {boolean}
   */
  DEFAULT_DISABLED_FN: function() {
    return false;
  }
};

dali.bootstrap.Datepicker = function(init, format, options, opt_disabledFn) {
  this.dt = init || new Date();

  this.format = format || dali.bootstrap.datepicker.Defaults.FORMAT;

  this.options = options || dali.bootstrap.datepicker.Defaults.OPTIONS;

  this.opened = false;

  this.disabled = opt_disabledFn || dali.bootstrap.datepicker.Defaults.DEFAULT_DISABLED_FN;
};

dali.bootstrap.Datepicker.prototype.days = function(offset) {
  var off = offset || 1;
  var target = new Date(this.dt);
  target.setDate(this.dt.getDate() + off);
  this.dt = target;
  return this;
};

dali.bootstrap.Datepicker.prototype.today = function() {
  this.dt = new Date();
  return this;
};

dali.bootstrap.Datepicker.prototype.yesterday = function() {
  this.today().days(-1);
};

dali.bootstrap.Datepicker.prototype.clear = function() {
  this.dt = null;
};

dali.bootstrap.Datepicker.beginningOfTheMonth = function(start) {
  var dt = start || new Date();
  dt.setHours(0, 0, 0, 0);
  return new Date(dt.getFullYear(), dt.getMonth(), 1);
};

dali.bootstrap.Datepicker.endOfTheMonth = function(date) {
  var dt = date || new Date();
  dt.setHours(23, 59, 59, 999);
  return new Date(dt.getFullYear(), dt.getMonth() + 1, 0);
};

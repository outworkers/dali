dali.utils.namespace("dali.dom");

dali.dom.Component = function() {
    this.container_ = null;
};

dali.dom.Component.prototype.getContainer = function() {
  return this.container_;
};

dali.dom.Component.prototype.decorate = function(target, cache) {
  target.appendChild(this.createDom(cache));
};


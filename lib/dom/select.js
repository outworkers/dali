
/**
 * Builds a dropdown selector similar to a normal HTML selector.
 * @param {Array.<string>} options The available options.
 * @param {number=} opt_start A start index.
 * @param {number=} opt_default
 * @param opt_style
 * @constructor
 */
dali.dom.Select = function(options, opt_start, opt_default, opt_style) {

  dali.dom.Component.call(this);

  this.limit_ = options.length;

  this.options_ = options.slice(0);

  this.start_ = opt_start || 0;

  this.default_ = opt_default || this.start_;

  this.selected_ = this.default_;

  this.style_ = opt_style || "";

  this.wrapper_ = null;

  this.height_ = 70;

  this.expanded_ = false;

  this.selectedIndex_ = 0;

  var tmp = this.options_[0];
  this.options_[0] = this.options_[this.start_];
  this.options_[this.start_] = tmp;

};

dali.inherits(dali.dom.Select, dali.dom.Component);

dali.dom.Select.prototype.expand = function() {
  this.expanded_ = true;

  this.wrapper_.style.top = "0px";

  $(this.container_).addClass("expanded");

  this.container_.style.overflow = "visible";

  this.wrapper_.style.zIndex = "50";
};

dali.dom.Select.prototype.contract = function() {
  $(this.container_).removeClass("expanded");

  this.expanded_ = false;

  this.container_.style.overflow = "hidden";

  this.wrapper_.style.zIndex = "10";
};

/**
 * @return {void}
 */
dali.dom.Select.prototype.animate = function() {
  if (this.expanded_) {
    this.contract();
  } else {
    this.expand();
  }
};


dali.dom.Select.prototype.getExpandedHeight = function() {
  return this.height_ * this.limit_;
};


dali.dom.Select.fromOptions = function(arr, style) {
  return new dali.dom.Select(arr, 0, arr[0], style);
};

dali.dom.Select.prototype.create = function(value) {
  var el = document.createElement("div");

  el.className = "selector-field";
  el.innerHTML = value;

  return el;
};

dali.dom.Select.prototype.createDom = function() {

  var container = document.createElement("div");
  this.container_ = container;

  var icon = document.createElement("div");
  icon.className = "icon sprite";

  this.wrapper_ = document.createElement("div");
  this.wrapper_.className = "selector-wrapper";
  this.wrapper_.height = this.getExpandedHeight();

  this.container_.appendChild(this.wrapper_);
  this.container_.appendChild(icon);

  $(this.wrapper_).click($.proxy(function(event) {
    this.animate();
  }, this));

  if (this.style_.length === 0) {
    container.className = "selector";
  } else {
    container.className = "selector" + " " + this.style_;
  }

  var func = function(index, obj) {
    $(option).click($.proxy(function(event) {
      obj.select(index);
    }, obj));
  };

  for (var i = 0; i < this.limit_; i++) {
    var option = this.create(this.options_[i]);

    func(i, this);

    this.wrapper_.appendChild(option);
  }

  return container;
};

dali.dom.Select.prototype.select = function(index) {
  if (this.expanded_) {
    var scrolled = -this.height_ * index;

    this.selectedIndex_ = index;

    this.wrapper_.style.top = scrolled + "px";
  }
};

dali.dom.Select.prototype.getValue = function() {
  return this.options_[this.selectedIndex_];
};

dali.dom.Select.prototype.setSelectedValue = function(value) {
  this.selected_ = value;
};

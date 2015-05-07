dali.utils.namespace("dali.models");

dali.models.Password = function(password) {
  this.password_ = password;
  this.hashed_ = false;
  this.encrypt_();
};


dali.models.Password.prototype.encrypt_ = function() {
  if (!this.hashed_) {
    var shaObj = new jsSHA(this.password_, "TEXT");
    this.password_ = shaObj.getHash("SHA-256", "HEX");
    this.hashed_ = true;
  }
};

dali.models.Password.prototype.getPassword = function() {
  this.encrypt_();
  return this.password_;
};

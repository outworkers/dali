dali.utils.namespace("dali.models");

/**
 * The Login request model, encapsulating data sent to the server during authentication requests.
 * Comes with pre-built encryption capabilities and will hash a password on the fly when necessary.
 * @param email The user's email adddress, used as an unique identifier.
 * @param password Ther user's password in plain text, as obtained from password input fields.
 * @constructor
 */
dali.models.LoginRequest = function(email, password) {
  this.email_ = email;
  this.pass_ = new dali.models.Password(password).getPassword();
  this.hashed_ = true;
};


dali.models.LoginRequest.prototype.getEmail = function() {
  return this.email_;
};

dali.models.LoginRequest.prototype.getPassword = function() {
  return this.pass_;
};


dali.models.LoginRequest.prototype.asJson = function() {
  return {
    'email': this.email_,
    'password': this.pass_
  };
};


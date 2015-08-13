/*
 * Copyright 2015 Websudos, Limited. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, is strictly forbidden.
 */
dali.utils.namespace("dali.http");

dali.http.HttpErrorResponse = function(code, messages) {
  this.code_ = code;
  this.messages_ = messages;
};

dali.http.HttpErrorResponse.prototype.getCode = function() {
  return this.code_;
};

dali.http.HttpErrorResponse.prototype.getMessages = function() {
  return this.messages_;
};

/**
 * A wrapper around the Angular HTTP service response.
 * @param {string} data The server response data in string format.
 * @param {number} status The response status code.
 * @param {Object<string, string>} headers The list of HTTP response headers.
 * @param {Object<string, string>} config The configuration map of the HTTP service.
 * @constructor
 */
dali.http.HttpError = function(data, status, headers, config) {
  this.data_ = data;

  this.status_ = status;

  this.headers_ = headers;

  this.config_ = config;
};

dali.http.HttpError.prototype.getData = function() {
  return this.data_;
};

/**
 * Retrieve the underlying error object from the JSON response.
 * This is based on the internal convention used inside dali, where a failure
 * is represented by a code along side an array of failure messages.
 *
 * @return {dali.http.HttpErrorResponse}
 */
dali.http.HttpError.prototype.getError = function() {
  var obj = this.getData();

  return new dali.http.HttpErrorResponse(
      obj["error"]["code"],
      obj["error"]["messages"]
  );
};

/**
 * Retrieve the underlying error object from the JSON response.
 * This is based on the internal convention used inside dali, where a failure
 * is represented by a code along side an array of failure messages.
 *
 * @return {dali.http.HttpErrorResponse}
 */
dali.http.HttpError.prototype.getFirstError = function() {
  return this.getError().getMessages()[0];
};


dali.http.HttpError.prototype.getStatus = function() {
  return this.status_;
};

dali.http.HttpError.prototype.getHeaders = function() {
  return this.headers_;
};

dali.http.HttpError.prototype.getConfig = function() {
  return this.config_;
};

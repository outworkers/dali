/*
 * Copyright 2015 Websudos, Limited. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, is strictly forbidden.
 */
dali.utils.namespace("dali.http");

/**
 * A wrapper around the Angular HTTP service response.
 * @param {string} data The server response data in string format.
 * @param {number} status The response status code.
 * @param {Object<string, string>} headers The list of HTTP response headers.
 * @param {Object<string, string>} config The configuration map of the HTTP service.
 * @constructor
 */
dali.http.HttpResponse = function(data, status, headers, config) {
  this.data_ = data;

  this.status_ = status;

  this.headers_ = headers;

  this.config_ = config;
};

dali.http.HttpResponse.prototype.getData = function() {
  return this.data_;
};

dali.http.HttpResponse.prototype.getStatus = function() {
  return this.status_;
};

dali.http.HttpResponse.prototype.getHeaders = function() {
  return this.headers_;
};

dali.http.HttpResponse.prototype.getConfig = function() {
  return this.config_;
};

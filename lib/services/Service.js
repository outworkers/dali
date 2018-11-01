dali.utils.namespace("dali.services");

/*
 * Copyright 2015 Websudos, Limited. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, is strictly forbidden.
 */
dali.services.Service = function() {

    /**
     * A reference to the Angular $q service.
     * @type {angular.$q=}
     * @private
     */
    this.q_ = null;

    /**
     * A reference to the Angular HTTP service.
     * @type {angular.Http=}
     * @private
     */
    this.http_ = null;

    /**
     * A reference to the Alerts service.
     * @type {dali.services.AlertsService}
     * @private
     */
    this.alerts_ = null;

    this.autoalert_ = false;

    this.cache_ = null;
};


/**
 * Sets the references to the Angular service singletons.
 * @param {angular.$q} $q The deferred promises service.
 * @param {angular.Http} $http The http services.
 * @param {dali.services.AlertsService} $http The http services.
 * @return {dali.services.Service} A reference to the current service.
 */
dali.services.Service.prototype.setServices = function($q, $http, alerts) {
    this.q_ = $q;
    this.http_ = $http;
    this.alerts_ = alerts;

    this.cache_ = null;

    return this;
};

dali.services.Service.prototype.autoalert = function(flag) {
    this.autoalert_ = flag;
    return this;
};

/**
 * Returns a reference to the underlying HTTP service singleton.
 * @return {dali.admin.services.SeedService.http_|*}
 */
dali.services.Service.prototype.getHttp = function() {
    return this.http_;
};

/**
 * Returns a reference to the underlying promise service.
 * @protected
 * @return {angular.Q} The promise service.
 */
dali.services.Service.prototype.getQ = function() {
    return this.q_;
};

dali.services.Service.prototype.setCache = function(cache) {
    this.cache_ = cache;
    return this;
};

/**
 * Returns a reference to the internal cache of this service.
 * @returns {null|*}
 */
dali.services.Service.prototype.getCache = function() {
    return this.cache_;
};

dali.services.Service.prototype.successful = function(data) {
    return this.q_.when(data);
};

dali.services.Service.prototype.get = function(route, config) {
    return this.request(this.getHttp().get(route, config));
};


dali.services.Service.prototype.patch = function(route, data, config) {
    return this.request(this.getHttp().patch(route, data, config));
};

dali.services.Service.prototype.post = function(route, data, config) {
    return this.request(this.getHttp().post(route, data, config));
};

dali.services.Service.prototype.put = function(route, data, config) {
    return this.request(this.getHttp().put(route, data, config));
};

dali.services.Service.prototype.delete = function(route, config) {
    return this.request(this.getHttp().delete(route, config));
};

dali.services.Service.prototype.head = function(route, config) {
    return this.request(this.getHttp().head(route, config));
};

dali.services.Service.prototype.jsonp = function(route, config) {
    return this.request(this.getHttp().jsonp(route, config));
};

dali.services.Service.prototype.request = function(request) {
    var deferred = this.q_.defer();

    request.then(function(response) {
        deferred.resolve(
          new dali.http.HttpResponse(
            response.data,
            response.statusText,
            response.headers,
            response.config
          )
        )

        if (this.autoalert_) {
            dali.services.AlertService
              .getInstance()
              .success(response.statusText + ":" + response.data);
        }

    }, function onError(response) {
        deferred.reject(
          new dali.http.HttpError(
            response.data,
            response.statusText,
            response.headers,
            response.config
          )
        );

        if (this.autoalert_) {
            dali.services.AlertService
              .getInstance()
              .error(status + ":" + data);
        }
    });

    return deferred.promise;

};

dali.services.Service.prototype.alerts = function() {
    return this.alerts_;
};

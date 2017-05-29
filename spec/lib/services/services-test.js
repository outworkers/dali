describe("the Service.js HTTP proxy for Angular should", function() {

  it('convert successful HTTP resonses to dali lib equivalent', inject(function($q, $http, $rootScope) {
    var service = new dali.services.Service();
    service.setServices($q, $http, dali.services.AlertService.getInstance());

    // your test assertion goes here
    var $scope = {};

    /* Code Under Test */
    service.get('http://localhost/foo');

    $httpBackend
     .when('GET', 'http://localhost/foo')
     .respond(200, { foo: 'bar' });

    $httpBackend.flush();

    expect($scope.valid).toBe(true);
    expect($scope.response).toEqual({ foo: 'bar' });
 }));

});

(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name customersApp.controller:CustomersCtrl
   * @description
   * # CustomersCtrl
   */
  angular.module('customersApp')
    .controller('CustomersCtrl', CustomersCtrl);

  /* @ngInject */
  function CustomersCtrl(CustomersService, ErrorStorage, uiGmapGoogleMapApi) {
    var self = this;

    self.defaultMarker = 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png';
    self.greenMarker = 'http://gmapsmarkergenerator.eu01.aws.af.cm/getmarker?scale=1&color=00ff00';
    self.blueMarker = 'http://gmapsmarkergenerator.eu01.aws.af.cm/getmarker?scale=1&color=00ffff';
    self.map = {
      center: {latitude: 0, longitude: 0},
      zoom: 8
    };
    self.errors = ErrorStorage.messages;
    self.customers = CustomersService.customers;
    self.officeLocation = CustomersService.officeLocation;
    self.filterDistance = 100;
    self.centerMapOn = centerMapOn;
    self.distanceLessThen = distanceLessThan;

    uiGmapGoogleMapApi.then(function () {
      centerMapOn(self.officeLocation);
    });

    /**
     * Distance filter for customers list.
     *
     * @param value
     * @returns {Function}
     */
    function distanceLessThan(value) {
      return function (item) {
        return item.distance <= value;
      };
    }

    /**
     * Center map on given point.
     *
     * @param point
     */
    function centerMapOn(point) {
      self.map.center.latitude = point.latitude;
      self.map.center.longitude = point.longitude;
    }
  }
})();

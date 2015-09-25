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
    self.errors = ErrorStorage.messages;
    self.customers = CustomersService.customers;
    self.officeLocation = CustomersService.officeLocation;
    self.filterDistance = 100;
    self.centerOnCustomer = centerOnCustomer;
    self.distanceLessThen = distanceLessThan;

    uiGmapGoogleMapApi.then(function () {
      self.map = {
        center: angular.copy(self.officeLocation),
        zoom: 8
      };
    });

    /**
     * Center map on given customer.
     *
     * @param customer
     */
    function centerOnCustomer(customer) {
      self.map.center = angular.copy(customer.location);
    }

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
  }
})();

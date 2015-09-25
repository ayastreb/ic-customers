(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name customersApp.service:CustomersService
   * @description
   * # CustomersService
   *
   * Parse customers text file data and convert it to usable objects.
   * Calculates distance from office to each customer.
   */
  angular.module('customersApp')
    .service('CustomersService', CustomersService);

  /* @ngInject */
  function CustomersService(TextParserService, DistanceService) {
    var officeLocation = {latitude: 53.3381985, longitude: -6.2592576};
    var customers = [];

    return {
      customers: customers,
      officeLocation: officeLocation,
      fromText: fromText
    };

    /**
     * Populate customers from text.
     *
     * @param {String} text
     */
    function fromText(text) {
      customers.length = 0;
      TextParserService.parseText(text)
        .filter(validate)
        .map(convert)
        .forEach(function (customer) {
          customers.push(customer);
        });
    }

    /**
     * Check that all required fields are present in object.
     *
     * @param object
     * @returns {boolean}
     */
    function validate(object) {
      var isValid = true;
      ['latitude', 'longitude', 'name', 'user_id'].some(function (field) {
        if (!object.hasOwnProperty(field)) {
          isValid = false;
          return true;
        }
      });

      return isValid;
    }

    /**
     * Group latitude and longitude to 'location' property and parse to float for easier use in GoogleMaps.
     * Calculate distance from office to customer location.
     *
     * @param object
     * @returns {{id: (*|number), name: *, location: {latitude: Number, longitude: Number}, distance: Number}}
     */
    function convert(object) {
      var location = {
        latitude: parseFloat(object.latitude),
        longitude: parseFloat(object.longitude)
      };

      return {
        id: object.user_id,
        name: object.name,
        location: location,
        distance: DistanceService.calculate(officeLocation, location)
      };
    }
  }

})();

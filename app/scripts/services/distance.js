(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name customersApp.service:DistanceService
   * @description
   * # DistanceService
   *
   * Geo distance calculation service.
   */
  angular.module('customersApp')
    .service('DistanceService', DistanceService);

  /* @ngInject */
  function DistanceService() {
    var EARTH_RADIUS = 6371;

    return {
      calculate: calculate
    };

    /**
     * Calculate distance between points A an B,
     * using first formula from https://en.wikipedia.org/wiki/Great-circle_distance
     *
     * @param pointA
     * @param pointB
     * @returns {number}
     */
    function calculate(pointA, pointB) {
      validate(pointA);
      validate(pointB);

      var latA = rad(pointA.latitude),
        latB = rad(pointB.latitude),
        dLon = rad(pointA.longitude - pointB.longitude),
        arcLength = Math.acos(
          Math.sin(latA) * Math.sin(latB) +
          Math.cos(latA) * Math.cos(latB) * Math.cos(dLon)
        );

      return Math.round(EARTH_RADIUS * arcLength * 10) / 10;
    }

    /**
     * Convert degree to radians.
     *
     * @param {Number} degree
     * @returns {Number}
     */
    function rad(degree) {
      return degree * (Math.PI / 180);
    }

    /**
     * Check that given point is a valid object with latitude and longitude properties.
     *
     * @param point
     */
    function validate(point) {
      if (typeof point !== 'object') {
        throw new Error('Missing point parameter');
      }
      if (!point.hasOwnProperty('latitude')) {
        throw new Error('Missing latitude');
      }
      if (!point.hasOwnProperty('longitude')) {
        throw new Error('Missing longitude');
      }
    }
  }

})();

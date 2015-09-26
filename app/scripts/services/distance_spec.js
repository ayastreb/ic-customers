(function () {
  'use strict';

  describe('Service: DistanceService', function () {
    var distanceService;

    beforeEach(module('customersApp'));
    beforeEach(inject(function (DistanceService) {
      distanceService = DistanceService;
    }));

    it('throws an error when either of points is missing', function () {
      var bothPointsMissingCall = function () {
          distanceService.calculate();
        },
        pointAmissingCall = function () {
          distanceService.calculate(undefined, {latitude: 53.2, longitude: -6});
        },
        pointBmissingCall = function () {
          distanceService.calculate({latitude: 53.2, longitude: -6});
        };

      expect(bothPointsMissingCall).toThrowError(Error, 'Missing point parameter');
      expect(pointAmissingCall).toThrowError(Error, 'Missing point parameter');
      expect(pointBmissingCall).toThrowError(Error, 'Missing point parameter');
    });

    it('throws an error when latitude or longitude is missing', function () {
      var missingLatitudeCall = function () {
          distanceService.calculate({longitude: -6}, {latitude: 53, longitude: -6});
        },
        missingLongitudeCall = function () {
          distanceService.calculate({latitude: 53, longitude: -6}, {latitude: 53});
        };

      expect(missingLatitudeCall).toThrowError('Missing latitude');
      expect(missingLongitudeCall).toThrowError('Missing longitude');
    });

    it('throws an error when latitude is out of range', function () {
      var latTooLowCall = function () {
          distanceService.calculate({latitude: -100, longitude: 0}, {latitude: 0, longitude: 0});
        },
        latTooHighCall = function () {
          distanceService.calculate({latitude: 0, longitude: 0}, {latitude: 91, longitude: 0});
        };

      expect(latTooLowCall).toThrowError('Invalid latitude. Must be in range of -90 to 90');
      expect(latTooHighCall).toThrowError('Invalid latitude. Must be in range of -90 to 90');
    });

    it('throws an error when longitude is out of range', function () {
      var lonTooLowCall = function () {
          distanceService.calculate({latitude: 53, longitude: -200}, {latitude: 0, longitude: 0});
        },
        lonTooHighCall = function () {
          distanceService.calculate({latitude: 0, longitude: 0}, {latitude: 53, longitude: 181});
        };

      expect(lonTooLowCall).toThrowError('Invalid longitude. Must be in range of -180 to 180');
      expect(lonTooHighCall).toThrowError('Invalid longitude. Must be in range of -180 to 180');
    });

    it('calculates the distance', function () {
      var pointA = {latitude: 53.3381985, longitude: -6.2592576};
      var pointB = {latitude: 52.366037, longitude: -8.179118};

      expect(distanceService.calculate(pointA, pointB)).toEqual(168.2);
    });

  });
})();

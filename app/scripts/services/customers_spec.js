(function () {
  'use strict';

  describe('Service: CustomersService', function () {
    var customersService, distanceServiceMock;

    beforeEach(module('customersApp'));
    beforeEach(function () {
      // we are not testing distance calculation here
      distanceServiceMock = {
        calculate: function () {
          return 0;
        }
      };
      module(function ($provide) {
        $provide.value('DistanceService', distanceServiceMock);
      });

      inject(function ($injector) {
        customersService = $injector.get('CustomersService');
      });
    });

    it('groups lat and long to location object', function () {
      var input = '{"latitude": "52.001", "longitude": "-6.002", "user_id": 10, "name": "John Doe"}';
      customersService.fromText(input);
      expect(customersService.customers).toEqual([
        {id: 10, name: 'John Doe', location: {latitude: 52.001, longitude: -6.002}, distance: 0}
      ]);
    });

    it('skips invalid records from text', function () {
      var input = '{"latitude": "52", "longitude": "-6", "user_id": 10, "name": "John Doe"}\n' +
        '{"missing_fields":"foo"}\n' +
        '{"latitude": "53", "longitude": "-6", "user_id": 11, "name": "Jane Doe"}';

      customersService.fromText(input);
      expect(customersService.customers).toEqual([
        {id: 10, name: 'John Doe', location: {latitude: 52, longitude: -6}, distance: 0},
        {id: 11, name: 'Jane Doe', location: {latitude: 53, longitude: -6}, distance: 0}
      ]);
    });
  });
})();

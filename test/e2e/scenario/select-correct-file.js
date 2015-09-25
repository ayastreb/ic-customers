(function () {
  'use strict';
  var path = require('path');

  describe('Selecting file with customers data', function () {
    beforeEach(function () {
      browser.get('');
    });

    it('should see list of customers sorted by id', function () {
      var fileToUpload = '../data/customers.json',
        absolutePath = path.resolve(__dirname, fileToUpload);
      $('input[type="file"]').sendKeys(absolutePath);

      var customerItemLocator = by.css('a.list-group-item');
      expect(element.all(customerItemLocator).count()).toEqual(2);
      expect(element.all(customerItemLocator).first().getText()).toMatch(/Jane Doe/);;
      expect(element.all(customerItemLocator).last().getText()).toMatch(/John Doe/);;
    });
  });
})();

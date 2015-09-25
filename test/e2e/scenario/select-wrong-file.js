(function () {
  'use strict';
  var path = require('path');

  describe('Selecting file which does not contain any customers JSON data', function () {
    beforeEach(function () {
      browser.get('');
    });

    it('should see error message', function () {
      var fileToUpload = '../data/wrong_file.json',
        absolutePath = path.resolve(__dirname, fileToUpload);
      $('input[type="file"]').sendKeys(absolutePath);
      expect($('div.alert-danger').isPresent()).toBe(true);
    });
  });
})();

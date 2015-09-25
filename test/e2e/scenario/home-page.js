(function () {
  'use strict';

  describe('App home page', function () {
    beforeEach(function () {
      browser.get('');
    });

    it('should see header text', function () {
      expect($('h3.text-header').getText()).toMatch(/Invite your customers!/);
    });

    it('should see file select', function () {
      expect($('span.btn-file').isPresent()).toBe(true);
      expect($('input[type="file"]').isPresent()).toBe(true);
    });
  });
})();

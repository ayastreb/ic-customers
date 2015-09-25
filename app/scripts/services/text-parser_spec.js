(function () {
  'use strict';

  describe('Service: TextParserService', function () {
    var textParserService;

    beforeEach(module('customersApp'));
    beforeEach(inject(function (TextParserService) {
      textParserService = TextParserService;
    }));

    it('throws SyntaxError exception when invalid JSON provided', function () {
      var parseCall = function () {
        textParserService.parseText('{"foo":"broken');
      };
      expect(parseCall).toThrowError(Error);
    });

    it('returns empty array on non-string input', function () {
      expect(textParserService.parseText()).toEqual([]);
      expect(textParserService.parseText(null)).toEqual([]);
    });

    it('parses JSON string into array split by newline', function () {
      var input = '{"foo":"bar"}\n{"bar":"baz"}';
      var output = textParserService.parseText(input);

      expect(output).toEqual([
        {foo: 'bar'},
        {bar: 'baz'}
      ]);
    });

    it('skips empty lines', function () {
      var input = '{"foo":"bar"}\n\n{"bar":"baz"}\n';
      var output = textParserService.parseText(input);

      expect(output).toEqual([
        {foo: 'bar'},
        {bar: 'baz'}
      ]);
    });

  });
})();

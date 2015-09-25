(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name customersApp.service:TextParserService
   * @description
   * # TextParserService
   * Customers text data file parser.
   * Splits the text by new lines and parses each line as JSON.
   */
  angular.module('customersApp')
    .service('TextParserService', TextParserService);

  /* @ngInject */
  function TextParserService() {
    return {
      parseText: parseText
    };

    /**
     * Parse given text into array of objects.
     *
     * @param {String} input
     * @returns {Array}
     * @throws Error
     */
    function parseText(input) {
      if (typeof input !== 'string') {
        return [];
      }

      return input.split('\n')
        .filter(validate)
        .map(parse);
    }

    /**
     * Check if line is a string and not empty.
     *
     * @param {String} line
     * @returns {boolean}
     */
    function validate(line) {
      return typeof line === 'string' && line.length > 0;
    }

    /**
     * Parse single text line.
     *
     * @param {String} line
     * @return {String}
     */
    function parse(line) {
      try {
        return JSON.parse(line);
      } catch (error) {
        throw new Error('Could not parse file. Please, make sure it contains customer data encoded in JSON.');
      }
    }
  }
})();

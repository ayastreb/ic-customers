(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name customersApp.directive:icFileSelect
   * @description
   * # icFileSelect
   *
   * Input file change directive.
   * When file is selected - passes file content to Customers service for processing.
   */
  angular.module('customersApp')
    .directive('icFileSelect', FileSelectDirective);

  /* @ngInject */
  function FileSelectDirective(FileReaderService, CustomersService) {
    return {
      link: FileSelectLink
    };

    function FileSelectLink(scope, element) {
      element.bind('change', onFileChange);

      function onFileChange(event) {
        var file = (event.srcElement || event.target).files[0];

        FileReaderService.readAsText(file).then(CustomersService.fromText);
      }
    }
  }

})();

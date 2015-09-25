(function () {
  'use strict';

  /**
   * Show exceptions as error messages.
   */
  angular.module('customersApp')
    .config(function ($provide) {
      $provide.decorator('$exceptionHandler', ExceptionHandler);
    });

  /* @ngInject */
  function ExceptionHandler(ErrorStorage) {
    return function (exception) {
      ErrorStorage.messages.push(exception.message);
    };
  }
})();

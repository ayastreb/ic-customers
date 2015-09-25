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
      if (exception instanceof Error) {
        ErrorStorage.messages.push(exception.message);
      } else {
        throw exception;
      }
    };
  }
})();

(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name customersApp.service:ErrorStorage
   * @description
   * # ErrorStorage
   *
   * Storage for error messages.
   */
  angular.module('customersApp')
    .service('ErrorStorage', ErrorStorage);

  /* @ngInject */
  function ErrorStorage() {
    return {
      messages: []
    };
  }
})();

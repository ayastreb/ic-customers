(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name customersApp.service:FileReaderService
   * @description
   * # FileReaderService
   * Read selected file as text.
   */
  angular.module('customersApp')
    .service('FileReaderService', FileReaderService);

  /* @ngInject */
  function FileReaderService($q) {
    return {
      readAsText: readAsText
    };

    /**
     * Read given file and return promise.
     * Promise is resolved when file is read successfully, rejected otherwise.
     *
     * @param {Blob} file
     * @returns {promise}
     */
    function readAsText(file) {
      var deferred = $q.defer();
      var reader = new FileReader();

      reader.onload = onLoad;
      reader.onerror = onError;
      reader.readAsText(file);

      return deferred.promise;

      function onLoad() {
        deferred.resolve(reader.result);
      }

      function onError() {
        deferred.reject(reader.result);
      }
    }
  }

})();

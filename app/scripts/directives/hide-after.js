(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name customersApp.directive:icSelfDestruct
   * @description
   * # icSelfDestruct
   *
   * Hide the element after given timeout.
   */
  angular.module('customersApp')
    .directive('icHideAfter', HideAfter);

  /* @ngInject */
  function HideAfter($timeout) {
    return {
      link: HideAfterLink
    };

    function HideAfterLink(scope, element, attrs) {
      $timeout(function () {
        element.hide();
      }, attrs.icHideAfter || 3000);
    }
  }

})();

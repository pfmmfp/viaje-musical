/*global angular*/
'use strict';

angular.module('composer').directive('message', [
  function() {
    return {
      templateUrl: '/modules/core/views/composer/message.directive.html',
      restrict: 'E',
      transclude: true,
      scope: {
        template: '='
      }
    };
  }
]);

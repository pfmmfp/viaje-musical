/*global angular*/
'use strict';

angular.module('composer').factory('AudioContext', ['$window',
function($window) {
  $window.AudioContext = $window.AudioContext || $window.webkitAudioContext;
  return new $window.AudioContext();
}
]);

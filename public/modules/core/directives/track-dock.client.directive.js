/*global angular*/
'use strict';

angular.module('composer').directive('trackDock', ['_', 'composer',
function(_, composer) {
  return {
    templateUrl: '/modules/core/views/composer/track-dock.directive.html',
    restrict: 'E',
    scope: {
      instruments: '=',
      choose: '&onChooseInstrument'
    },
    controller: function($scope, $stateParams, $location) {
      angular.extend($scope, $stateParams, $location, {
        trackList: function() {
          if ($scope.$root.tracks && $scope.$root.tracks[$stateParams.regionName]) return $scope.$root.tracks[$stateParams.regionName];
          if ($scope.tracks) return $scope.tracks;
          console.log("Tracks not loaded!");
          $location.path('regions/'+$stateParams.regionName);
        }
      });
    }
  };
}
]);

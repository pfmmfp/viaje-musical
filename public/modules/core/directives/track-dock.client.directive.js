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
    controller: function($scope, $rootScope, $stateParams, $location) {

      $scope.$on("tracks-loaded", function(){
        $scope.tracks = $scope.$root.tracks[$stateParams.regionName];
        $scope.$apply();
      });

      if($scope.$root.tracks && $scope.$root.tracks[$stateParams.regionName])
        $scope.tracks = $scope.$root.tracks[$stateParams.regionName];
    }
  };
}
]);

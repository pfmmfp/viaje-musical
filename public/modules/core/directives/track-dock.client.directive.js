/*global angular*/
'use strict';

angular.module('composer').directive('trackDock', ['_', 'composer',
function(_, composer) {
  return {
    templateUrl: '/modules/core/views/composer/track-dock.directive.html',
    restrict: 'A',
    scope: {
      instruments: '=',
      choose: '&onChooseInstrument'
    },
    controller: function($scope, $rootScope, $stateParams, $location) {

      $scope.$on("tracks-loaded", function(){
        $scope.tracks = $scope.$root.tracks[$stateParams.regionCode];
        $scope.$apply();
      });

      if($scope.$root.tracks && $scope.$root.tracks[$stateParams.regionCode])
        $scope.tracks = $scope.$root.tracks[$stateParams.regionCode];
    }
  };
}
]);

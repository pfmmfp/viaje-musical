'use strict';

angular.module('composer').directive('trackDock', ['_', 'composer',
	function(_, composer) {
		return {
			templateUrl: '/modules/composer/views/track-dock.client.directive.html',
			restrict: 'E',
			scope: {
				instruments: '=',
				choose: '&onChooseInstrument'
			},
			controller: function($scope, $stateParams) {
				angular.extend($scope, $stateParams, {
					trackList: function() {
						if ($scope.$root.tracks[$stateParams.regionName]) return $scope.$root.tracks[$stateParams.regionName];
						if ($scope.tracks) return $scope.tracks;						
						$scope.tracks = _.map($scope.instruments, function(instrument) {
							return composer.createTrack(instrument.name);
						});
						return $scope.tracks;
					}
				});
			}
		};
	}
]);
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
			controller: function($scope) {
				angular.extend($scope, {
					trackList: function() {
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
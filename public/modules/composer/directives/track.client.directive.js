'use strict';

angular.module('composer').directive('track', ['player', 
	function(player) {
		return {
			templateUrl: '/modules/composer/directives/track.client.directive.html',
			restrict: 'E',
			scope: {
				name: '='
			},
			controller: function($scope) {
				$scope.toggleMute = function(track) {
					track.toggleMute();
				};

			},
			link: function postLink(scope, element, attrs) {
				scope.track = player.createTrack(scope.name);
			}
		};
	}
]);
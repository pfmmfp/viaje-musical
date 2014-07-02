'use strict';

angular.module('composer').controller('ComposerController', ['$scope', 'player',
	function($scope, player) {
		$scope.tracks = ['quena', 'charango', 'chaschas', 'bombo'];

    $scope.play = function() {
      player.play();
    };
    $scope.stop = function() {
      player.stop();
    };
	}
]);
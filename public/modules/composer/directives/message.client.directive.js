'use strict';

angular.module('composer').directive('message', [
	function() {
		return {
			templateUrl: '/modules/composer/views/message.client.directive.html',
			restrict: 'E',
			transclude: true,
			scope: {
				template: '='
			}
		};
	}
]);
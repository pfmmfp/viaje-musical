'use strict';

angular.module('composer').directive('message', [
	function() {
		return {
			templateUrl: '/modules/composer/directives/message.client.directive.html',
			restrict: 'E',
			transclude: true,
			scope: {
				template: '='
			}
		};
	}
]);
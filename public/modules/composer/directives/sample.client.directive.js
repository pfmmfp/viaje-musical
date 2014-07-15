'use strict';

angular.module('composer').directive('sample', [ 
	function() {
		return {
			templateUrl: '/modules/composer/views/sample.client.directive.html',
			restrict: 'E',
			scope: {
				beats: '=',
				instrument: '=',
				file: '='
			},
			link: function postLink(scope, element, attrs) {
				angular.extend(scope, {
					jquiOptions: function() {
						var instrumentName = scope.instrument.toLowerCase();
						console.log(instrumentName);
						return {
							grid: [20, 10],
							revert: 'invalid',
						  helper: 'clone', 
						  snap: '.track.' + instrumentName + ' .track-bar', 
						  snapMode: 'inner', 
						  scope: instrumentName, 
						  cursorAt: { top: 20, left: 5 }
						};
					},
					draggableOptions: function() {
						return {
							// animate: true,
							placeholder: 'keep'
						};
					}
				});
			}
		};
	}
]);
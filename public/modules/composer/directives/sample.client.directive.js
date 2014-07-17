'use strict';

angular.module('composer').directive('sample', ['composer',
	function(composer) {
		return {
			templateUrl: '/modules/composer/views/sample.client.directive.html',
			restrict: 'E',
			scope: {
				instrument: '=',
				sample: '=',
				tracked: '='
			},
			link: function postLink(scope, element, attrs) {
				var instrumentName = scope.instrument.toLowerCase(),
					instrumentTrack = '.track.' + instrumentName + ' .track-bar';
				angular.extend(scope, {
					trackOffset: function() {
						return angular.element(instrumentTrack).offset();
					},
					dragToGrid: function(event, ui) {
						var helper = angular.element(ui.helper),
							offset = scope.trackOffset(),
							gridSize = composer.gridSize,
							magicNumber = scope.tracked ? 0 : 4;
						if (helper.data('grid')) {
							ui.position.left = Math.floor(ui.position.left / gridSize) * gridSize - 
								Math.floor((offset.left - element.offset().left) % gridSize) - magicNumber;
							ui.position.top = scope.trackOffset().top - element.offset().top;
						}
					},
					jquiOptions: function() {
						return {
							revert: 'invalid',
						  helper: scope.tracked ? 'original' : 'clone', 
						  scope: instrumentName, 
						};
					},
					draggableOptions: function() {
						return {
							placeholder: 'keep',
							onDrag: 'dragToGrid'
						};
					}
				});
			}
		};
	}
]);
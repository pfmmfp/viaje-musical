'use strict';

angular.module('composer').directive('trackGrid', ['composer', 
	function(composer) {
		return {
			templateUrl: '/modules/composer/views/track-grid.client.directive.html',
			restrict: 'E',
			scope: {
				track: '='
			},
			link: function postLink(scope, element, attrs) {
				element.find('.track-grid').css('width', composer.grid.beatSize * composer.grid.beats);
				var trackName = scope.track.name.toLowerCase();
				angular.extend(scope, {
					newSample: null,
					disableGrid: function(event, ui) {
						var helper = angular.element(ui.helper);
						helper.data('grid', false);
						helper.addClass('trash-can');
					},
					enableGrid: function(event, ui) {
						var helper = angular.element(ui.helper);
						helper.data('grid', true);
						helper.removeClass('trash-can');
					},
					incomingSample: function(event, ui) {
						var tracked = this.newSample.pos !== undefined,
						  newPos = composer.grid.indexPosition(ui.offset.left, trackName, !tracked);
						if (tracked) {
							scope.track.moveSample(this.newSample, newPos);
						} else {
							scope.track.addSample(this.newSample, newPos);
						}
					},
					droppableOptions: function() {
						return {
							onDrop: 'incomingSample',
							onOver: 'enableGrid',
							onOut: 'disableGrid',
							multiple: true
						};
					},
					jquiOptions: function() {
						return {
							scope: trackName,
							activeClass: 'acceptable-sample',
							hoverClass: 'incoming-sample',
							tolerance: 'touch'
						};
					}
				});
			}
		};
	}
]);
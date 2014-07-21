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
					shouldAcceptSample: function(sample) {
						return true;
					},
					gridOffset: function() {
						return angular.element('.track-grid.'+trackName+' .track-grid-inner').offset();
					},
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
						var magicNumber = 4; //perhaps a jqui bug
						ui.offset.left = ui.offset.left + magicNumber;
						var oldPos = this.newSample.pos;
						var newPos = Math.floor((ui.offset.left - scope.gridOffset().left) / composer.grid.beatSize);
						if (oldPos === undefined) {
							scope.track.addSample(this.newSample, newPos);
						} else {
							scope.track.moveSample(this.newSample, newPos);
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
							tolerance: 'touch',
							accept: scope.shouldAcceptSample
						};
					}
				});
			}
		};
	}
]);
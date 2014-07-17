'use strict';

angular.module('composer').directive('track', ['composer', 
	function(composer) {
		return {
			templateUrl: '/modules/composer/views/track.client.directive.html',
			restrict: 'E',
			scope: {
				instrument: '=',
				choose: '&onChooseInstrument'	
			},
			link: function postLink(scope, element, attrs) {
				scope.track = composer.createTrack(scope.instrument.name);
				var instrumentCode = scope.instrument.name.toLowerCase();
				angular.extend(scope, {
					newSample: null,
					toggleMute: function(track) {
						track.toggleMute();
					},
					shouldAcceptSample: function(sample) {
						return true;
					},
					trackOffset: function() {
						return angular.element('.track.'+instrumentCode+' .track-bar').offset();
					},
					disableGrid: function(event, ui) {
						angular.element(ui.helper).data('grid', false);
					},
					enableGrid: function(event, ui) {
						angular.element(ui.helper).data('grid', true);
					},
					incomingSample: function(event, ui) {
						var magicNumber = 9; //perhaps a jqui bug
						ui.offset.left = ui.offset.left + magicNumber;
						var oldPos = this.newSample.pos;
						var newPos = Math.floor((ui.offset.left - scope.trackOffset().left) / composer.gridSize);
						if (oldPos === undefined) {
							this.track.addSample(this.newSample, newPos);
						} else {
							this.track.moveSample(this.newSample, newPos);
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
							scope: instrumentCode,
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
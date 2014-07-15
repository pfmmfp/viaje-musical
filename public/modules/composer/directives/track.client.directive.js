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
				angular.extend(scope, {
					newSample: null,
					toggleMute: function(track) {
						track.toggleMute();
					},
					shouldAcceptSample: function(sample) {
						return true;
					},
					addSample: function() {
						this.track.addSample(this.newSample);
					},
					droppableOptions: function() {
						return {
							onDrop: 'addSample',
							multiple: true
						};
					},
					jquiOptions: function() {
						return {
							scope: scope.instrument.name.toLowerCase(),
							activeClass: 'acceptable-sample',
							hoverClass: 'incoming-sample',
							tolerance: 'fit',
							accept: scope.shouldAcceptSample
						};
					}
				});
			}
		};
	}
]);
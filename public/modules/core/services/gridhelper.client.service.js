'use strict';

angular.module('composer').factory('GridHelper', [
	function() {

		return {
      beatSize: 25, //px
      beats: 270,
      snappedPosition: function(pos) {
      	return Math.floor(pos / this.beatSize) * this.beatSize;
      },
      indexPosition: function(pos, instrument, delta) {
      	return Math.floor(
      		(
	      		pos - 
	      		this.offset(instrument).left + 
	      		(delta ? this.originDelta(instrument) : 0)
      		) / this.beatSize
    		);
      },
      offset: function(instrument) {
      	return angular.element('.track-grid.' + instrument + ' .track-grid-inner').offset();
      },
      originDelta: function(instrument) {
				var originOffset = angular.element('.sample-list').offset();
      	return Math.floor((this.offset(instrument).left - originOffset.left) % this.beatSize);
      }
    };
	}
]);
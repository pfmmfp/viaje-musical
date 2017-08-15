/*global angular*/
'use strict';

angular.module('core').controller('ComposerController', ['$scope', '$rootScope', '$stateParams', '$interval', '_', 'composer', '$window', 'Tracks', 'AmbientMusic',
	function($scope, $rootScope, $stateParams, $interval, _, composer, $window, Tracks, AmbientMusic) {

  AmbientMusic.stop();

	var regionCode = $stateParams.regionCode;
	var tracks = Tracks[regionCode].tracks;
	var regionComposer = composer.get(regionCode);
  if( !$rootScope.tracks ){
    $rootScope.tracks = [];
    if(tracks.length > 0){
      $rootScope.tracks[regionCode] = _.map(tracks, function(track){
        return regionComposer.createTrack(track.name, track.samples, track.sampleComposition);
      });
    }
  }

  var maxBeats = 48;

  angular.extend($scope, {
    regionCode : regionCode,
    instruments : tracks,
    selectedInstrument: tracks[0],
    maxPage: null,
    startSample: null,
    nextSample: null,
    prevSample: [],
    changeInstrument: function(instrument) {
      $scope.prevSample.length = 0;
      $scope.startSample = null;
      $scope.selectedInstrument = instrument;
    },
    play: function () {
      regionComposer.play();
      this.updateCursor();
      // move interval to service and attach to events
      this.intervalRef = $interval(this.updateCursor, 60 / 96);
    },
    stop: function() {
      $interval.cancel(this.intervalRef);
      regionComposer.stop();
      this.updateCursor();
    },
    updateCursor: function() {
      var grid = angular.element('.track-grids'),
        cursor = angular.element(".timeline-cursor"),
        position = regionComposer.playProgress(),
        scrollMargin = 50;
      cursor.css('left', position + 'px');
      if (position > grid.width() + grid.scrollLeft() - scrollMargin)
        grid.scrollLeft(grid.scrollLeft() + 100);
      if (position < grid.scrollLeft())
        grid.scrollLeft(position);
    },
    closeMessage: function() {
      $scope.messageTemplate = null;
    },
    templateName : function(messageTemplate) {
      return messageTemplate ? messageTemplate + '.html' : null;
    },
    confirmNew : function() {
      $scope.messageTemplate = 'new';
    },
    confirmExample : function() {
      $scope.messageTemplate = 'example';
    },
    loadExample: function() {
      regionComposer.loadExample();
      $scope.closeMessage();
    },
    new: function() {
      regionComposer.cleanUp();
      $scope.closeMessage();
    },
    wipe : function() {
      $scope.messageTemplate = 'wipe';
    }
  });
}]);

/*global angular*/
'use strict';

angular.module('core').controller('ComposerController', ['$scope', '$rootScope', '$stateParams', '$interval', '_', 'composer', '$window', 'Tracks',
	function($scope, $rootScope, $stateParams, $interval, _, composer, $window, Tracks) {

  if($rootScope.music){
    $rootScope.music.stopAll();
    $rootScope.music = null;
  }


  if( !$rootScope.tracks ){
    $rootScope.tracks = [];
    var tracks = Tracks.byRegion( $stateParams.regionName );
    if(tracks.length > 0){
      $rootScope.tracks[$stateParams.regionName] = _.map(tracks, function(track){
        return composer.createTrack(track.name);
      });
    }
  }

  var maxBeats = 48;

  angular.extend($scope, {
    regionName : $stateParams.regionName,
    instruments : Tracks.byRegion( $stateParams.regionName ),
    selectedInstrument: Tracks[0],
    maxPage: null,
    startSample: null,
    nextSample: null,
    prevSample: [],
    changeInstrument: function(instrument) {
      $scope.prevSample.length = 0;
      $scope.startSample = null;
      $scope.selectedInstrument = instrument;
    },
    activeSamples: function() {
      var beatsSum,
        samples = $scope.selectedInstrument.samples,
        pageComplete = false;
      $scope.nextSample = null;
      if ($scope.startSample) samples = samples.slice(samples.indexOf($scope.startSample));
      var activeSamples = _.reduce(samples, function(memo, sample) {
        if (pageComplete) return memo;
        beatsSum = _.reduce(memo, function(m, s) { return m + s.beats; }, 0);
        if (beatsSum < maxBeats && beatsSum + sample.beats <= maxBeats) return memo.concat(sample);
        pageComplete = true;
        $scope.nextSample = sample;
        return memo;
      }, []);
      return activeSamples;
    },
    prevPage: function() {
      if ($scope.startSample) {
        $scope.nextSample = $scope.startSample;
        $scope.startSample = $scope.prevSample.pop();
      }
    },
    nextPage: function() {
      if ($scope.nextSample) {
        $scope.prevSample.push($scope.startSample);
        $scope.startSample = $scope.nextSample;
      }
    },
    play: function () {
      composer.play();
      this.updateCursor();
      // move interval to service and attach to events
      this.intervalRef = $interval(this.updateCursor, 60 / 96);
    },
    stop: function() {
      $interval.cancel(this.intervalRef);
      composer.stop();
      this.updateCursor();
    },
    updateCursor: function() {
      var grid = angular.element('.track-grids'),
        cursor = angular.element(".timeline-cursor"),
        position = composer.playProgress(),
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
      composer.loadExample();
      $scope.closeMessage();
    },
    new: function() {
      composer.cleanUp();
      $scope.closeMessage();
    },
    wipe : function() {
      $scope.messageTemplate = 'wipe';
    }
  });
}]);

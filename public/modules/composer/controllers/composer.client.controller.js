'use strict';

angular.module('composer').controller('ComposerController', ['$scope', '$interval', '_', 'composer', 
	function($scope, $interval, _, composer) {
    angular.extend($scope, {
      instruments : composer.tracksConfig,
      selectedInstrument: composer.tracksConfig[0],
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
        var maxBeats = 72,
          beatsSum,
          samples = $scope.selectedInstrument.samples,
          pageComplete = false;
        $scope.nextSample = null;
        if ($scope.startSample) samples = samples.slice(samples.indexOf($scope.startSample));
        var activeSamples = _.reduce(samples, function(memo, sample) {
          if (pageComplete) return memo;
          beatsSum = _.reduce(memo, function(m, s) { return m + s.beats }, 0);
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
        this.intervalRef = $interval(this.updateCursor, 60 / 96);
      },
      stop: function() {
        $interval.cancel(this.intervalRef);
        composer.stop();
        this.updateCursor();
      },
      updateCursor: function() {
        angular.element(".timeline-cursor").css('left', composer.playProgress() + 'px');
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
	}
]);
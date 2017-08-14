/*global angular*/
'use strict';

angular.module('core').factory('fxAudioFactory', ['$window', '$http', '$q', function($window, $http, $q) {
  $window.AudioContext = $window.AudioContext || $window.webkitAudioContext;
  var audioContext = new $window.AudioContext();
  var gainNode = audioContext.createGain();
  gainNode.connect(audioContext.destination);

  var AudioHandler = {
    audioContext: audioContext,
    gainNode: gainNode,
    samplesBuffer: {},
    samples: {},
    loadSamples: function(samples) {
      var promises = [];

      angular.forEach(samples, function(audioObj) {
        if (!AudioHandler.samplesBuffer[audioObj.key]) {
          promises.push(getSampleBuffer(audioObj.path, audioObj.key));
        }
      });

      return $q.all(promises);

    },
    play: function(key, options) {
      var startAt = 0;
      if (AudioHandler.samples[key] === undefined || !AudioHandler.samples[key].playing) {
        var source = AudioHandler.audioContext.createBufferSource();
        source.buffer = AudioHandler.samplesBuffer[key];
        source.connect(AudioHandler.gainNode);

        if (options) {
          if (options.loop)
            source.loop = options.loop;
          if (options.loopStart)
            source.loopStart = options.loopStart;
          if (options.loopEnd)
            source.loopEnd = options.loopEnd;
          if (options.startAt)
            startAt = options.startAt;
        }

        AudioHandler.samples[key] = {
          options: options,
          audio: source,
          playing: true
        };

        AudioHandler.samples[key].audio.start(startAt);
      } else {
        if (!AudioHandler.samples[key].playing)
          AudioHandler.samples[key].audio.start(startAt);
      }

    },
    stop: function(key) {
      if (AudioHandler.samples[key]) {
        AudioHandler.samples[key].audio.stop();
        AudioHandler.samples[key].playing = false;
      } else
        console.log("sample not found");
    },
    stopAll: function() {
      for (var key in AudioHandler.samples) {
        if (AudioHandler.samples.hasOwnProperty(key)) {
          AudioHandler.stop(key);
        }
      }
    }
  };

  function getSampleBuffer(path, key) {
    return $http({
      method: 'GET',
      url: path,
      responseType: 'arraybuffer'
    }).then(function success(response) {
      var defer = $q.defer();
      AudioHandler.audioContext.decodeAudioData(response.data, function(buffer) {
          AudioHandler.samplesBuffer[key] = buffer;
          defer.resolve();
        },
        function(err) {
          defer.reject();
        });
      return defer.promise;
    }, function(err) {
      console.log("fxAudio error");
      console.log(err);
    });
  }

  return AudioHandler;
}]);

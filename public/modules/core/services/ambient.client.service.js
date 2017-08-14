/*global angular*/
'use strict';

angular.module('core').factory('AmbientMusic', ['fxAudioFactory', function(fxAudioFactory) {
  var samples = [{
      key: 'fxMapa',
      path: 'common/audio/home/fx_mapa.ogg'
    },
    {
      key: 'music',
      path: 'common/audio/home/ambient.ogg'
    }
  ];

  var AmbientMusic = {
    muted: false,
    toggle: function() {
      this.muted = !this.muted;
      if (!this.muted) {
        this.play();
      } else {
        this.stop();
      }
    },
    play: function() {
      if (this.muted) return;
      fxAudioFactory.loadSamples(samples).then(function() {
        fxAudioFactory.play('fxMapa', {
          loop: true,
          loopStart: 0,
          loopEnd: 1000
        });
        fxAudioFactory.play('music', {
          loop: true,
          loopStart: 0,
          loopEnd: 1000
        });
      });
    },
    stop: function() {
      fxAudioFactory.stop('fxMapa');
      fxAudioFactory.stop('music');
    }

  };

  return AmbientMusic;
}]);

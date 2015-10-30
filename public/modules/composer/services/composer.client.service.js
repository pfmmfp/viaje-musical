'use strict';

angular.module('composer').factory('composer', ['_', 'TracksConfig', 'AudioContext', '$rootScope', 'GridHelper',
	function(_, TracksConfig, audioContext, $rootScope, GridHelper) {

		var SampleTrack = function(name, sampleRefs, sampleComposition, manager) {
			this.name = name;
	    this.sampleRefs = sampleRefs;
      this.sampleComposition = sampleComposition;
      this.manager = manager;
	    this.samples = {};
	    this.loadSamples();
	    this.samplesBuffer = [];
	    this.sourcesBuffer = [];
	    this.playing = false;
      this.gainNode = audioContext.createGain();
      this.gainNode.connect(audioContext.destination);
	  };

	  SampleTrack.prototype.loadSamples = function() {
      //console.log(this.sampleRefs);
      
	    angular.forEach(this.sampleRefs, function(sampleRef) {
	      var request = new XMLHttpRequest();
	      var url = '/modules/composer/audio/samples/' + sampleRef.file + '.mp3';
	      request.open('GET', url, true);
	      request.responseType = 'arraybuffer';
	      request.onload = this.storeSample.bind(this, sampleRef.file, request);
	      request.send();
	    }, this);
	  };

	  SampleTrack.prototype.storeSample = function(sample, request) {
	    var $this = this;
	    audioContext.decodeAudioData(request.response, function(buffer) {
	      $this.samples[sample] = buffer;
	      if (Object.keys($this.samples).length === $this.sampleRefs.length) {
          $this.manager.onTrackLoaded();
	      }
	    }, function() { console.log("Error decoding sample ", sample); }); 
	  };

	  SampleTrack.prototype.empty = function() {
	    this.samplesBuffer = [];
	  };

	  SampleTrack.prototype.soundSample = function(sample) {
	    this.createNode(this.samples[sample]).start(0);    
	  };

	  SampleTrack.prototype.createNode = function(buffer) {
	    var source = audioContext.createBufferSource();
	    source.buffer = buffer;
	    source.connect(this.gainNode);       
	    return source;
	  };  

	  SampleTrack.prototype.createSource = function(sampleBuffer) {
	    return { 
        pos: sampleBuffer.pos,
	      beats: sampleBuffer.beats,
	      source: this.createNode(sampleBuffer.buffer)
	    };
	  };

	  SampleTrack.prototype.removeSample = function(sample) {
	    this.samplesBuffer.splice(this.samplesBuffer.indexOf(sample), 1);
	  };

    SampleTrack.prototype.moveSample = function(sample, newPos) {
      var sampleToMove = _.find(this.samplesBuffer, function(sampleBuffer) {
        return (sample.file === sampleBuffer.file && 
          sample.pos === sampleBuffer.pos);
      });
      sampleToMove.pos = newPos;
    };

	  SampleTrack.prototype.addSample = function(sample, position) {
	    this.samplesBuffer.push({
	      beats: sample.beats,
        file: sample.file,
        group: sample.group,
	      buffer: this.samples[sample.file],
        pos: position
	    });
	    return sample.beats;
	  };

	  SampleTrack.prototype.toggleMute = function() {
      this.gainNode.gain.value = this.isMute() ? 1 : 0;
	  };

    SampleTrack.prototype.isMute = function() {
      return this.gainNode.gain.value === 0;
    };

    SampleTrack.prototype.duration = function() {
      var last = this.lastSourcesBuffer();
      return (last.pos + last.beats) * this.manager.beat;
    };

    SampleTrack.prototype.lastSourceBuffer = function() {
      return _.max(this.sourcesBuffer, function(sourceBuffer) {
        return sourceBuffer.pos;
      });
    };

    SampleTrack.prototype.stop = function() {
      if (this.playing) {
        angular.forEach(this.sourcesBuffer, function(sourceBuffer) {
          sourceBuffer.source.stop(0);
        });
        this.playing = false;
      }
    };

	  SampleTrack.prototype.play = function() {
	    if (!this.playing && !_.isEmpty(this.samplesBuffer)) {
	      this.sourcesBuffer = this.samplesBuffer.map(function(sampleBuffer) {
	        return this.createSource(sampleBuffer);
	      }, this);
        this.lastSourceBuffer().source.onended = function() { this.playing = false; }.bind(this);
	      angular.forEach(this.sourcesBuffer, function(sourceBuffer) {
	        sourceBuffer.source.start(this.manager.playTime + sourceBuffer.pos * this.manager.beat);
	      }, this);   
        this.playing = true;
      }   
	  };


    var TrackManager = function() {
      this.tracks = [];
      this.tempo = 96; // BPM (beats per minute)
      this.beat = 60 / this.tempo; // negra
      this.playTime = null;
      this.playOffset = 0.1;
      this.loadedTracks = 0;
    };

    angular.extend(TrackManager.prototype, {
      createTrack: function(name, samples, sampleComposition) {
        var newSampleTrack = new SampleTrack(name, samples, sampleComposition, this);
        this.tracks.push(newSampleTrack);
        return newSampleTrack;
      },
      duration: function() {
        return _.max(this.tracks, function(track) { return track.duration(); }).duration();
      },
      playProgress: function() {
        if(!this.isPlaying()) return 0;
        return (audioContext.currentTime - this.playTime) / this.beat;
      },
      play: function() {
        if (!this.isPlaying()) {
          this.playTime = audioContext.currentTime + this.playOffset;
          angular.forEach(this.tracks, function(track) { track.play(); });
        }
      },
      stop: function() {
        if (this.isPlaying())
          angular.forEach(this.tracks, function(track) { track.stop(); });
      },
      isPlaying: function() {
        return _.some(this.tracks, function(track) { return track.playing; });
      },
      cleanUp: function() {
        angular.forEach(this.tracks, function(track) { track.empty(); });        
      },
      onTrackLoaded: function() {
        this.loadedTracks++;
        if(this.loadedTracks === this.tracks.length) {
          $rootScope.$broadcast('tracks-loaded');
          console.log("tracks loaded");
        }
      },
      loadExample: function() {
        angular.forEach(this.tracks, function(track) { 
          track.empty(); 
          angular.forEach(track.sampleComposition, function(sample) {
            var sampleRef = _.findWhere(track.sampleRefs, { file: sample.file });
            track.addSample(sampleRef, sample.pos);
          });
        });        
      }
    });

    var trackManager = new TrackManager();

		return {
			tracksConfig: TracksConfig,
      grid: GridHelper,
			createTrack: function(name) {
        var instrument = this.tracksConfig.byName(name);
        return trackManager.createTrack(name, 
          instrument.samples, instrument.sampleComposition);
			},
      playProgress: function() {
        return trackManager.playProgress() * this.grid.beatSize;
      },
      loadExample: trackManager.loadExample.bind(trackManager),
			play: trackManager.play.bind(trackManager),
      stop: trackManager.stop.bind(trackManager),
      cleanUp: trackManager.cleanUp.bind(trackManager)
		};
	}
]);
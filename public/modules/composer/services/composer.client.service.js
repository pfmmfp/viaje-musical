'use strict';

angular.module('composer').factory('composer', ['$window', '_',
	function($window, _) {

	  $window.AudioContext = $window.AudioContext || $window.webkitAudioContext;
	  var audioContext = new $window.AudioContext();


		var SampleTrack = function(name, sampleRefs) {
			this.name = name;
	    this.sampleRefs = sampleRefs;
	    this.samples = {};
	    this.loadSamples();
	    this.samplesBuffer = [];
	    this.sourcesBuffer = [];
	    this.playing = false;
	  };

	  SampleTrack.prototype.loadSamples = function() {
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
	        console.log("All samples retrieved! ", $this.sampleRefs[0]);
	        // TODO trigger event       
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
	    source.connect(audioContext.destination);       
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
	    sample = this.samples[sample];
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
	      buffer: this.samples[sample.file],
	      file: sample.file,
        pos: position
	    });
	    return sample.beats;
	  };

	  SampleTrack.prototype.duration = function() {
	    return _.reduce(this.samplesBuffer, function(memo, sample) {
	      return memo + sample.duration;
	    }, 0);
	  };  

	  SampleTrack.prototype.toggleMute = function() {
	    // TODO
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
	    if (!this.playing) {
	      this.sourcesBuffer = this.samplesBuffer.map(function(sampleBuffer) {
	        return this.createSource(sampleBuffer);
	      }, this);
	      var time = audioContext.currentTime + 0.1;
	      var tempo = 96; // BPM (beats per minute)
	      var beat = (60 / tempo); // negra
	      angular.forEach(this.sourcesBuffer, function(sourceBuffer) {
	        sourceBuffer.source.start(time + sourceBuffer.pos * beat);
	        // time += sourceBuffer.beats * beat;
	      });   
        this.playing = true;
      }   
	  };


    var Player = function() {
      this.tracks = [];
      this.playing = false;
    };

    angular.extend(Player.prototype, {
      createTrack: function(name, samples) {
        var newSampleTrack = new SampleTrack(name, samples);
        this.tracks.push(newSampleTrack);
        return newSampleTrack;
      },
      play: function() {
        angular.forEach(this.tracks, function(track) { track.play(); });
      },
      stop: function() {
        angular.forEach(this.tracks, function(track) { track.stop(); });
      },
      cleanUp: function() {
        angular.forEach(this.tracks, function(track) { track.empty(); });        
      }
    });

    var player = new Player();

	  // Samples config
    var tracksConfig = [{
        name: 'Quena',
        samples: [
          { beats: 2, file: 'Quena-2T-Cel5-06' },
          { beats: 4, file: 'Quena-4T-Final-A' },
        ],
        sampleComposition: []
      },
      {
        name: 'Charango',
        samples: [
          { beats: 1, file: 'Char-1T-Am' },
          { beats: 2, file: 'Char-2T-Am' },
          { beats: 3, file: 'Char-3T-E7' },
				],
        sampleComposition: []
      },
      {
        name: 'Chaschas',
        samples: [
          { beats: 4, file: 'Chas-4T-01' },
          { beats: 4, file: 'Chas-4T-02' },
          { beats: 4, file: 'Chas-4T-03' },
        ],
        sampleComposition: []
      },
      {
        name: 'Bombo',
        samples: [
          { beats: 4, file: 'Bombo-4T-01' },
          { beats: 4, file: 'Bombo-4T-02' },
          { beats: 4, file: 'Bombo-4T-03' },
          { beats: 4, file: 'Bombo-4T-04' }
        ],
        sampleComposition: []
      }
    ];

		return {
			tracksConfig: tracksConfig,
      gridSize: 20,
			createTrack: function(name) {
				var track = _.find(tracksConfig, function(track) { return track.name === name });
        return player.createTrack(name, track.samples);
			},
			play: player.play.bind(player),
      stop: player.stop.bind(player),
      cleanUp: player.cleanUp.bind(player)
		};
	}
]);

'use strict';

angular.module('core').factory('fxAudioFactory', [ function()
{

/*	function audioHandler = function init()
	{
		this.audioContext = new AudioContext();
        this.gainNode = self.audioContext.createGain();
		this.gainNode.connect( this.audioContext.destination );
		this.samplesBuffer = [];
		this.samples = [];
	}

	audioHandler.prototype.loadSamples = function(samples, next)
	{
		var self = this;
		
		var samplesToLoad = samples.length;
		var samplesLoaded = 0;

		angular.forEach(samples, function(audioObj)
		{
			self.getSampleBuffer(audioObj.path, audioObj.key, function(err, buffer)
			{
				if(err)
				{
					console.log("error loading sample");
					return(err);
				}
				else
				{
					self.samplesBuffer[audioObj.key] = buffer;
					samplesLoaded++;
					
					if(samplesLoaded == samplesToLoad)
						return next(null, sefl.samplesBuffer);
				}					
			})
		});
	}

	audioHandler.prototype.getSampleBuffer = function(path, key, next)
	{
		var self = this;
        var request = new XMLHttpRequest();
        request.open('GET', path, true);
        request.responseType = 'arraybuffer';
        request.onload = function playAudio()
        {   
            self.audioContext.decodeAudioData(request.response, function getAudioBuffer(buffer)
            {
                console.log("sample loaded")
                return next(null, buffer);
            }, 
            function playAudioError(err){ 
            	console.log("error loading sample"); 
            	return next(err); 
            });
        });
	};	


	audioHandler.prototype.play = function(key, options)
	{
		var self = this;
		var startAt = 0;

        var source = self.audioContext.createBufferSource();
            source.buffer = self.samplesBuffer[key];
            source.connect(self.gainNode);       

        if(options) 
        {	
        	if(options.loop)
        		source.loop = options.loop;
        	if(options.loopStart)
        		source.loopStart = options.loopStart;
        	if(options.loopEnd)
        		source.loopEnd = options.loopEnd;        		        	
        	if(options.startAt)
        		startAt = options.startAt;
        }		
        
        self.samples[key] = source;
        self.samples[key].start(startAt);
	}

	audioHandler.prototype.stop = function(key)
	{
		if(self.samples[key])
			self.samples[key].stop();
		else
			console.log("sample not found");
	}
	*/
	return new AudioContext();
}]);


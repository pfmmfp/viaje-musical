
'use strict';

angular.module('core').factory('fxAudioFactory', ['$window', function($window)
{

	function AudioHandler()
	{
		var self = this;
		$window.AudioContext = $window.AudioContext || $window.webkitAudioContext;
		self.audioContext = new $window.AudioContext();
        self.gainNode = self.audioContext.createGain();
		self.gainNode.connect( self.audioContext.destination );
		self.samplesBuffer = [];
		self.samples = [];
	}

	AudioHandler.prototype.loadSamples = function(samples, next)
	{
		var self = this;

		var samplesToLoad = samples.length;
		var samplesLoaded = 0;

		angular.forEach(samples, function(audioObj)
		{
			if( self.samplesBuffer[audioObj.key])
			{	
				samplesLoaded++;
				if(samplesLoaded === samplesToLoad)
					return next(null, self.samplesBuffer);
			}			
			else
			{
				console.log('loading ', audioObj);
				self.getSampleBuffer(audioObj.path, audioObj.key, function(err, buffer)
				{
					if(err)
					{
						console.log("error loading sample");
						return  next(err);
					}
					else
					{
						self.samplesBuffer[audioObj.key] = buffer;
						samplesLoaded++;
						console.log(samplesLoaded, samplesToLoad);
						if(samplesLoaded === samplesToLoad)
							return next(null, self.samplesBuffer);
					}					
				});
			}		
		});
	};

	AudioHandler.prototype.getSampleBuffer = function(path, key, next)
	{
		var self = this;
        var request = new XMLHttpRequest();
        request.open('GET', path, true);
        request.responseType = 'arraybuffer';
        request.onload = function playAudio()
        {   
            self.audioContext.decodeAudioData(request.response, function getAudioBuffer(buffer)
            {
                console.log("sample loaded");
                return next(null, buffer);
            }, 
            function playAudioError(err){ 
            	console.log("error loading sample"); 
            	return next(err); 
            });
        };
        request.send();
	};	


	AudioHandler.prototype.play = function(key, options)
	{
		var self = this;
		var startAt = 0;

		if(!self.samples[key] || !self.samples[key].playing)
		{
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
	        
	        self.samples[key] = { 
	        	options : options,
	        	audio   : source,
	        	playing : true  
	        };
			
			self.samples[key].audio.start(startAt);	
	    }
	    else
	    {
	    	console.log(self.samples[key]);

	    	if(!self.samples[key].playing)
	    		self.samples[key].audio.start(startAt);	
	    }	
        
	};

	AudioHandler.prototype.stop = function(key)
	{
		var self = this;

		if(self.samples[key])
		{
			self.samples[key].audio.stop();
			self.samples[key].audio.playing = false;
		}
		else
			console.log("sample not found");
	};
	

	AudioHandler.prototype.stopAll = function()
	{
		var self = this;		

		for (var key in self.samples) {
		   if (self.samples.hasOwnProperty(key)) {		
				self.samples[key].audio.stop();
				self.samples[key].playing = false;
		   }
		}  	

		console.log("All samples stoped");
	};
	
	return new AudioHandler();
}]);


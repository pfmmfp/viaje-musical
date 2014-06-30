'use strict';

angular.module('instruments').controller('InstrumentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Instruments', 'fileupload', 'ngAudio',
	function($scope, $stateParams, $location, Authentication, Instruments, fileupload, ngAudio) {
		$scope.authentication = Authentication;
		
		var PUBLIC_IMAGE_PATH = 'common/images/instrument/';
		var PUBLIC_AUDIO_PATH = 'common/audio/instrument/';
		
		//////////////// CREATE INSTRUMENT ////////////////
		$scope.create = function() {
			var picList = [];
			$scope.picList.forEach(function (pic, index) {	
				picList.push(pic.name); 
			});				

			var audioList = [];
			$scope.audioList.forEach(function (audio, index) {	
				audioList.push(audio.name); 
			});				
						
			var instrument = new Instruments({
				name: this.name,
				description: this.description,
				pics: picList,
				audio: audioList,
			});
			
			instrument.$save(function(response) {
				$location.path('admin/instruments/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			this.name = '';
			this.description = '';
		};
		
		//////////////// DELETE INSTRUMENT ////////////////
		$scope.remove = function(instrument) {
			if (instrument) {
				instrument.$remove();

				for (var i in $scope.instruments) {
					if ($scope.instruments[i] === instrument) {
						$scope.instruments.splice(i, 1);
					}
				}
			} else {
				$scope.instrument.$remove(function() {
					$location.path('admin/instruments');
				});
			}
		};
		
		//////////////// EDIT INSTRUMENT ////////////////
		$scope.update = function() {
			var instrument = $scope.instrument;

			var picList = [];
			$scope.picList.forEach(function (pic, index) {	
				picList.push(pic.name); 
			});				
			
			instrument.pics = picList;
			
			var audioList = [];
			$scope.audioList.forEach(function (audio, index) {	
				audioList.push(audio.name); 
			});				
			
			instrument.audio = audioList;
			
			instrument.$update(function() {
				$location.path('admin/instruments/' + instrument._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		//////////////// LIST INSTRUMENT ////////////////
		$scope.find = function() {
			$scope.instruments = Instruments.query();
		};

		//////////////// VIEW INSTRUMENT ////////////////
		$scope.findOne = function() {
			var Instrument = Instruments.get({ instrumentId: $stateParams.instrumentId }, function()
			{
				var picList   = [];
				var audioList = [];
				$scope.instrument = Instrument;
				
				Instrument.pics.forEach(function( pic, index ) {
					var picFullData = {'path': PUBLIC_IMAGE_PATH + Instrument._id + '/', 'name': pic};
					picList.push( picFullData );
				});			
				$scope.picList = picList;				
				
				Instrument.audio.forEach(function( audio, index ) {
					var audioFullData = {'path': PUBLIC_AUDIO_PATH + Instrument._id + '/', 'name': audio};
					audioList.push( audioFullData );
				});			
				$scope.audioList = audioList;				
				
			});
		};
		
		//////////////// FileUpload ////////////////
		$scope.audioList = [];
		$scope.picList 	 = [];
		$scope.picPercent   = {value: parseInt(0), set: function(value){ this.value = value; }};
		$scope.audioPercent = {value: parseInt(0), set: function(value){ this.value = value; }};

		$scope.removeFile = function($file, type)
		{
			if(type === 'image')
				$scope.picList.splice($scope.picList.indexOf( $file ), 1);	
			
			if(type === 'audio')
				$scope.audioList.splice($scope.audioList.indexOf( $file ), 1);	
		};
								
		$scope.onFileSelect = function($files, type)
		{
			for (var i = 0; i < $files.length; i++) {
				var upl = fileupload.upload($files[i]);	
				if(type === 'image')
				{
					fileupload.progress(upl, $scope.picPercent);				
					fileupload.success(upl, $scope.picList);		
				}
				
				if(type === 'audio')
				{
					fileupload.progress(upl, $scope.audioPercent);				
					fileupload.success(upl, $scope.audioList);						
				}	
			}
		};
	}
]);

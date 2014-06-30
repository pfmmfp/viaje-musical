'use strict';

angular.module('genres').controller('GenresController', ['$scope', '$stateParams', '$location', 'Authentication', 'Genres', 'fileupload', 'ngAudio',
	function($scope, $stateParams, $location, Authentication, Genres, fileupload, ngAudio) {
		$scope.authentication = Authentication;
		
		var PUBLIC_IMAGE_PATH = 'common/images/genre/';
		var PUBLIC_AUDIO_PATH = 'common/audio/genre/';
		
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
						
			var genre = new Genres({
				name: this.name,
				description: this.description,
				pics: picList,
				audio: audioList,
			});
			
			genre.$save(function(response) {
				$location.path('admin/genres/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			this.name = '';
			this.description = '';
		};
		
		//////////////// DELETE INSTRUMENT ////////////////
		$scope.remove = function(genre) {
			if (genre) {
				genre.$remove();

				for (var i in $scope.genres) {
					if ($scope.genres[i] === genre) {
						$scope.genres.splice(i, 1);
					}
				}
			} else {
				$scope.genre.$remove(function() {
					$location.path('admin/genres');
				});
			}
		};
		
		//////////////// EDIT INSTRUMENT ////////////////
		$scope.update = function() {
			var genre = $scope.genre;

			var picList = [];
			$scope.picList.forEach(function (pic, index) {	
				picList.push(pic.name); 
			});				
			
			genre.pics = picList;
			
			var audioList = [];
			$scope.audioList.forEach(function (audio, index) {	
				audioList.push(audio.name); 
			});				
			
			genre.audio = audioList;
			
			genre.$update(function() {
				$location.path('admin/genres/' + genre._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		//////////////// LIST INSTRUMENT ////////////////
		$scope.find = function() {
			$scope.genres = Genres.query();
		};

		//////////////// VIEW INSTRUMENT ////////////////
		$scope.findOne = function() {
			var Genre = Genres.get({ genreId: $stateParams.genreId }, function()
			{
				var picList   = [];
				var audioList = [];
				$scope.genre = Genre;
				
				Genre.pics.forEach(function( pic, index ) {
					var picFullData = {'path': PUBLIC_IMAGE_PATH + Genre._id + '/', 'name': pic};
					picList.push( picFullData );
				});			
				$scope.picList = picList;				
				
				Genre.audio.forEach(function( audio, index ) {
					var audioFullData = {'path': PUBLIC_AUDIO_PATH + Genre._id + '/', 'name': audio};
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

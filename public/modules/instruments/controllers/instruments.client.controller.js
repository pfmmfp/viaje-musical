'use strict';

angular.module('instruments').controller('InstrumentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Instruments', 'fileupload', 
	function($scope, $stateParams, $location, Authentication, Instruments, fileupload) {
		$scope.authentication = Authentication;
		
		var PUBLIC_IMAGE_PATH = 'common/images/instrument/';
		
		//////////////// CREATE INSTRUMENT ////////////////
		$scope.create = function() {
			var picList = [];
			$scope.piclist.forEach(function (pic, index) {	
				picList.push(pic.name); 
			});				
			
			var instrument = new Instruments({
				name: this.name,
				description: this.description,
				pics: picList,
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
			$scope.piclist.forEach(function (pic, index) {	
				picList.push(pic.name); 
			});				
			
			instrument.pics = picList;
			
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
				var piclist = [];
				$scope.instrument = Instrument;
				Instrument.pics.forEach(function( pic, index ) {
					var picFullData = {'path': PUBLIC_IMAGE_PATH + Instrument._id + '/', 'name': pic};
					piclist.push( picFullData );
				});			
				$scope.piclist = piclist;				
			});
		};
		
		//////////////// FileUpload ////////////////
		$scope.piclist = [];
		$scope.percent = {value: parseInt(0), set: function(value){ this.value = value; }};

		$scope.removeFile = function($file)
		{
			$scope.piclist.splice($scope.piclist.indexOf( $file ), 1);	
		};
								
		$scope.onFileSelect = function($files)
		{
			for (var i = 0; i < $files.length; i++) {
				var upl = fileupload.upload($files[i]);	
				fileupload.progress(upl, $scope.percent);				
				fileupload.success(upl, $scope.piclist);		
			}
		};
	}
]);


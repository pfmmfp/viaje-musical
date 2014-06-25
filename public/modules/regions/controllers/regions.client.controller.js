'use strict';

angular.module('regions').controller('RegionsController', ['$scope', '$stateParams', '$location', '$upload', '$modal', 'Authentication', 'Regions', 'openModal', 'Instruments', 
	function($scope, $stateParams, $location, $upload, $modal, Authentication, Regions, openModal, Instruments) {
	
		var PUBLIC_IMAGE_PATH = 'common/images/regions/';
		var PUBLIC_TMP_PATH    = 'tmp/';
		
		$scope.authentication = Authentication;
		$scope.Instruments = Instruments.query();
		
		$scope.open = function(){
			openModal($modal, function(data){
				console.log(data);
			}, ['a','b']);
		};
			
		$scope.create = function() {
			var picList = [];
			$scope.piclist.forEach(function (pic, index) {	
				picList.push(pic.name); 
			});					
				
			var region = new Regions({
				name: this.name,
				description: this.description,
				instruments: this.instruments,
				pics: picList,
			});

			region.$save(function(response) {
				$location.path('admin/regions/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			this.name = '';
			this.description = '';
		};

		$scope.remove = function(region) {
			if (region) {
				region.$remove();

				for (var i in $scope.regions) {
					if ($scope.regions[i] === region) {
						$scope.regions.splice(i, 1);
					}
				}
			} else {
				$scope.region.$remove(function() {
					$location.path('admin/regions');
				});
			}
		};

		$scope.update = function() {
			var region = $scope.region;
			
			var picList = [];
			$scope.piclist.forEach(function (pic, index) {	
				picList.push(pic.name); 
			});				
			
			region.pics = picList;
			
			region.$update(function() {
				$location.path('admin/regions/' + region._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.regions = Regions.query();
		};

		$scope.findOne = function() {
			var Region = Regions.get({ regionId: $stateParams.regionId}, function()
			{
				var instrumentList = [];
				$scope.region = Region;
				Region.instruments.forEach(function( selectedElement, index ) {
					instrumentList.push(Instruments.get({instrumentId: selectedElement}));
				});		
				$scope.instruments = instrumentList;
				
				var piclist = [];
				$scope.region = Region;
				Region.pics.forEach(function( pic, index ) {
					var picFullData = {'path': PUBLIC_IMAGE_PATH + Region._id + '/', 'name': pic};
					piclist.push( picFullData );
				});			
				$scope.piclist = piclist;
			});
			
		};
		

		//////////////// FileUpload ////////////////
		$scope.piclist = [];
		$scope.percent = parseInt(0);

		$scope.removeFile = function($file)
		{
			$scope.piclist .splice($scope.piclist.indexOf( $file ), 1);	
		};

		$scope.onFileSelect = function($files)
		{
			for (var i = 0; i < $files.length; i++) {
				var file = $files[i];
				$scope.upload = $upload.upload({
					url: '/upload', 
					method: 'POST',
					file: file,
				}).progress(function(evt){
					$scope.percent = parseInt(100.0 * evt.loaded / evt.total);
				}).success(function(data, status, headers, config) {
					var picFullData = {'path': PUBLIC_TMP_PATH, 'name': data.file.name};
					$scope.piclist.push( picFullData );
					$scope.percent = parseInt(0);
				}).error( function(){ 
					console.log('error uploading file'); 
				})
				;
			}
		};		
	
	}
]);

//TODO: esta directive es una mochada, cambiar por algo mejor...
angular.module('regions').directive('multiselect', [ '$stateParams','Instruments', 'Regions', function($stateParams, Instruments, Regions) {
    return function(scope, element, attrs) {        
        var resourceDependencies = {'Instruments': Instruments};
        var Resource = attrs.ngData;
        var elementId = attrs.id;
        var selectedItems = attrs.ngSelection;

        element.multiselect({
			enableFiltering: true,
		});
		
		resourceDependencies[Resource].query(function(response){
		 var itemsList = [];
		 response.forEach(function( resource, index ) {
			  var item = {'label': resource.name, 'value': resource._id};
			  itemsList.push(item);
			});
			element.multiselect('dataprovider', itemsList);

			if($stateParams.regionId)
			{	
				var Region = Regions.get({regionId: $stateParams.regionId}, function(){
					Region[elementId].forEach(function( selectedElement, index  ) {
						element.multiselect('select', selectedElement);
					});	
				});
			}
		}); 		
		

    };
}]);

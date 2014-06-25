'use strict';

angular.module('regions').controller('RegionsController', ['$scope', '$stateParams', '$location', '$upload', '$modal', 'Authentication', 'Regions', 'Instruments', 
	function($scope, $stateParams, $location, $upload, $modal, Authentication, Regions, Instruments) {
	
		var PUBLIC_IMAGE_PATH = 'common/images/regions/';
		var PUBLIC_TMP_PATH    = 'tmp/';
		
		$scope.authentication = Authentication;
		$scope.Instruments = Instruments.query();
		
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
				$.each(Region['instruments'], function( index, selectedElement ) {
					instrumentList.push(Instruments.get({instrumentId: selectedElement}));
				});		
				$scope.instruments = instrumentList;
				
				var piclist = [];
				$scope.region = Region;
				$.each(Region['pics'], function( index, pic ) {
					var picFullData = {'path': PUBLIC_IMAGE_PATH + Region._id + '/', 'name': pic}
				console.log(picFullData);
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
					var picFullData = {'path': PUBLIC_TMP_PATH, 'name': data.file.name}
					$scope.piclist.push( picFullData );
					$scope.percent = parseInt(0);
				}).error( function(){ 
					console.log('error') 
				})
				;
			}
		};		
		//////////////// FileUpload ////////////////		
		
		////////////////   Modal   ////////////////		
		$scope.items = ['item1', 'item2', 'item3'];

		$scope.open = function (size) {

		var modalInstance = $modal.open({
		  templateUrl: 'myModalContent.html',
		  controller: ModalInstanceCtrl,
		  size: size,
		  resolve: {
			items: function () {
			  return $scope.items;
			}
		  }
		});

		modalInstance.result.then(function (selectedItem) {
		  $scope.selected = selectedItem;
		}, function () {

		});
		};
		////////////////   Modal   ////////////////		
	
	}
]);

//TODO: esta directive es una mochada, cambiar por algo mejor...
angular.module('regions').directive('multiselect', [ '$stateParams','Instruments', 'Regions', function($stateParams, Instruments, Regions) {
    return function(scope, element, attrs) {        
        var resourceDependencies = {'Instruments': Instruments}
        var Resource = attrs.ngData;
        var elementId = attrs.id;
        var selectedItems = attrs.ngSelection;
        		
        element = $(element[0]);
        element.multiselect({
			enableFiltering: true,
		})
		
		resourceDependencies[Resource].query(function(response){
		 var itemsList = [];
		 $.each(response, function( index, resource ) {
			  var item = {'label': resource.name, 'value': resource._id}
			  itemsList.push(item) ;
			});
			element.multiselect('dataprovider', itemsList);

			if($stateParams.regionId)
			{	
				var Region = Regions.get({regionId: $stateParams.regionId}, function(){
					$.each(Region[elementId], function( index, selectedElement ) {
						element.multiselect('select', selectedElement);
					});	
				});
			}
		}); 		
		

    }
}]);

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};

'use strict';

angular.module('regions').controller('RegionsController', ['$scope', '$stateParams', '$location', '$upload', '$modal', 'Authentication', 'Regions', 'Instruments', 
	function($scope, $stateParams, $location, $upload, $modal, Authentication, Regions, Instruments) {
		$scope.authentication = Authentication;
		$scope.Instruments = Instruments.query();
		
		$scope.create = function() {
			
			var region = new Regions({
				name: this.name,
				description: this.description,
				instruments: this.instruments,
				pics: $scope.filelist
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
			console.log(region);
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
			});
		};
		

		//////////////// FileUpload ////////////////
		$scope.filelist = [];
		$scope.percent = parseInt(0);

		$scope.removeFile = function($file)
		{
			$scope.filelist .splice($scope.filelist.indexOf( $file ), 1);	
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
					$scope.filelist.push( data.file.name );
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
		
		//////////////// Carrousel ////////////////		
		$scope.slides = [
			{
			  img: 'http://lorempixel.com/400/200/food'
			},
			{
			  img: 'http://lorempixel.com/400/200/sports'
			},
			{
			  img: 'http://lorempixel.com/400/200/people'
			}
		];
		//////////////// Carrousel ////////////////		
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

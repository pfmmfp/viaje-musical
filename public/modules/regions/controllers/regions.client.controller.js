'use strict';

angular.module('regions').controller('RegionsController', ['$scope', '$stateParams', '$location', 'CONFIG', 'Authentication', 'Regions', 'openModal', 'fileupload', 'Instruments', 'Subregions', 
	function($scope, $stateParams, $location, CONFIG, Authentication, Regions, openModal, fileupload, Instruments, Subregions) {
		
		$scope.authentication = Authentication;
		$scope.Instruments = Instruments.query();
		$scope.subregions = [];

		//////////////// CREATE REGION ////////////////			
		$scope.create = function() {
			
			var region = new Regions({
				name: this.name,
				description: this.description,
				instruments: this.instruments,
				pic: $scope.pic.value.name,
				subregions: $scope.subregions,
			});

			region.$save(function(response) {
				$location.path('admin/regions/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			this.name = '';
			this.description = '';
		};

		//////////////// DELETE REGION ////////////////
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

		//////////////// EDIT REGION ////////////////
		$scope.update = function() {
			var region = $scope.region;
			
			region.pic = $scope.pic.value.name;
			console.log($scope.subregions);
			region.subregions = $scope.subregions;
			
			region.$update(function() {
				$location.path('admin/regions/' + region._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		//////////////// LIST REGIONS ////////////////
		$scope.find = function() {
			$scope.regions = Regions.query();
		};

		//////////////// VIEW REGION ////////////////
		$scope.findOne = function(){
			var Region = Regions.get({ regionId: $stateParams.regionId}, function()
			{
				var instrumentList = [];
				$scope.region = Region;
				Region.instruments.forEach(function( selectedElement, index ) {
					instrumentList.push(Instruments.get({instrumentId: selectedElement}));
				});		
			
				$scope.subregions = Region.subregions;
				$scope.instruments = instrumentList;			
				$scope.region = Region;
				$scope.pic.value = {'path': CONFIG.PUBLIC_IMAGE_PATH + Region._id + '/', 'name': Region.pic};
			});
		};
		

		//////////////// FileUpload ////////////////
		$scope.pic = {value: "", set: function(value){ this.value = value; }};
		$scope.percent = {value: parseInt(0), set: function(value){ this.value = value; }};

		$scope.removeFile = function()
		{
			$scope.pic.value = false;
		};
								
		$scope.onFileSelect = function($files)
		{
			for (var i = 0; i < $files.length; i++) {
				var upl = fileupload.upload($files[i]);	
				fileupload.progress(upl, $scope.percent);				
				fileupload.success(upl, $scope.pic);		
			}
		};
		
		//////////////// Subregions Markers ////////////////
		$scope.addMarker = function(event) {	
			Subregions.query( function(response){
				var itemsList = [];
				response.forEach(function( resource, index ) {
					var item = {'label': resource.name, 'value': resource._id};
					itemsList.push(item);
				});
				openModal(function(id){
					Subregions.get({subregionId: id}, function(srgn){
						var markerArray = {'id': srgn._id,  'pics': srgn.pics, 'pic': srgn.pic, 'name': srgn.name, 'description': srgn.description, 'offsetX': event.offsetX, 'offsetY': event.offsetY};
						$scope.subregions.push( markerArray );
					});					
				}, itemsList);			
			});
	    };

		
		$scope.removeSubregion = function(subregion)
		{
			$scope.subregions.splice($scope.subregions.indexOf( subregion ), 1);	
		};
		
		//////////////// Modal ////////////////
		$scope.openSubregionModal = function(marker){
			openModal(function(){}, marker, subregionModalCtrl);	
		};					
		$scope.open = function($scope){
			openModal(function(data, $scope){
				console.log(data);
			}, ['a','b']);
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

var subregionModalCtrl = function ($scope, $modalInstance, items) {
$scope.subregion = items;

console.log(items);
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};


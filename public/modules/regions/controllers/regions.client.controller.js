'use strict';

angular.module('regions').controller('RegionsController', ['$scope', '$stateParams', '$location', 'regionsConfig', 'Authentication', 'Regions', 'openModal', 'fileupload', 'Instruments', 'Subregions', 
	function($scope, $stateParams, $location, regionsConfig, Authentication, Regions, openModal, fileupload, Instruments, Subregions) {
		
		$scope.regionsConfig = regionsConfig;
		$scope.authentication = Authentication;
		$scope.Instruments = Instruments.query();
		$scope.regionInstruments = [];
		$scope.subregions = [];
		
		//////////////// CREATE REGION ////////////////			
		$scope.create = function() {
			
			var region = new Regions({
				name: this.name,
				description: this.description,
				instruments: this.instruments,
				pic: $scope.pic.value.name,
				subregions: this.subregions,
			});

			region.$save(function(response) {
				$location.path('admin/regions/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
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
				$scope.regionInstruments = Instruments.query( { field : { $in : Region.instruments } } );
				$scope.region = Region;
				$scope.pic.value = {'path': regionsConfig.PUBLIC_IMAGE_PATH + Region._id + '/', 'name': Region.pic};
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
						$scope.region.subregions.push( markerArray );
					});					
				}, itemsList);			
			});
	    };

		$scope.removeSubregion = function(subregion)
		{
			$scope.region.subregions.splice($scope.region.subregions.indexOf( subregion ), 1);	
		};
		
		//////////////// Modal ////////////////
		var subregionModalCtrl = function ($scope, $modalInstance, items)
		{
			$scope.subregion = items;
			$scope.close = function()
			{
				$modalInstance.close();
			};
		};		
		
		$scope.openSubregionModal = function(marker){
			openModal(function(){}, marker, subregionModalCtrl);	
		};							
		
		//////////////// Slider ////////////////
		$scope.offset = 0;
			
		$scope.slider = function(action, elements){
			var limit = elements.length; 
			
			if(action === 'next')
			{
				if($scope.offset < limit){ $scope.offset = $scope.offset + 1}
				if($scope.offset === limit){ $scope.offset = 0}
			}

			if(action === 'prev')
			{
				if($scope.offset === 0){ $scope.offset = 0}
				if($scope.offset > 0){ $scope.offset = $scope.offset - 1}
			}
		};
		
	}
]);

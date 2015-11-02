'use strict';

angular.module('regions').controller('RegionsController', ['$scope', '$rootScope', '$stateParams', '$location', 'regionsConfig', 'Authentication', 'Regions', 'RegionsByName', 'openModal', 'fileupload', 'Instruments', 'Subregions', 'composer', '_', 
	function($scope, $rootScope, $stateParams, $location, regionsConfig, Authentication, Regions, RegionsByName, openModal, fileupload, Instruments, Subregions, composer, _) {
		
		$scope.regionName 	     = $stateParams.regionName;
		$scope.regionsConfig     = regionsConfig;
		$scope.authentication    = Authentication;
		$scope.Instruments       = Instruments.query();
		$scope.regionInstruments = [];
		$scope.subregions 		 = [];
		$rootScope.tracks 		 = $rootScope.tracks ? $rootScope.tracks : [];

		var _init = function()
		{
			if(/admin/.test($location.$$path) || /game/.test($location.$$path) || /instruments/.test($location.$$path))
				return false;
			
			$rootScope.music.stopAll();

		    if( typeof($rootScope.tracks[$scope.regionName]) !== 'undefined')
		    {
		    	if($location.$$path === '/regions/NOA')
		    	{	
					$rootScope.music.play('fx'+$scope.regionName, {loop: true, loopStart: 0, loopEnd: 1000});
					$rootScope.music.play('ambient'+$scope.regionName, {loop: true, loopStart: 0, loopEnd: 1000});            	
				}

                angular.element('.home').removeClass('loading').addClass('loaded');
            	angular.element('.loading-screen').css('display', 'none');                         
		    }
		    else
		    {
			    $scope.$on('tracks-loaded', function() {
					$rootScope.music.play('fx'+$scope.regionName, {loop: true, loopStart: 0, loopEnd: 1000});
					$rootScope.music.play('ambient'+$scope.regionName, {loop: true, loopStart: 0, loopEnd: 1000});            	
	                angular.element('.home').removeClass('loading').addClass('loaded');
	            	angular.element('.loading-screen').css('display', 'none');                         
			    });

				var samples = [
					{ 
						key: 'fx'+$scope.regionName, 
						path: 'common/audio/region/'+$scope.regionName +'/fx.ogg'
					},
					{ 
						key: 'ambient'+$scope.regionName, 
						path: 'common/audio/region/'+$scope.regionName +'/ambient.ogg'
					},				
				];
				
				$rootScope.music.loadSamples(samples, function(err, samplesBuffer)
				{			
					//Cargo los tracks del compositor de la region
		            var instruments = composer.tracksConfig.byRegion( $scope.regionName );
		            $rootScope.tracks[$scope.regionName] = _.map(instruments, function(instrument){
		                return composer.createTrack(instrument.name);                    
		            });					
				});
		    }	
		};
		
		_init(); 
		
		//////////////// INIT REGION GAME ////////////////			
		$scope.initGame = function()
		{
			var config = {
				width: 960, 
				height: 600,
				params: { enableDebugging:"0" }
				
			};
			
			var u = new UnityObject2(config);
			var $missingScreen = jQuery("#unityPlayer").find(".missing");
			var $brokenScreen = jQuery("#unityPlayer").find(".broken");
			$missingScreen.hide();
			$brokenScreen.hide();
			
			u.observeProgress(function (progress) {
				switch(progress.pluginStatus) {
					case "broken":
						console.log(progress.pluginStatus);
						$brokenScreen.find("a").click(function (e) {
							e.stopPropagation();
							e.preventDefault();
							u.installPlugin();
							return false;
						});
						$brokenScreen.show();
					break;
					case "missing":
						console.log(progress.pluginStatus);
						$missingScreen.find("a").click(function (e) {
							e.stopPropagation();
							e.preventDefault();
							u.installPlugin();
							return false;
						});
						$missingScreen.show();
					break;
					case "installed":
						console.log(progress.pluginStatus);
						$missingScreen.remove();
					break;
					case "first":
						console.log(progress.pluginStatus);
					break;
				}
			});
			u.initPlugin(jQuery("#unityPlayer")[0], "TravesiaMusical.unity3d");			
		};

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
		$scope.find = function()
		{
			$scope.regions = Regions.query();
		};

		//////////////// VIEW REGION ////////////////
		$scope.findOne = function()
		{
			var query = {};
			var Region;

			if( typeof($stateParams.regionId) !== 'undefined' )
			{
				Region = Regions.get( { regionId: $stateParams.regionId }, function()
				{
					var instruments = Region.instruments.length > 0 ? Region.instruments : 0;
					$scope.regionInstruments =  Instruments.query( { "$in" : instruments } );
					$scope.region = Region;
					$scope.pic.value = {'path': regionsConfig.PUBLIC_IMAGE_PATH + Region._id + '/', 'name': Region.pic};
				});
			}

			if( typeof($stateParams.regionName) !== 'undefined' )
			{
				Region = RegionsByName.get( { regionName: $stateParams.regionName }, function()
				{
					$scope.regionInstruments =  Instruments.query( { "_id": {$in : Region.instruments} } );
					$scope.region = Region;
					$scope.pic.value = {'path': regionsConfig.PUBLIC_IMAGE_PATH + Region._id + '/', 'name': Region.pic};
				});
			}			
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

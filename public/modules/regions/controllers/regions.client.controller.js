'use strict';

angular.module('regions').controller('RegionsController', ['$scope', '$stateParams', '$location', '$modalStack', 'Authentication', 'Regions', 'Instruments',
	function($scope, $stateParams, $location, $modalStack, Authentication, Regions, Instruments) {
		$scope.authentication = Authentication;
		$scope.instruments = Instruments.query();
		
		
		$scope.create = function() {
			var region = new Regions({
				name: this.name,
				description: this.description
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
			$scope.region = Regions.get({
				regionId: $stateParams.regionId
			});
		};
	}
]);


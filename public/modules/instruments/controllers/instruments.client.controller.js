'use strict';

angular.module('instruments').controller('InstrumentsController', ['$scope', '$stateParams', '$location', '$modal', 'Authentication', 'Instruments',
	function($scope, $stateParams, $location, $modal, Authentication, Instruments) {
		$scope.authentication = Authentication;
		
		$scope.create = function() {
			var instrument = new Instruments({
				name: this.name,
				description: this.description
			});
			instrument.$save(function(response) {
				$location.path('admin/instruments/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			this.name = '';
			this.description = '';
		};

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

		$scope.update = function() {
			var instrument = $scope.instrument;

			instrument.$update(function() {
				$location.path('admin/instruments/' + instrument._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.instruments = Instruments.query();
		};

		$scope.findOne = function() {
			$scope.instrument = Instruments.get({
				instrumentId: $stateParams.instrumentId
			});
		};
	}
]);


'use strict';

//Regions service used for communicating with the regions REST endpoints
angular.module('regions').factory('Regions', ['$resource',
	function($resource) {
		return $resource('regions/:regionId', {
			regionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
])
.factory('openModal', [ function() {
		return function (modal, next, scopeItems, modaCtrl, size) {
			
			if (typeof(scopeItems)=="undefined") scopeItems = [];
			if (typeof(modaCtrl)=="undefined") modaCtrl = defaultModalInstanceCtrl;
			
			var modalInstance = modal.open({
			  templateUrl: 'myModalContent.html',
			  controller: modaCtrl,
			  size: size,
			  resolve: {
				items: function () {
				  return scopeItems;
				}
			  }
			});

		modalInstance.result.then(function (selectedItem) {
		  next(selectedItem);
		});

		}	
}]);

var defaultModalInstanceCtrl = function ($scope, $modalInstance, items) {

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


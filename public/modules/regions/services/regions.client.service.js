'use strict';

//Regions service used for communicating with the regions REST endpoints
angular.module('regions').factory('Regions', ['$resource',
	function($resource) {
		return $resource('admin/regions/:regionId', {
			regionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

angular.module('regions').factory('RegionsByName', ['$resource',
	function($resource) {
		return $resource('regions/:regionName', {
			regionId: '@name'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);


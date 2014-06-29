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
]);


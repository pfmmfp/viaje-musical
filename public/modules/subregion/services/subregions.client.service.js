'use strict';

//Subregions service used for communicating with the subregions REST endpoints
angular.module('subregions').factory('Subregions', ['$resource',
	function($resource) {
		return $resource('subregions/:subregionId', {
			subregionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

'use strict';

//Instruments service used for communicating with the instruments REST endpoints
angular.module('instruments').factory('Instruments', ['$resource',
	function($resource) {
		return $resource('instruments/:instrumentId', {
			instrumentId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

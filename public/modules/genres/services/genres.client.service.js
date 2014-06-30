'use strict';

//Genres service used for communicating with the genres REST endpoints
angular.module('genres').factory('Genres', ['$resource',
	function($resource) {
		return $resource('genres/:genreId', {
			genreId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

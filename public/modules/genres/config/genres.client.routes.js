'use strict';

// Setting up route
angular.module('genres').config(['$stateProvider',
	function($stateProvider) {
		// Genres state routing
		$stateProvider.
		state('listGenresAdmin', {
			url: '/admin/genres',
			templateUrl: 'modules/genres/views/admin/list-genres.client.view.html'
		}).
		state('createGenreAdmin', {
			url: '/admin/genres/create',
			templateUrl: 'modules/genres/views/admin/create-genre.client.view.html'
		}).
		state('viewGenreAdmin', {
			url: '/admin/genres/:genreId',
			templateUrl: 'modules/genres/views/admin/view-genre.client.view.html'
		}).
		state('editGenreAdmin', {
			url: '/admin/genres/:genreId/edit',
			templateUrl: 'modules/genres/views/admin/edit-genre.client.view.html'
		}).
		state('listGenresPublic', {
			url: '/genres',
			templateUrl: 'modules/genres/views/public/list-genres.client.view.html'
		}).
		state('viewGenrePublic', {
			url: '/genres/:genreId',
			templateUrl: 'modules/genres/views/public/view-genre.client.view.html'
		})
		;
	}
]);

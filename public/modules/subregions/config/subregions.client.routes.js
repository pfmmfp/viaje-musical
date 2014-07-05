'use strict';

// Setting up route
angular.module('subregions').config(['$stateProvider',
	function($stateProvider) {
		// Subregions state routing
		$stateProvider.
		state('listSubregionsAdmin', {
			url: '/admin/subregions',
			templateUrl: 'modules/subregions/views/admin/list-subregions.client.view.html'
		}).
		state('createSubregionAdmin', {
			url: '/admin/subregions/create',
			templateUrl: 'modules/subregions/views/admin/create-subregion.client.view.html'
		}).
		state('viewSubregionAdmin', {
			url: '/admin/subregions/:subregionId',
			templateUrl: 'modules/subregions/views/admin/view-subregion.client.view.html'
		}).
		state('editSubregionAdmin', {
			url: '/admin/subregions/:subregionId/edit',
			templateUrl: 'modules/subregions/views/admin/edit-subregion.client.view.html'
		}).
		state('listSubregionsPublic', {
			url: '/subregions',
			templateUrl: 'modules/subregions/views/public/list-subregions.client.view.html'
		}).
		state('viewSubregionPublic', {
			url: '/subregions/:subregionId',
			templateUrl: 'modules/subregions/views/public/view-subregion.client.view.html'
		})
		;
	}
]);

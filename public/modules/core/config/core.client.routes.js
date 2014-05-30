'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/public/home.client.view.html'
		}).
		state('admin', {
			url: '/admin',
			templateUrl: 'modules/core/views/admin/home.client.view.html'
		});
	}
]);

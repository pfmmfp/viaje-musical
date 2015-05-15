'use strict';

// Setting up route
angular.module('instruments').config(['$stateProvider',
	function($stateProvider) {
		// Instruments state routing
		$stateProvider.
		state('listInstrumentsAdmin', {
			url: '/admin/instruments',
			templateUrl: 'modules/instruments/views/admin/list-instruments.client.view.html'
		}).
		state('createInstrumentAdmin', {
			url: '/admin/instruments/create',
			templateUrl: 'modules/instruments/views/admin/create-instrument.client.view.html'
		}).
		state('viewInstrumentAdmin', {
			url: '/admin/instruments/:instrumentId',
			templateUrl: 'modules/instruments/views/admin/view-instrument.client.view.html'
		}).
		state('editInstrumentAdmin', {
			url: '/admin/instruments/:instrumentId/edit',
			templateUrl: 'modules/instruments/views/admin/edit-instrument.client.view.html'
		}).
		state('listInstrumentsPublic', {
			url: '/instruments',
			templateUrl: 'modules/instruments/views/public/list-instruments.client.view.html'
		}).
		state('viewInstrumentPublic', {
			url: '/instruments/:regionName/:instrumentId',
			templateUrl: 'modules/instruments/views/public/view-instrument.client.view.html'
		})
		;
	}
]);

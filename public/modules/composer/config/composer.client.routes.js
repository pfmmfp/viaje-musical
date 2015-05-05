'use strict';

//Setting up route
angular.module('composer').config(['$stateProvider',
	function($stateProvider) {
		// Composer state routing
		$stateProvider
      .state('composer', {
  			url: '/compositor/:regionName',
  			templateUrl: 'modules/composer/views/composer.client.view.html'
  		});
	}
]);
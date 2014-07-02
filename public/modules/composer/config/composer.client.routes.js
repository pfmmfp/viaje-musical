'use strict';

//Setting up route
angular.module('composer').config(['$stateProvider',
	function($stateProvider) {
		// Composer state routing
		$stateProvider
      .state('composer', {
  			url: '/compositor',
  			templateUrl: 'modules/composer/views/composer.client.view.html'
  		})
      .state('player', {
        url: '/multipista',
        templateUrl: 'modules/composer/views/player.client.view.html'
    });
	}
]);
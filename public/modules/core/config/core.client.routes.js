/*global angular*/
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  // Redirect to home view when route not found
  $urlRouterProvider.otherwise('/');

  $stateProvider.
  state('home', {
    url: '/',
    templateUrl: 'modules/core/views/home.html',
    controller: 'HomeController'
  }).
  state('viewRegionPublic', {
    url: '/regions/:regionCode',
    templateUrl: 'modules/core/views/region.html',
    controller: 'RegionController'
  }).
  state('composer', {
    url: '/compositor/:regionCode',
    templateUrl: 'modules/core/views/region-composer.html',
    controller: 'ComposerController'
  }).
  state('viewRegionPublicInstruments', {
    url: '/regions/:regionCode/instruments',
    templateUrl: 'modules/core/views/region-instruments.html',
    controller: 'RegionInstrumentsController'
  }).
  state('viewInstrumentPublic', {
    url: '/instruments/:regionCode/:instrumentId',
    templateUrl: 'modules/core/views/instrument.html',
    controller: 'InstrumentController'
  });
}
]);

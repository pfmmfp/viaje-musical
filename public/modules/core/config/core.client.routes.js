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
    url: '/regions/:regionName',
    templateUrl: 'modules/core/views/region.html',
    controller: 'RegionController'
  }).
  state('composer', {
    url: '/compositor/:regionName',
    templateUrl: 'modules/core/views/region-composer.html',
    controller: 'ComposerController'
  }).
  state('viewRegionPublicInstruments', {
    url: '/regions/:regionName/instruments',
    templateUrl: 'modules/core/views/region-instruments.html',
    controller: 'RegionInstrumentsController'
  }).
  state('viewInstrumentPublic', {
    url: '/instruments/:regionName/:instrumentId',
    templateUrl: 'modules/core/views/instrument.html',
    controller: 'InstrumentController'
  });
}
]);

/*global angular*/
'use strict';

angular.module('core').controller('RegionController', ['$scope', '$rootScope', '$stateParams',
'config', 'Tracks', 'Regions', 'Instruments', 'openModal', 'composer', '$q', 'fxAudioFactory', '_', 'ImagePreloadFactory',
function($scope, $rootScope, $stateParams, config, Tracks, Regions, Instruments, openModal, composer,
  $q, fxAudioFactory, _, ImagePreloadFactory) {

  $scope.regionName 	  = $stateParams.regionName;
  $rootScope.tracks 	  = $rootScope.tracks ? $rootScope.tracks : [];

  function preload(){
    var deferred = $q.defer();

    if($rootScope.music){
      deferred.resolve();
    }else{
      var samples = [
        { key: 'fxMapa', path: 'common/audio/home/fx_mapa.ogg'},
        { key: 'music', path: 'common/audio/home/ambient.ogg'}
      ];
      fxAudioFactory.loadSamples(samples, function(err, samplesBuffer){
        if(err){
          console.log("error loading samples");
          deferred.reject();
        }
        $rootScope.music = fxAudioFactory;

        $.getJSON("/dist/imageList.json", function(data){

          var preloader = ImagePreloadFactory.createInstance();

          _.each(data.images, function(image){
            preloader.addImage(image);
          });

          preloader.start(function(){
            console.log("Preloading complete");
            $rootScope.music.play('fxMapa', {loop: true, loopStart: 0, loopEnd: 1000});
            $rootScope.music.play('music',  {loop: true, loopStart: 0, loopEnd: 1000});
            $rootScope.loadedFlag = true;
            deferred.resolve();
          },function(progress){
            //console.log("Loading progress %", progress);
          });
        });
      });
    }
    return deferred.promise;
  }

  function done(){
    var region = Regions.byName($stateParams.regionName);
    $scope.regionInstruments =  Instruments.findByIds(region.instruments);
    $scope.region = region;
    $scope.pic = { value : {path: config.region.PUBLIC_IMAGE_PATH + region.id + '/', 'name': region.pic} };
    angular.element('.home').removeClass('loading').addClass('loaded');
    angular.element('.loading-screen').css('display', 'none');
  }

  preload().then(function(){
    if( !$rootScope.tracks[$scope.regionName] ){
      var tracks = Tracks[$scope.regionName];
      if(tracks.length > 0){
        $rootScope.tracks[$scope.regionName] = _.map(tracks, function(track){
          return composer.createTrack(track);
        });
        $scope.$on('tracks-loaded',function(){
          done();
          $scope.$apply();
        });
      }else{
        $scope.showComposerLink = 'hidden';
        done();
      }
    }else{
      done();
    }
  }).catch(function(err){
    console.log(err);
  });

  //////////////// Modal ////////////////
  var subregionModalCtrl = function ($scope, $modalInstance, items)
  {
    $scope.subregion = items;
    $scope.close = function()
    {
      $modalInstance.close();
    };
  };

  $scope.openSubregionModal = function(marker){
    openModal(function(){}, marker, subregionModalCtrl);
  };

  //////////////// Slider ////////////////
  $scope.offset = 0;

  $scope.slider = function(action, elements){
    var limit = elements.length;

    if(action === 'next')
    {
      if($scope.offset < limit){ $scope.offset = $scope.offset + 1; }
      if($scope.offset === limit){ $scope.offset = 0; }
    }

    if(action === 'prev')
    {
      if($scope.offset === 0){ $scope.offset = 0; }
      if($scope.offset > 0){ $scope.offset = $scope.offset - 1; }
    }
  };
}])

.controller('RegionInstrumentsController', ['$scope', '$rootScope', '$stateParams','Regions', 'Instruments',
function($scope, $rootScope, $stateParams, Regions, Instruments) {
  var region = Regions.byName($stateParams.regionName);
  $scope.regionName = $stateParams.regionName;
  $scope.regionInstruments =  Instruments.findByIds( region.instruments );
}])

.controller('InstrumentController', ['$scope', '$rootScope', '$stateParams','config', 'Instruments',
function($scope, $rootScope, $stateParams, config, Instruments) {
  if($rootScope.music){
    $rootScope.music.stopAll();
    $rootScope.music = null;
  }

  var instrument = Instruments.byId($stateParams.instrumentId);
  $scope.instrument = instrument;
  $scope.instrumentsConfig = config.instrument;
  $scope.regionName = $stateParams.regionName;
}]);

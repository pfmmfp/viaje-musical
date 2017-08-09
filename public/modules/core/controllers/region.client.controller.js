/*global angular*/
'use strict';

angular.module('core').controller('RegionController', ['$scope', '$rootScope', '$stateParams',
'config', 'Tracks', 'Regions', 'Instruments', 'openModal', 'composer', '$q', 'fxAudioFactory', '_', 'ImagePreloadFactory',
function($scope, $rootScope, $stateParams, config, Tracks, Regions, Instruments, openModal, composer,
  $q, fxAudioFactory, _, ImagePreloadFactory) {

  $scope.done = false;
  $scope.regionCode 	  = $stateParams.regionCode;
  $rootScope.tracks 	  = $rootScope.tracks ? $rootScope.tracks : [];
  var regionComposer = composer.get($stateParams.regionCode);

  $scope.toggleMusic = function() {
    if($rootScope.music) {
        $rootScope.music.muting = !$rootScope.music.muting;
        if($rootScope.music.muting) {
            $rootScope.music.stop('fxMapa');
            $rootScope.music.stop('music');

        } else {
            $rootScope.music.play('fxMapa', {loop: true, loopStart: 0, loopEnd: 1000});
            $rootScope.music.play('music',  {loop: true, loopStart: 0, loopEnd: 1000});

        }
    }
  };

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
    var region = Regions.byCode($stateParams.regionCode);
    $scope.regionInstruments =  Instruments.findByCodes(region.instruments);
    $scope.region = region;
    $scope.pic = { value : {path: config.region.PUBLIC_IMAGE_PATH + region.id + '/', 'name': region.pic} };
    // ng-class?
    $scope.done = true;
  }

  preload().then(function(){
    if( !$rootScope.tracks[$scope.regionCode] ){
      var tracks = Tracks[$scope.regionCode].tracks;
      if(tracks.length > 0){
        $rootScope.tracks[$scope.regionCode] = _.map(tracks, function(track){
          return regionComposer.createTrack(track.name, track.samples, track.sampleComposition);
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
  var region = Regions.byCode($stateParams.regionCode);
  $scope.regionCode = $stateParams.regionCode;
  $scope.regionInstruments =  Instruments.findByCodes( region.instruments );
  $scope.toggleMusic = function() {
    if($rootScope.music) {
        $rootScope.music.muting = !$rootScope.music.muting;
        if($rootScope.music.muting) {
            $rootScope.music.stop('fxMapa');
            $rootScope.music.stop('music');

        } else {
            $rootScope.music.play('fxMapa', {loop: true, loopStart: 0, loopEnd: 1000});
            $rootScope.music.play('music',  {loop: true, loopStart: 0, loopEnd: 1000});

        }
    }
  };
}])

.controller('InstrumentController', ['$scope', '$rootScope', '$stateParams', 'Regions', 'config', 'Instruments', '_', 'ngAudio',
function($scope, $rootScope, $stateParams, Regions, config, Instruments, _, ngAudio) {
  if($rootScope.music){
    $rootScope.music.stopAll();
    $rootScope.music = null;
  }

  var region = Regions.byCode($stateParams.regionCode);
  var instruments = Instruments.findByCodes( region.instruments );
  $scope.instrument = _.find(instruments, function(instrument) {
      return $stateParams.instrumentCode === instrument.code;
  });
  $scope.instrumentsConfig = config.instrument;
  $scope.regionCode = $stateParams.regionCode;
  var audioFile = $scope.instrumentsConfig.PUBLIC_AUDIO_PATH + $scope.instrument.code + '/' + $scope.instrument.audioFile;
  $scope.audio = ngAudio.load(audioFile);

}]);

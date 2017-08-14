/*global angular*/
'use strict';

angular.module('core').controller('RegionController', ['$scope', '$rootScope', '$stateParams',
'config', 'Tracks', 'Regions', 'Instruments', 'openModal', 'composer', '$q', 'AmbientMusic', '_', 'ImagePreloadFactory',
function($scope, $rootScope, $stateParams, config, Tracks, Regions, Instruments, openModal, composer,
  $q, AmbientMusic, _, ImagePreloadFactory) {

  $scope.done = false;
  $scope.regionCode = $stateParams.regionCode;
  $rootScope.tracks = $rootScope.tracks ? $rootScope.tracks : [];
  $scope.hasTracks = false;
  $scope.hasInstruments = false;
  var regionComposer = composer.get($stateParams.regionCode);

  $scope.ambient = !AmbientMusic.muted;

  $scope.toggleMusic = function() {
    AmbientMusic.toggle();
    $scope.ambient = !AmbientMusic.muted;
  };

  function preload() {
    var deferred = $q.defer();

    $.getJSON("/dist/imageList.json", function(data) {

      var preloader = ImagePreloadFactory.createInstance();

      _.each(data.images, function(image) {
        preloader.addImage(image);
      });

      preloader.start(function() {
        AmbientMusic.play();
        $rootScope.loadedFlag = true;
        deferred.resolve();
      }, function(progress) {
        //console.log("Loading progress %", progress);
      });
    });

    return deferred.promise;
  }

  function done() {
    var region = Regions.byCode($stateParams.regionCode);
    $scope.regionInstruments = Instruments.findByCodes(region.instruments);
    $scope.hasInstruments = $scope.regionInstruments.length > 0;
    $scope.region = region;
    $scope.pic = { value: { path: config.region.PUBLIC_IMAGE_PATH + region.id + '/', 'name': region.pic } };
    // ng-class?
    $scope.done = true;
    $scope.$apply();
  }

  preload().then(function() {
    var tracks = Tracks[$scope.regionCode].tracks;
    $scope.hasTracks = tracks.length > 0;
    if (!$rootScope.tracks[$scope.regionCode]) {
      if ($scope.hasTracks) {
        $rootScope.tracks[$scope.regionCode] = _.map(tracks, function(track) {
          return regionComposer.createTrack(track.name, track.samples, track.sampleComposition);
        });
        $scope.$on('tracks-loaded', function() {
          done();
        });
      } else {
        done();
      }
    } else {
      done();
    }
  }).catch(function(err) {
    console.log(err);
  });

  //////////////// Modal ////////////////
  var subregionModalCtrl = function($scope, $modalInstance, items)
  {
    $scope.subregion = items;
    $scope.close = function()
    {
      $modalInstance.close();
    };
  };

  $scope.openSubregionModal = function(marker) {
    openModal(function() {}, marker, subregionModalCtrl);
  };

  //////////////// Slider ////////////////
  $scope.offset = 0;

  $scope.slider = function(action, elements) {
    var limit = elements.length;

    if (action === 'next')
    {
      if ($scope.offset < limit) { $scope.offset = $scope.offset + 1; }
      if ($scope.offset === limit) { $scope.offset = 0; }
    }

    if (action === 'prev')
    {
      if ($scope.offset === 0) { $scope.offset = 0; }
      if ($scope.offset > 0) { $scope.offset = $scope.offset - 1; }
    }
  };
}
])

.controller('RegionInstrumentsController', ['$scope', '$rootScope', '$stateParams', 'Regions', 'Instruments', 'AmbientMusic',
function($scope, $rootScope, $stateParams, Regions, Instruments, AmbientMusic) {
  var region = Regions.byCode($stateParams.regionCode);
  $scope.regionCode = $stateParams.regionCode;
  $scope.regionInstruments = Instruments.findByCodes(region.instruments);
  $scope.ambient = !AmbientMusic.muted;

  $scope.toggleMusic = function() {
    AmbientMusic.toggle();
    $scope.ambient = !AmbientMusic.muted;
  };
}
])

.controller('InstrumentController', ['$scope', '$rootScope', '$stateParams', 'Regions', 'config', 'Instruments', '_', 'ngAudio',
function($scope, $rootScope, $stateParams, Regions, config, Instruments, _, ngAudio) {
  if ($rootScope.music) {
    $rootScope.music.stopAll();
    $rootScope.music = null;
  }

  var region = Regions.byCode($stateParams.regionCode);
  var instruments = Instruments.findByCodes(region.instruments);
  $scope.instrument = _.find(instruments, function(instrument) {
    return $stateParams.instrumentCode === instrument.code;
  });
  $scope.instrumentsConfig = config.instrument;
  $scope.regionCode = $stateParams.regionCode;
  var audioFile = $scope.instrumentsConfig.PUBLIC_AUDIO_PATH + $scope.instrument.code + '/' + $scope.instrument.audioFile;
  $scope.audio = ngAudio.load(audioFile);

}
]);

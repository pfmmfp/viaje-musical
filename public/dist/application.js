'use strict';
var ApplicationConfiguration = function () {
    var applicationModuleName = 'viaje-musical', applicationModuleVendorDependencies = [
        'ngResource',
        'ngCookies',
        'ngAnimate',
        'ngTouch',
        'ngSanitize',
        'ui.router',
        'ui.bootstrap',
        'ui.utils',
        'angularFileUpload',
        'angular-carousel',
        'ngAudio',
        'ngDragDrop',
        'underscore'
      ], registerModule = function (moduleName) {
        angular.module(moduleName, []), angular.module(applicationModuleName).requires.push(moduleName);
      };
    return {
      applicationModuleName: applicationModuleName,
      applicationModuleVendorDependencies: applicationModuleVendorDependencies,
      registerModule: registerModule
    };
  }();
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies), angular.module(ApplicationConfiguration.applicationModuleName).config([
  '$locationProvider',
  function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]), angular.element(document).ready(function () {
  '#_=_' === window.location.hash && (window.location.hash = '#!'), angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
}), ApplicationConfiguration.registerModule('composer'), ApplicationConfiguration.registerModule('core'), ApplicationConfiguration.registerModule('genres'), ApplicationConfiguration.registerModule('instruments'), ApplicationConfiguration.registerModule('regions', 'modal'), ApplicationConfiguration.registerModule('subregions'), ApplicationConfiguration.registerModule('users'), angular.module('composer').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('composer', {
      url: '/compositor',
      templateUrl: 'modules/composer/views/composer.client.view.html'
    }).state('player', {
      url: '/multipista',
      templateUrl: 'modules/composer/views/player.client.view.html'
    });
  }
]), angular.module('composer').controller('ComposerController', [
  '$scope',
  'composer',
  function ($scope, composer) {
    angular.extend($scope, {
      instruments: composer.tracksConfig,
      selectedInstrument: composer.tracksConfig[0],
      changeInstrument: function (instrument) {
        $scope.selectedInstrument = instrument;
      },
      play: function () {
        composer.play();
      },
      stop: function () {
        composer.stop();
      },
      closeMessage: function () {
        $scope.messageTemplate = null;
      },
      templateName: function (messageTemplate) {
        return messageTemplate ? messageTemplate + '.html' : null;
      },
      confirmNew: function () {
        $scope.messageTemplate = 'new';
      },
      confirmExample: function () {
        $scope.messageTemplate = 'example';
      },
      'new': function () {
        composer.cleanUp(), $scope.closeMessage();
      },
      wipe: function () {
        $scope.messageTemplate = 'wipe';
      }
    });
  }
]), angular.module('composer').controller('PlayerController', [
  '$scope',
  function () {
  }
]), angular.module('composer').directive('message', [function () {
    return {
      templateUrl: '/modules/composer/views/message.client.directive.html',
      restrict: 'E',
      transclude: !0,
      scope: { template: '=' }
    };
  }]), angular.module('composer').directive('sample', [function () {
    return {
      templateUrl: '/modules/composer/views/sample.client.directive.html',
      restrict: 'E',
      scope: {
        beats: '=',
        instrument: '=',
        file: '='
      },
      link: function (scope) {
        angular.extend(scope, {
          jquiOptions: function () {
            var instrumentName = scope.instrument.toLowerCase();
            return {
              grid: [
                20,
                10
              ],
              revert: 'invalid',
              helper: 'clone',
              snap: '.track.' + instrumentName + ' .track-bar',
              snapMode: 'inner',
              scope: instrumentName,
              cursorAt: {
                top: 20,
                left: 5
              }
            };
          },
          draggableOptions: function () {
            return { placeholder: 'keep' };
          }
        });
      }
    };
  }]), angular.module('composer').directive('track', [
  'composer',
  function (composer) {
    return {
      templateUrl: '/modules/composer/views/track.client.directive.html',
      restrict: 'E',
      scope: {
        instrument: '=',
        choose: '&onChooseInstrument'
      },
      link: function (scope) {
        scope.track = composer.createTrack(scope.instrument.name), angular.extend(scope, {
          newSample: null,
          toggleMute: function (track) {
            track.toggleMute();
          },
          shouldAcceptSample: function () {
            return !0;
          },
          addSample: function () {
            this.track.addSample(this.newSample);
          },
          droppableOptions: function () {
            return {
              onDrop: 'addSample',
              multiple: !0
            };
          },
          jquiOptions: function () {
            return {
              scope: scope.instrument.name.toLowerCase(),
              activeClass: 'acceptable-sample',
              hoverClass: 'incoming-sample',
              tolerance: 'fit',
              accept: scope.shouldAcceptSample
            };
          }
        });
      }
    };
  }
]), angular.module('composer').factory('click', [function () {
    var Click = function () {
      this.time = 0, this.skipTime = 1000, this.offset = null, this.clickRef = null, this.timePaused = null;
    };
    return Click.prototype.isTicking = function () {
      return null !== this.clickRef;
    }, Click.prototype.toggle = function () {
      this.clickRef ? (clearInterval(this.clickRef), this.clickRef = null, this.timePaused = this.milis()) : (this.offset += this.milis() - this.timePaused, this.startTick());
    }, Click.prototype.restart = function () {
      this.isTicking() ? (this.offset = this.milis(), this.tick()) : (this.time = 0, this.timePaused = 0, this.offset = null);
    }, Click.prototype.start = function () {
      this.offset = this.milis(), this.startTick();
    }, Click.prototype.startTick = function () {
      this.clickRef = setInterval(this.tick.bind(this), 1);
    }, Click.prototype.tick = function () {
      this.time = this.milis() - this.offset;
    }, Click.prototype.currentTime = function () {
      return this.time / 1000;
    }, Click.prototype.milis = function () {
      return new Date().getTime();
    }, new Click();
  }]), angular.module('composer').factory('composer', [
  '$window',
  '_',
  function ($window, _) {
    function beatsFromName(name) {
      return name.replace(/T.*$/, '').replace(/Quena-/, '').replace(/Char-/, '').replace(/Chas-/, '').replace(/Bombo-/, '');
    }
    $window.AudioContext = $window.AudioContext || $window.webkitAudioContext;
    var audioContext = new $window.AudioContext(), SampleTrack = function (name, sampleRefs) {
        this.name = name, this.sampleRefs = sampleRefs, this.samples = {}, this.loadSamples(), this.samplesBuffer = [], this.sourcesBuffer = [], this.playing = !1, this.KICK_DELTA = 0;
      };
    SampleTrack.prototype.loadSamples = function () {
      angular.forEach(this.sampleRefs, function (sampleRef) {
        var request = new XMLHttpRequest(), url = '/modules/composer/audio/samples/' + sampleRef.file + '.mp3';
        request.open('GET', url, !0), request.responseType = 'arraybuffer', request.onload = this.storeSample.bind(this, sampleRef.file, request), request.send();
      }, this);
    }, SampleTrack.prototype.storeSample = function (sample, request) {
      var $this = this;
      audioContext.decodeAudioData(request.response, function (buffer) {
        $this.samples[sample] = buffer, Object.keys($this.samples).length === $this.sampleRefs.length && console.log('All samples retrieved! ', $this.sampleRefs[0]);
      }, function () {
        console.log('ERROR');
      });
    }, SampleTrack.prototype.empty = function () {
      this.samplesBuffer = [];
    }, SampleTrack.prototype.soundSample = function (sample) {
      this.createNode(this.samples[sample]).start(0);
    }, SampleTrack.prototype.createNode = function (buffer) {
      var source = audioContext.createBufferSource();
      return source.buffer = buffer, source.connect(audioContext.destination), source;
    }, SampleTrack.prototype.createSource = function (sampleBuffer) {
      return {
        beats: sampleBuffer.beats,
        source: this.createNode(sampleBuffer.buffer)
      };
    }, SampleTrack.prototype.removeSample = function (sample) {
      sample = this.samples[sample], this.samplesBuffer.splice(this.samplesBuffer.indexOf(sample), 1);
    }, SampleTrack.prototype.addSample = function (sample) {
      var beats = beatsFromName(sample);
      return this.samplesBuffer.push({
        beats: beats,
        buffer: this.samples[sample],
        file: sample
      }), beats;
    }, SampleTrack.prototype.duration = function () {
      return _.reduce(this.samplesBuffer, function (memo, sample) {
        return memo + sample.duration;
      }, 0);
    }, SampleTrack.prototype.toggleMute = function () {
    }, SampleTrack.prototype.stop = function () {
      this.playing && (angular.forEach(this.sourcesBuffer, function (sourceBuffer) {
        sourceBuffer.source.stop(0);
      }), this.playing = !1);
    }, SampleTrack.prototype.play = function () {
      if (!this.playing) {
        this.sourcesBuffer = this.samplesBuffer.map(function (sampleBuffer) {
          return this.createSource(sampleBuffer);
        }, this);
        var time = audioContext.currentTime + 0.1, tempo = 96, beat = 60 / tempo;
        angular.forEach(this.sourcesBuffer, function (sourceBuffer) {
          sourceBuffer.source.start(time), time += sourceBuffer.beats * beat;
        }), this.playing = !0;
      }
    };
    var Player = function () {
      this.tracks = [], this.playing = !1;
    };
    angular.extend(Player.prototype, {
      createTrack: function (name, samples) {
        var newSampleTrack = new SampleTrack(name, samples);
        return this.tracks.push(newSampleTrack), newSampleTrack;
      },
      play: function () {
        angular.forEach(this.tracks, function (track) {
          track.play();
        });
      },
      stop: function () {
        angular.forEach(this.tracks, function (track) {
          track.stop();
        });
      },
      cleanUp: function () {
        angular.forEach(this.tracks, function (track) {
          track.empty();
        });
      }
    });
    var player = new Player(), tracksConfig = [
        {
          name: 'Quena',
          samples: [
            {
              beats: 2,
              file: 'Quena-2T-Cel5-06'
            },
            {
              beats: 4,
              file: 'Quena-4T-Final-A'
            }
          ],
          sampleComposition: []
        },
        {
          name: 'Charango',
          samples: [
            {
              beats: 2,
              file: 'Char-2T-Am'
            },
            {
              beats: 3,
              file: 'Char-3T-E7'
            }
          ],
          sampleComposition: []
        },
        {
          name: 'Chaschas',
          samples: [
            {
              beats: 4,
              file: 'Chas-4T-01'
            },
            {
              beats: 4,
              file: 'Chas-4T-02'
            },
            {
              beats: 4,
              file: 'Chas-4T-03'
            }
          ],
          sampleComposition: []
        },
        {
          name: 'Bombo',
          samples: [
            {
              beats: 4,
              file: 'Bombo-4T-01'
            },
            {
              beats: 4,
              file: 'Bombo-4T-02'
            },
            {
              beats: 4,
              file: 'Bombo-4T-03'
            },
            {
              beats: 4,
              file: 'Bombo-4T-04'
            }
          ],
          sampleComposition: []
        }
      ];
    return {
      tracksConfig: tracksConfig,
      createTrack: function (name) {
        var track = _.find(tracksConfig, function (track) {
            return track.name === name;
          });
        return player.createTrack(name, track.samples);
      },
      play: player.play.bind(player),
      stop: player.stop.bind(player),
      cleanUp: player.cleanUp.bind(player)
    };
  }
]), angular.module('composer').factory('player', [
  'click',
  function (click) {
    var AudioPlayer = function () {
      this.tracks = [], this.playing = !1;
    };
    AudioPlayer.prototype.currentTime = function () {
      return click.currentTime();
    }, AudioPlayer.prototype.duration = function () {
      return this.tracks[0].$el.duration;
    }, AudioPlayer.prototype.updateTracks = function () {
      angular.forEach(this.tracks, function (track) {
        track.updateTime();
      });
    }, AudioPlayer.prototype.toggleMute = function (track) {
      this.tracks[track].toggleMute();
    }, AudioPlayer.prototype.stop = function () {
      this.playing && (this.playing = !1, click.toggle(), angular.forEach(this.tracks, function (track) {
        track.stop();
      }));
    }, AudioPlayer.prototype.toggle = function () {
      this.playing = !this.playing, click.toggle(), angular.forEach(this.tracks, function (track) {
        track.togglePlay();
      });
    }, AudioPlayer.prototype.play = function () {
      this.playing = !0, click.start(), angular.forEach(this.tracks, function (track) {
        track.$el.play();
      });
    }, AudioPlayer.prototype.overTime = function () {
      return this.currentTime() >= this.duration();
    }, AudioPlayer.prototype.progress = function () {
      return Math.round(this.currentTime() / this.duration() * 1000) / 10;
    }, AudioPlayer.prototype.createTrack = function (name) {
      var track = new AudioTrack(name);
      return this.tracks.push(track), track;
    };
    var AudioTrack = function (trackName) {
      this.name = trackName;
      var url = '/modules/composer/audio/clavelito/' + trackName + '.mp3';
      this.$el = new Audio(url);
    };
    return AudioTrack.prototype.toggleMute = function () {
      this.$el.muted = !this.$el.muted;
    }, AudioTrack.prototype.play = function () {
      this.updateTime(), this.$el.play();
    }, AudioTrack.prototype.stop = function () {
      this.$el.pause();
    }, AudioTrack.prototype.togglePlay = function () {
      this.$el.paused ? this.play() : this.stop();
    }, AudioTrack.prototype.updateTime = function () {
      this.$el.currentTime = click.currentTime();
    }, new AudioPlayer();
  }
]), angular.module('core').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/'), $stateProvider.state('home', {
      url: '/',
      templateUrl: 'modules/core/views/public/home.client.view.html'
    }).state('admin', {
      url: '/admin',
      templateUrl: 'modules/core/views/admin/home.client.view.html'
    });
  }
]), angular.module('core').controller('HeaderController', [
  '$scope',
  'Authentication',
  'Menus',
  function ($scope, Authentication, Menus) {
    $scope.authentication = Authentication, $scope.isCollapsed = !1, $scope.menu = Menus.getMenu('topbar'), $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    }, $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = !1;
    });
  }
]), angular.module('core').controller('HomeController', [
  '$scope',
  'Authentication',
  function ($scope, Authentication) {
    $scope.authentication = Authentication, $scope.aterrizar = !0;
  }
]), angular.module('core').animation('.aterrizar', [
  '$location',
  '$window',
  function ($location, $window) {
    return {
      removeClass: function (element, className, done) {
        'volar' === className ? (console.log(element), element.css({
          width: '381px',
          height: '683px',
          top: '-30px',
          left: '-30px'
        }).animate({
          left: '65%',
          height: '140px',
          width: '78px',
          top: '18%'
        }, 1000, function () {
          $window.location.href = '#!/compositor';
        })) : done();
      },
      addClass: function (element, className, done) {
        'volar' === className ? element.css({
          left: '65%',
          height: '140px',
          width: '78px',
          top: '18%'
        }).animate({
          width: '381px',
          height: '683px',
          top: '-30px',
          left: '-30px'
        }, 500, function () {
          console.log('empezo');
        }) : done();
      }
    };
  }
]), angular.module('core').directive('multiselect', [function () {
    return function (scope, element, attrs) {
      var multiselectElements = [], selectedItems = attrs.ngSelection, ItemsList = attrs.ngData;
      element.multiselect({ enableFiltering: !0 }), scope.$watch(function () {
        return scope[ItemsList].length > 0 ? !0 : !1;
      }, function (val) {
        val && (scope[ItemsList].forEach(function (resource) {
          var item = {
              label: resource.name,
              value: resource._id
            };
          multiselectElements.push(item);
        }), element.multiselect('dataprovider', multiselectElements));
      }), scope.$watch(function () {
        return scope[selectedItems].length > 0 ? !0 : !1;
      }, function (val) {
        val && scope[selectedItems].forEach(function (resource) {
          element.multiselect('select', resource._id);
        });
      });
    };
  }]);
var PUBLIC_TMP_PATH = 'tmp/', UPLOAD_ROUTE = '/upload';
angular.module('core').factory('multipleFileupload', [
  '$upload',
  function (upload) {
    var factory = {
        upload: function (file) {
          return upload.upload({
            url: UPLOAD_ROUTE,
            method: 'POST',
            file: file
          });
        },
        progress: function (upl, scope) {
          upl.progress(function (evt) {
            scope.set(parseInt(100 * evt.loaded / evt.total));
          });
        },
        success: function (upl, scope) {
          return upl.success(function (data) {
            var fileFullData = {
                path: PUBLIC_TMP_PATH,
                name: data.file.name
              };
            scope.push(fileFullData);
          });
        }
      };
    return factory;
  }
]), angular.module('core').factory('fileupload', [
  '$upload',
  function (upload) {
    var factory = {
        upload: function (file) {
          return upload.upload({
            url: UPLOAD_ROUTE,
            method: 'POST',
            file: file
          });
        },
        progress: function (upl, scope) {
          upl.progress(function (evt) {
            scope.set(parseInt(100 * evt.loaded / evt.total));
          });
        },
        success: function (upl, scope) {
          return upl.success(function (data) {
            var fileFullData = {
                path: PUBLIC_TMP_PATH,
                name: data.file.name
              };
            'undefined' == typeof scope.set ? scope.push(fileFullData) : scope.set(fileFullData);
          });
        }
      };
    return factory;
  }
]), angular.module('core').service('Menus', [function () {
    this.defaultRoles = ['user'], this.menus = {};
    var shouldRender = function (user) {
      if (!user)
        return this.isPublic;
      for (var userRoleIndex in user.roles)
        for (var roleIndex in this.roles)
          if (this.roles[roleIndex] === user.roles[userRoleIndex])
            return !0;
      return !1;
    };
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId])
          return !0;
        throw new Error('Menu does not exists');
      }
      throw new Error('MenuId was not provided');
    }, this.getMenu = function (menuId) {
      return this.validateMenuExistance(menuId), this.menus[menuId];
    }, this.addMenu = function (menuId, isPublic, roles) {
      return this.menus[menuId] = {
        isPublic: isPublic || !1,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      }, this.menus[menuId];
    }, this.removeMenu = function (menuId) {
      this.validateMenuExistance(menuId), delete this.menus[menuId];
    }, this.addMenuItem = function (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles) {
      return this.validateMenuExistance(menuId), this.menus[menuId].items.push({
        title: menuItemTitle,
        link: menuItemURL,
        menuItemType: menuItemType || 'item',
        menuItemClass: menuItemType,
        uiRoute: menuItemUIRoute || '/' + menuItemURL,
        isPublic: isPublic || this.menus[menuId].isPublic,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      }), this.menus[menuId];
    }, this.addSubMenuItem = function (menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles) {
      this.validateMenuExistance(menuId);
      for (var itemIndex in this.menus[menuId].items)
        this.menus[menuId].items[itemIndex].link === rootMenuItemURL && this.menus[menuId].items[itemIndex].items.push({
          title: menuItemTitle,
          link: menuItemURL,
          uiRoute: menuItemUIRoute || '/' + menuItemURL,
          isPublic: isPublic || this.menus[menuId].isPublic,
          roles: roles || this.defaultRoles,
          shouldRender: shouldRender
        });
      return this.menus[menuId];
    }, this.removeMenuItem = function (menuId, menuItemURL) {
      this.validateMenuExistance(menuId);
      for (var itemIndex in this.menus[menuId].items)
        this.menus[menuId].items[itemIndex].link === menuItemURL && this.menus[menuId].items.splice(itemIndex, 1);
      return this.menus[menuId];
    }, this.removeSubMenuItem = function (menuId, submenuItemURL) {
      this.validateMenuExistance(menuId);
      for (var itemIndex in this.menus[menuId].items)
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items)
          this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL && this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
      return this.menus[menuId];
    }, this.addMenu('topbar', !0);
  }]);
var defaultModalInstanceCtrl = function ($scope, $modalInstance, items) {
  $scope.items = items, $scope.selected = { item: $scope.items[0] }, $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  }, $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};
angular.module('core').factory('openModal', [
  '$modal',
  function ($modal) {
    return function (next, scopeItems, modaCtrl, size) {
      'undefined' == typeof scopeItems && (scopeItems = []), 'undefined' == typeof modaCtrl && (modaCtrl = defaultModalInstanceCtrl);
      var modalInstance = $modal.open({
          templateUrl: 'myModalContent.html',
          controller: modaCtrl,
          size: size,
          resolve: {
            items: function () {
              return scopeItems;
            }
          }
        });
      modalInstance.result.then(function (selectedItem) {
        next(selectedItem);
      });
    };
  }
]), angular.module('genres').run([
  'Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', 'Genres', 'genres', 'dropdown', '/admin/genres(/create)?', 'false'), Menus.addSubMenuItem('topbar', 'genres', 'List Genres', 'admin/genres', '/admin/genres', 'false'), Menus.addSubMenuItem('topbar', 'genres', 'New Genre', 'admin/genres/create', 'admin/genres/create', 'false');
  }
]).constant('genresConfig', {
  PUBLIC_IMAGE_PATH: 'common/images/genre/',
  PUBLIC_AUDIO_PATH: 'common/audio/genre/'
}), angular.module('genres').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('listGenresAdmin', {
      url: '/admin/genres',
      templateUrl: 'modules/genres/views/admin/list-genres.client.view.html'
    }).state('createGenreAdmin', {
      url: '/admin/genres/create',
      templateUrl: 'modules/genres/views/admin/create-genre.client.view.html'
    }).state('viewGenreAdmin', {
      url: '/admin/genres/:genreId',
      templateUrl: 'modules/genres/views/admin/view-genre.client.view.html'
    }).state('editGenreAdmin', {
      url: '/admin/genres/:genreId/edit',
      templateUrl: 'modules/genres/views/admin/edit-genre.client.view.html'
    }).state('listGenresPublic', {
      url: '/genres',
      templateUrl: 'modules/genres/views/public/list-genres.client.view.html'
    }).state('viewGenrePublic', {
      url: '/genres/:genreId',
      templateUrl: 'modules/genres/views/public/view-genre.client.view.html'
    });
  }
]), angular.module('genres').controller('GenresController', [
  '$scope',
  '$stateParams',
  '$location',
  'genresConfig',
  'Authentication',
  'Genres',
  'fileupload',
  'ngAudio',
  function ($scope, $stateParams, $location, genresConfig, Authentication, Genres, fileupload) {
    $scope.authentication = Authentication, $scope.create = function () {
      var picList = [];
      $scope.picList.forEach(function (pic) {
        picList.push(pic.name);
      });
      var audioList = [];
      $scope.audioList.forEach(function (audio) {
        audioList.push(audio.name);
      });
      var genre = new Genres({
          name: this.name,
          description: this.description,
          pics: picList,
          audio: audioList
        });
      genre.$save(function (response) {
        $location.path('admin/genres/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      }), this.name = '', this.description = '';
    }, $scope.remove = function (genre) {
      if (genre) {
        genre.$remove();
        for (var i in $scope.genres)
          $scope.genres[i] === genre && $scope.genres.splice(i, 1);
      } else
        $scope.genre.$remove(function () {
          $location.path('admin/genres');
        });
    }, $scope.update = function () {
      var genre = $scope.genre, picList = [];
      $scope.picList.forEach(function (pic) {
        picList.push(pic.name);
      }), genre.pics = picList;
      var audioList = [];
      $scope.audioList.forEach(function (audio) {
        audioList.push(audio.name);
      }), genre.audio = audioList, genre.$update(function () {
        $location.path('admin/genres/' + genre._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    }, $scope.find = function () {
      $scope.genres = Genres.query();
    }, $scope.findOne = function () {
      var Genre = Genres.get({ genreId: $stateParams.genreId }, function () {
          var picList = [], audioList = [];
          $scope.genre = Genre, Genre.pics.forEach(function (pic) {
            var picFullData = {
                path: genresConfig.PUBLIC_IMAGE_PATH + Genre._id + '/',
                name: pic
              };
            picList.push(picFullData);
          }), $scope.picList = picList, Genre.audio.forEach(function (audio) {
            var audioFullData = {
                path: genresConfig.PUBLIC_AUDIO_PATH + Genre._id + '/',
                name: audio
              };
            audioList.push(audioFullData);
          }), $scope.audioList = audioList;
        });
    }, $scope.audioList = [], $scope.picList = [], $scope.picPercent = {
      value: parseInt(0),
      set: function (value) {
        this.value = value;
      }
    }, $scope.audioPercent = {
      value: parseInt(0),
      set: function (value) {
        this.value = value;
      }
    }, $scope.removeFile = function ($file, type) {
      'image' === type && $scope.picList.splice($scope.picList.indexOf($file), 1), 'audio' === type && $scope.audioList.splice($scope.audioList.indexOf($file), 1);
    }, $scope.onFileSelect = function ($files, type) {
      for (var i = 0; i < $files.length; i++) {
        var upl = fileupload.upload($files[i]);
        'image' === type && (fileupload.progress(upl, $scope.picPercent), fileupload.success(upl, $scope.picList)), 'audio' === type && (fileupload.progress(upl, $scope.audioPercent), fileupload.success(upl, $scope.audioList));
      }
    };
  }
]), angular.module('genres').factory('Genres', [
  '$resource',
  function ($resource) {
    return $resource('genres/:genreId', { genreId: '@_id' }, { update: { method: 'PUT' } });
  }
]), angular.module('instruments').run([
  'Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', 'Instruments', 'instruments', 'dropdown', '/admin/instruments(/create)?', 'false'), Menus.addSubMenuItem('topbar', 'instruments', 'List Instruments', 'admin/instruments', '/admin/instruments', 'false'), Menus.addSubMenuItem('topbar', 'instruments', 'New Instrument', 'admin/instruments/create', 'admin/instruments/create', 'false');
  }
]).constant('instrumentsConfig', {
  PUBLIC_IMAGE_PATH: 'common/images/instrument/',
  PUBLIC_AUDIO_PATH: 'common/audio/instrument/'
}), angular.module('instruments').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('listInstrumentsAdmin', {
      url: '/admin/instruments',
      templateUrl: 'modules/instruments/views/admin/list-instruments.client.view.html'
    }).state('createInstrumentAdmin', {
      url: '/admin/instruments/create',
      templateUrl: 'modules/instruments/views/admin/create-instrument.client.view.html'
    }).state('viewInstrumentAdmin', {
      url: '/admin/instruments/:instrumentId',
      templateUrl: 'modules/instruments/views/admin/view-instrument.client.view.html'
    }).state('editInstrumentAdmin', {
      url: '/admin/instruments/:instrumentId/edit',
      templateUrl: 'modules/instruments/views/admin/edit-instrument.client.view.html'
    }).state('listInstrumentsPublic', {
      url: '/instruments',
      templateUrl: 'modules/instruments/views/public/list-instruments.client.view.html'
    }).state('viewInstrumentPublic', {
      url: '/instruments/:instrumentId',
      templateUrl: 'modules/instruments/views/public/view-instrument.client.view.html'
    });
  }
]), angular.module('instruments').controller('InstrumentsController', [
  '$scope',
  '$stateParams',
  '$location',
  'instrumentsConfig',
  'Authentication',
  'Instruments',
  'fileupload',
  'ngAudio',
  function ($scope, $stateParams, $location, instrumentsConfig, Authentication, Instruments, fileupload, ngAudio) {
    $scope.authentication = Authentication, $scope.instrumentsConfig = instrumentsConfig, $scope.create = function () {
      var picList = [];
      $scope.picList.forEach(function (pic) {
        picList.push(pic.name);
      });
      var audioList = [];
      $scope.audioList.forEach(function (audio) {
        audioList.push(audio.name);
      });
      var instrument = new Instruments({
          name: this.name,
          description: this.description,
          pics: picList,
          audio: audioList,
          pic: $scope.pic.value.name
        });
      instrument.$save(function (response) {
        $location.path('admin/instruments/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      }), this.name = '', this.description = '';
    }, $scope.remove = function (instrument) {
      if (instrument) {
        instrument.$remove();
        for (var i in $scope.instruments)
          $scope.instruments[i] === instrument && $scope.instruments.splice(i, 1);
      } else
        $scope.instrument.$remove(function () {
          $location.path('admin/instruments');
        });
    }, $scope.update = function () {
      var instrument = $scope.instrument;
      instrument.pic = $scope.pic.value.name;
      var picList = [];
      $scope.picList.forEach(function (pic) {
        picList.push(pic.name);
      }), instrument.pics = picList;
      var audioList = [];
      $scope.audioList.forEach(function (audio) {
        audioList.push(audio.name);
      }), instrument.audio = audioList, instrument.$update(function () {
        $location.path('admin/instruments/' + instrument._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    }, $scope.find = function () {
      $scope.instruments = Instruments.query();
    }, $scope.findOne = function () {
      var Instrument = Instruments.get({ instrumentId: $stateParams.instrumentId }, function () {
          var picList = [], audioList = [];
          $scope.instrument = Instrument, Instrument.pics.forEach(function (pic) {
            var picFullData = {
                path: instrumentsConfig.PUBLIC_IMAGE_PATH + Instrument._id + '/',
                name: pic
              };
            picList.push(picFullData);
          }), $scope.picList = picList, Instrument.audio.forEach(function (audio) {
            var audioFullData = {
                path: instrumentsConfig.PUBLIC_AUDIO_PATH + Instrument._id + '/',
                name: audio
              };
            audioList.push(audioFullData);
          }), $scope.audioList = audioList, $scope.pic.value = {
            path: instrumentsConfig.PUBLIC_IMAGE_PATH + Instrument._id + '/',
            name: Instrument.pic
          };
        });
    }, $scope.audioList = [], $scope.picList = [], $scope.picPercent = {
      value: parseInt(0),
      set: function (value) {
        this.value = value;
      }
    }, $scope.audioPercent = {
      value: parseInt(0),
      set: function (value) {
        this.value = value;
      }
    }, $scope.removeFile = function ($file, type) {
      'image' === type && $scope.picList.splice($scope.picList.indexOf($file), 1), 'audio' === type && $scope.audioList.splice($scope.audioList.indexOf($file), 1);
    }, $scope.onFileSelect = function ($files, type) {
      for (var i = 0; i < $files.length; i++) {
        var upl = fileupload.upload($files[i]);
        'image' === type && (fileupload.progress(upl, $scope.picPercent), fileupload.success(upl, $scope.picList)), 'audio' === type && (fileupload.progress(upl, $scope.audioPercent), fileupload.success(upl, $scope.audioList));
      }
    }, $scope.pic = {
      value: '',
      set: function (value) {
        this.value = value;
      }
    }, $scope.singlePicPercent = {
      value: parseInt(0),
      set: function (value) {
        this.value = value;
      }
    }, $scope.removePic = function () {
      $scope.pic.value = !1;
    }, $scope.picSelect = function ($files) {
      for (var i = 0; i < $files.length; i++) {
        var upl = fileupload.upload($files[i]);
        fileupload.progress(upl, $scope.singlePicPercent), fileupload.success(upl, $scope.pic);
      }
    }, $scope.offset = 0, $scope.slider = function (action, elements) {
      var limit = elements.length;
      'next' === action && ($scope.offset < limit && ($scope.offset = $scope.offset + 1), $scope.offset === limit && ($scope.offset = 0)), 'prev' === action && (0 === $scope.offset && ($scope.offset = 0), $scope.offset > 0 && ($scope.offset = $scope.offset - 1));
    }, $scope.stop = function () {
      ngAudio.stopAll();
    };
  }
]), angular.module('instruments').factory('Instruments', [
  '$resource',
  function ($resource) {
    return $resource('instruments/:instrumentId', { instrumentId: '@_id' }, { update: { method: 'PUT' } });
  }
]), angular.module('regions').run([
  'Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', 'Regions', 'regions', 'dropdown', '/admin/regions(/create)?', 'false'), Menus.addSubMenuItem('topbar', 'regions', 'List Regions', 'admin/regions', '/admin/regions', 'false'), Menus.addSubMenuItem('topbar', 'regions', 'New Region', 'admin/regions/create', 'admin/regions/create', 'false');
  }
]).constant('regionsConfig', {
  PUBLIC_IMAGE_PATH: 'common/images/region/',
  PUBLIC_AUDIO_PATH: 'common/audio/region/'
}), angular.module('regions').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('listRegionsAdmin', {
      url: '/admin/regions',
      templateUrl: 'modules/regions/views/admin/list-regions.client.view.html'
    }).state('createRegionAdmin', {
      url: '/admin/regions/create',
      templateUrl: 'modules/regions/views/admin/create-region.client.view.html'
    }).state('viewRegionAdmin', {
      url: '/admin/regions/:regionId',
      templateUrl: 'modules/regions/views/admin/view-region.client.view.html'
    }).state('editRegionAdmin', {
      url: '/admin/regions/:regionId/edit',
      templateUrl: 'modules/regions/views/admin/edit-region.client.view.html'
    }).state('listRegionsPublic', {
      url: '/regions',
      templateUrl: 'modules/regions/views/public/list-regions.client.view.html'
    }).state('viewRegionPublic', {
      url: '/regions/:regionId',
      templateUrl: 'modules/regions/views/public/view-region.client.view.html'
    }).state('viewRegionPublicInstruments', {
      url: '/regions/:regionId/instruments',
      templateUrl: 'modules/regions/views/public/view-region-instruments.client.view.html'
    });
  }
]), angular.module('regions').controller('RegionsController', [
  '$scope',
  '$stateParams',
  '$location',
  'regionsConfig',
  'Authentication',
  'Regions',
  'openModal',
  'fileupload',
  'Instruments',
  'Subregions',
  function ($scope, $stateParams, $location, regionsConfig, Authentication, Regions, openModal, fileupload, Instruments, Subregions) {
    $scope.regionsConfig = regionsConfig, $scope.authentication = Authentication, $scope.Instruments = Instruments.query(), $scope.regionInstruments = [], $scope.subregions = [], $scope.create = function () {
      var region = new Regions({
          name: this.name,
          description: this.description,
          instruments: this.instruments,
          pic: $scope.pic.value.name,
          subregions: this.subregions
        });
      region.$save(function (response) {
        $location.path('admin/regions/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    }, $scope.remove = function (region) {
      if (region) {
        region.$remove();
        for (var i in $scope.regions)
          $scope.regions[i] === region && $scope.regions.splice(i, 1);
      } else
        $scope.region.$remove(function () {
          $location.path('admin/regions');
        });
    }, $scope.update = function () {
      var region = $scope.region;
      region.pic = $scope.pic.value.name, region.$update(function () {
        $location.path('admin/regions/' + region._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    }, $scope.find = function () {
      $scope.regions = Regions.query();
    }, $scope.findOne = function () {
      var Region = Regions.get({ regionId: $stateParams.regionId }, function () {
          $scope.regionInstruments = Instruments.query({ field: { $in: Region.instruments } }), $scope.region = Region, $scope.pic.value = {
            path: regionsConfig.PUBLIC_IMAGE_PATH + Region._id + '/',
            name: Region.pic
          };
        });
    }, $scope.pic = {
      value: '',
      set: function (value) {
        this.value = value;
      }
    }, $scope.percent = {
      value: parseInt(0),
      set: function (value) {
        this.value = value;
      }
    }, $scope.removeFile = function () {
      $scope.pic.value = !1;
    }, $scope.onFileSelect = function ($files) {
      for (var i = 0; i < $files.length; i++) {
        var upl = fileupload.upload($files[i]);
        fileupload.progress(upl, $scope.percent), fileupload.success(upl, $scope.pic);
      }
    }, $scope.addMarker = function (event) {
      Subregions.query(function (response) {
        var itemsList = [];
        response.forEach(function (resource) {
          var item = {
              label: resource.name,
              value: resource._id
            };
          itemsList.push(item);
        }), openModal(function (id) {
          Subregions.get({ subregionId: id }, function (srgn) {
            var markerArray = {
                id: srgn._id,
                pics: srgn.pics,
                pic: srgn.pic,
                name: srgn.name,
                description: srgn.description,
                offsetX: event.offsetX,
                offsetY: event.offsetY
              };
            $scope.region.subregions.push(markerArray);
          });
        }, itemsList);
      });
    }, $scope.removeSubregion = function (subregion) {
      $scope.region.subregions.splice($scope.region.subregions.indexOf(subregion), 1);
    };
    var subregionModalCtrl = function ($scope, $modalInstance, items) {
      $scope.subregion = items, $scope.close = function () {
        $modalInstance.close();
      };
    };
    $scope.openSubregionModal = function (marker) {
      openModal(function () {
      }, marker, subregionModalCtrl);
    }, $scope.offset = 0, $scope.slider = function (action, elements) {
      var limit = elements.length;
      'next' === action && ($scope.offset < limit && ($scope.offset = $scope.offset + 1), $scope.offset === limit && ($scope.offset = 0)), 'prev' === action && (0 === $scope.offset && ($scope.offset = 0), $scope.offset > 0 && ($scope.offset = $scope.offset - 1));
    };
  }
]), !function ($) {
  function isObservableArray(obj) {
    return ko.isObservable(obj) && void 0 !== obj.destroyAll;
  }
  function Multiselect(select, options) {
    this.options = this.mergeOptions(options), this.$select = $(select), this.originalOptions = this.$select.clone()[0].options, this.query = '', this.searchTimeout = null, this.options.multiple = 'multiple' === this.$select.attr('multiple'), this.options.onChange = $.proxy(this.options.onChange, this), this.options.onDropdownShow = $.proxy(this.options.onDropdownShow, this), this.options.onDropdownHide = $.proxy(this.options.onDropdownHide, this), this.buildContainer(), this.buildButton(), this.buildDropdown(), this.buildSelectAll(), this.buildDropdownOptions(), this.buildFilter(), this.updateButtonText(), this.updateSelectAll(), this.$select.hide().after(this.$container);
  }
  (null === Array.prototype.forEach || void 0 === Array.prototype.forEach) && (Array.prototype.forEach = function (func) {
    var index;
    for (index = 0; index < this.length; ++index)
      func(this[index]);
  });
  var ko;
  'undefined' != typeof ko && ko.bindingHandlers && !ko.bindingHandlers.multiselect && (ko.bindingHandlers.multiselect = {
    init: function (element, valueAccessor, allBindingsAccessor) {
      var listOfSelectedItems = allBindingsAccessor().selectedOptions, config = ko.utils.unwrapObservable(valueAccessor());
      $(element).multiselect(config), isObservableArray(listOfSelectedItems) && listOfSelectedItems.subscribe(function (changes) {
        var addedArray = [], deletedArray = [];
        changes.forEach(function (change) {
          switch (change.status) {
          case 'added':
            addedArray.push(change.value);
            break;
          case 'deleted':
            deletedArray.push(change.value);
          }
        }), addedArray.length > 0 && $(element).multiselect('select', addedArray), deletedArray.length > 0 && $(element).multiselect('deselect', deletedArray);
      }, null, 'arrayChange');
    },
    update: function (element, valueAccessor, allBindingsAccessor) {
      var listOfItems = allBindingsAccessor().options, ms = $(element).data('multiselect'), config = ko.utils.unwrapObservable(valueAccessor());
      isObservableArray(listOfItems) && listOfItems.subscribe(function () {
        $(element).multiselect('rebuild');
      }), ms ? ms.updateOriginalOptions() : $(element).multiselect(config);
    }
  }), Multiselect.prototype = {
    defaults: {
      buttonText: function (options) {
        if (0 === options.length)
          return this.nonSelectedText + ' <b class="caret"></b>';
        if (options.length > this.numberDisplayed)
          return options.length + ' ' + this.nSelectedText + ' <b class="caret"></b>';
        var selected = '';
        return options.each(function () {
          var label = void 0 !== $(this).attr('label') ? $(this).attr('label') : $(this).html();
          selected += label + ', ';
        }), selected.substr(0, selected.length - 2) + ' <b class="caret"></b>';
      },
      buttonTitle: function (options) {
        if (0 === options.length)
          return this.nonSelectedText;
        var selected = '';
        return options.each(function () {
          selected += $(this).text() + ', ';
        }), selected.substr(0, selected.length - 2);
      },
      label: function (element) {
        return $(element).attr('label') || $(element).html();
      },
      onChange: function () {
      },
      onDropdownShow: function () {
      },
      onDropdownHide: function () {
      },
      buttonClass: 'btn btn-default',
      dropRight: !1,
      selectedClass: 'active',
      buttonWidth: 'auto',
      buttonContainer: '<div class="btn-group" />',
      maxHeight: !1,
      checkboxName: 'multiselect',
      includeSelectAllOption: !1,
      includeSelectAllIfMoreThan: 0,
      selectAllText: ' Select all',
      selectAllValue: 'multiselect-all',
      enableFiltering: !1,
      enableCaseInsensitiveFiltering: !1,
      filterPlaceholder: 'Search',
      filterBehavior: 'text',
      preventInputChangeEvent: !1,
      nonSelectedText: 'None selected',
      nSelectedText: 'selected',
      numberDisplayed: 3,
      templates: {
        button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown"></button>',
        ul: '<ul class="multiselect-container dropdown-menu"></ul>',
        filter: '<li class="multiselect-item filter"><div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',
        li: '<li><a href="javascript:void(0);"><label></label></a></li>',
        divider: '<li class="multiselect-item divider"></li>',
        liGroup: '<li class="multiselect-item group"><label class="multiselect-group"></label></li>'
      }
    },
    constructor: Multiselect,
    buildContainer: function () {
      this.$container = $(this.options.buttonContainer), this.$container.on('show.bs.dropdown', this.options.onDropdownShow), this.$container.on('hide.bs.dropdown', this.options.onDropdownHide);
    },
    buildButton: function () {
      this.$button = $(this.options.templates.button).addClass(this.options.buttonClass), this.$select.prop('disabled') ? this.disable() : this.enable(), this.options.buttonWidth && 'auto' !== this.options.buttonWidth && this.$button.css({ width: this.options.buttonWidth });
      var tabindex = this.$select.attr('tabindex');
      tabindex && this.$button.attr('tabindex', tabindex), this.$container.prepend(this.$button);
    },
    buildDropdown: function () {
      this.$ul = $(this.options.templates.ul), this.options.dropRight && this.$ul.addClass('pull-right'), this.options.maxHeight && this.$ul.css({
        'max-height': this.options.maxHeight + 'px',
        'overflow-y': 'auto',
        'overflow-x': 'hidden'
      }), this.$container.append(this.$ul);
    },
    buildDropdownOptions: function () {
      this.$select.children().each($.proxy(function (index, element) {
        var tag = $(element).prop('tagName').toLowerCase();
        'optgroup' === tag ? this.createOptgroup(element) : 'option' === tag && ('divider' === $(element).data('role') ? this.createDivider() : this.createOptionValue(element));
      }, this)), $('li input', this.$ul).on('change', $.proxy(function (event) {
        var $target = $(event.target), checked = $target.prop('checked') || !1, isSelectAllOption = $target.val() === this.options.selectAllValue;
        this.options.selectedClass && (checked ? $target.parents('li').addClass(this.options.selectedClass) : $target.parents('li').removeClass(this.options.selectedClass));
        var value = $target.val(), $option = this.getOptionByValue(value), $optionsNotThis = $('option', this.$select).not($option), $checkboxesNotThis = $('input', this.$container).not($target);
        return isSelectAllOption && (checked ? this.selectall() : this.deselectall()), isSelectAllOption || (checked ? ($option.prop('selected', !0), this.options.multiple ? $option.prop('selected', !0) : (this.options.selectedClass && $($checkboxesNotThis).parents('li').removeClass(this.options.selectedClass), $($checkboxesNotThis).prop('checked', !1), $optionsNotThis.prop('selected', !1), this.$button.click()), 'active' === this.options.selectedClass && $optionsNotThis.parents('a').css('outline', '')) : $option.prop('selected', !1)), this.$select.change(), this.updateButtonText(), this.updateSelectAll(), this.options.onChange($option, checked), this.options.preventInputChangeEvent ? !1 : void 0;
      }, this)), $('li a', this.$ul).on('touchstart click', function (event) {
        event.stopPropagation();
        var $target = $(event.target);
        if (event.shiftKey) {
          var checked = $target.prop('checked') || !1;
          if (checked) {
            var prev = $target.parents('li:last').siblings('li[class="active"]:first'), currentIdx = $target.parents('li').index(), prevIdx = prev.index();
            currentIdx > prevIdx ? $target.parents('li:last').prevUntil(prev).each(function () {
              $(this).find('input:first').prop('checked', !0).trigger('change');
            }) : $target.parents('li:last').nextUntil(prev).each(function () {
              $(this).find('input:first').prop('checked', !0).trigger('change');
            });
          }
        }
        $target.blur();
      }), this.$container.off('keydown.multiselect').on('keydown.multiselect', $.proxy(function (event) {
        if (!$('input[type="text"]', this.$container).is(':focus'))
          if (9 !== event.keyCode && 27 !== event.keyCode || !this.$container.hasClass('open')) {
            var $items = $(this.$container).find('li:not(.divider):not(.disabled) a').filter(':visible');
            if (!$items.length)
              return;
            var index = $items.index($items.filter(':focus'));
            38 === event.keyCode && index > 0 ? index-- : 40 === event.keyCode && index < $items.length - 1 ? index++ : ~index || (index = 0);
            var $current = $items.eq(index);
            if ($current.focus(), 32 === event.keyCode || 13 === event.keyCode) {
              var $checkbox = $current.find('input');
              $checkbox.prop('checked', !$checkbox.prop('checked')), $checkbox.change();
            }
            event.stopPropagation(), event.preventDefault();
          } else
            this.$button.click();
      }, this));
    },
    createOptionValue: function (element) {
      $(element).is(':selected') && $(element).prop('selected', !0);
      var label = this.options.label(element), value = $(element).val(), inputType = this.options.multiple ? 'checkbox' : 'radio', $li = $(this.options.templates.li);
      $('label', $li).addClass(inputType), $('label', $li).append('<input type="' + inputType + '" name="' + this.options.checkboxName + '" />');
      var selected = $(element).prop('selected') || !1, $checkbox = $('input', $li);
      $checkbox.val(value), value === this.options.selectAllValue && ($li.addClass('multiselect-item multiselect-all'), $checkbox.parent().parent().addClass('multiselect-all')), $('label', $li).append(' ' + label), this.$ul.append($li), $(element).is(':disabled') && $checkbox.attr('disabled', 'disabled').prop('disabled', !0).parents('a').attr('tabindex', '-1').parents('li').addClass('disabled'), $checkbox.prop('checked', selected), selected && this.options.selectedClass && $checkbox.parents('li').addClass(this.options.selectedClass);
    },
    createDivider: function () {
      var $divider = $(this.options.templates.divider);
      this.$ul.append($divider);
    },
    createOptgroup: function (group) {
      var groupName = $(group).prop('label'), $li = $(this.options.templates.liGroup);
      $('label', $li).text(groupName), this.$ul.append($li), $(group).is(':disabled') && $li.addClass('disabled'), $('option', group).each($.proxy(function (index, element) {
        this.createOptionValue(element);
      }, this));
    },
    buildSelectAll: function () {
      var alreadyHasSelectAll = this.hasSelectAll();
      if (!alreadyHasSelectAll && this.options.includeSelectAllOption && this.options.multiple && $('option', this.$select).length > this.options.includeSelectAllIfMoreThan) {
        this.options.includeSelectAllDivider && this.$ul.prepend($(this.options.templates.divider));
        var $li = $(this.options.templates.li);
        $('label', $li).addClass('checkbox'), $('label', $li).append('<input type="checkbox" name="' + this.options.checkboxName + '" />');
        var $checkbox = $('input', $li);
        $checkbox.val(this.options.selectAllValue), $li.addClass('multiselect-item multiselect-all'), $checkbox.parent().parent().addClass('multiselect-all'), $('label', $li).append(' ' + this.options.selectAllText), this.$ul.prepend($li), $checkbox.prop('checked', !1);
      }
    },
    buildFilter: function () {
      if (this.options.enableFiltering || this.options.enableCaseInsensitiveFiltering) {
        var enableFilterLength = Math.max(this.options.enableFiltering, this.options.enableCaseInsensitiveFiltering);
        this.$select.find('option').length >= enableFilterLength && (this.$filter = $(this.options.templates.filter), $('input', this.$filter).attr('placeholder', this.options.filterPlaceholder), this.$ul.prepend(this.$filter), this.$filter.val(this.query).on('click', function (event) {
          event.stopPropagation();
        }).on('input keydown', $.proxy(function (event) {
          clearTimeout(this.searchTimeout), this.searchTimeout = this.asyncFunction($.proxy(function () {
            this.query !== event.target.value && (this.query = event.target.value, $.each($('li', this.$ul), $.proxy(function (index, element) {
              var value = $('input', element).val(), text = $('label', element).text(), filterCandidate = '';
              if ('text' === this.options.filterBehavior ? filterCandidate = text : 'value' === this.options.filterBehavior ? filterCandidate = value : 'both' === this.options.filterBehavior && (filterCandidate = text + '\n' + value), value !== this.options.selectAllValue && text) {
                var showElement = !1;
                this.options.enableCaseInsensitiveFiltering && filterCandidate.toLowerCase().indexOf(this.query.toLowerCase()) > -1 ? showElement = !0 : filterCandidate.indexOf(this.query) > -1 && (showElement = !0), showElement ? $(element).show().removeClass('filter-hidden') : $(element).hide().addClass('filter-hidden');
              }
            }, this))), this.updateSelectAll();
          }, this), 300, this);
        }, this)));
      }
    },
    destroy: function () {
      this.$container.remove(), this.$select.show(), this.$select.data('multiselect', null);
    },
    refresh: function () {
      $('option', this.$select).each($.proxy(function (index, element) {
        var $input = $('li input', this.$ul).filter(function () {
            return $(this).val() === $(element).val();
          });
        $(element).is(':selected') ? ($input.prop('checked', !0), this.options.selectedClass && $input.parents('li').addClass(this.options.selectedClass)) : ($input.prop('checked', !1), this.options.selectedClass && $input.parents('li').removeClass(this.options.selectedClass)), $(element).is(':disabled') ? $input.attr('disabled', 'disabled').prop('disabled', !0).parents('li').addClass('disabled') : $input.prop('disabled', !1).parents('li').removeClass('disabled');
      }, this)), this.updateButtonText(), this.updateSelectAll();
    },
    select: function (selectValues) {
      $.isArray(selectValues) || (selectValues = [selectValues]);
      for (var i = 0; i < selectValues.length; i++) {
        var value = selectValues[i], $option = this.getOptionByValue(value), $checkbox = this.getInputByValue(value);
        this.options.selectedClass && $checkbox.parents('li').addClass(this.options.selectedClass), $checkbox.prop('checked', !0), $option.prop('selected', !0);
      }
      this.updateButtonText();
    },
    clearSelection: function () {
      this.deselectall(!1), this.updateButtonText(), this.updateSelectAll();
    },
    deselect: function (deselectValues) {
      $.isArray(deselectValues) || (deselectValues = [deselectValues]);
      for (var i = 0; i < deselectValues.length; i++) {
        var value = deselectValues[i], $option = this.getOptionByValue(value), $checkbox = this.getInputByValue(value);
        this.options.selectedClass && $checkbox.parents('li').removeClass(this.options.selectedClass), $checkbox.prop('checked', !1), $option.prop('selected', !1);
      }
      this.updateButtonText();
    },
    selectall: function () {
      var allCheckboxes = $('li input[type="checkbox"]:enabled', this.$ul), visibleCheckboxes = allCheckboxes.filter(':visible'), allCheckboxesCount = allCheckboxes.length, visibleCheckboxesCount = visibleCheckboxes.length;
      if (visibleCheckboxes.prop('checked', !0), $('li:not(.divider):not(.disabled)', this.$ul).filter(':visible').addClass(this.options.selectedClass), allCheckboxesCount === visibleCheckboxesCount)
        $('option:enabled', this.$select).prop('selected', !0);
      else {
        var values = visibleCheckboxes.map(function () {
            return $(this).val();
          }).get();
        $('option:enabled', this.$select).filter(function () {
          return -1 !== $.inArray($(this).val(), values);
        }).prop('selected', !0);
      }
    },
    deselectall: function (justVisible) {
      var allCheckboxes = $('li input[type="checkbox"]:enabled', this.$ul), visibleCheckboxes = void 0;
      if (justVisible = 'undefined' == typeof justVisible ? !0 : justVisible) {
        var values = void 0;
        visibleCheckboxes = allCheckboxes.filter(':visible'), visibleCheckboxes.prop('checked', !1), values = visibleCheckboxes.map(function () {
          return $(this).val();
        }).get(), $('option:enabled', this.$select).filter(function () {
          return -1 !== $.inArray($(this).val(), values);
        }).prop('selected', !1), $('li:not(.divider):not(.disabled)', this.$ul).filter(':visible').removeClass(this.options.selectedClass);
      } else
        allCheckboxes.prop('checked', !1), $('option:enabled', this.$select).prop('selected', !1), $('li:not(.divider):not(.disabled)', this.$ul).removeClass(this.options.selectedClass);
    },
    rebuild: function () {
      this.$ul.html(''), this.options.multiple = 'multiple' === this.$select.attr('multiple'), this.buildSelectAll(), this.buildDropdownOptions(), this.buildFilter(), this.updateButtonText(), this.updateSelectAll();
    },
    dataprovider: function (dataprovider) {
      var optionDOM = '';
      dataprovider.forEach(function (option) {
        optionDOM += '<option value="' + option.value + '">' + option.label + '</option>';
      }), this.$select.html(optionDOM), this.rebuild();
    },
    enable: function () {
      this.$select.prop('disabled', !1), this.$button.prop('disabled', !1).removeClass('disabled');
    },
    disable: function () {
      this.$select.prop('disabled', !0), this.$button.prop('disabled', !0).addClass('disabled');
    },
    setOptions: function (options) {
      this.options = this.mergeOptions(options);
    },
    mergeOptions: function (options) {
      return $.extend(!0, {}, this.defaults, options);
    },
    hasSelectAll: function () {
      return $('li.' + this.options.selectAllValue, this.$ul).length > 0;
    },
    updateSelectAll: function () {
      if (this.hasSelectAll()) {
        var allBoxes = $('li:not(.multiselect-item):not(.filter-hidden) input:enabled', this.$ul), allBoxesLength = allBoxes.length, checkedBoxesLength = allBoxes.filter(':checked').length, selectAllLi = $('li.' + this.options.selectAllValue, this.$ul), selectAllInput = selectAllLi.find('input');
        checkedBoxesLength > 0 && checkedBoxesLength === allBoxesLength ? (selectAllInput.prop('checked', !0), selectAllLi.addClass(this.options.selectedClass)) : (selectAllInput.prop('checked', !1), selectAllLi.removeClass(this.options.selectedClass));
      }
    },
    updateButtonText: function () {
      var options = this.getSelected();
      $('button', this.$container).html(this.options.buttonText(options, this.$select)), $('button', this.$container).attr('title', this.options.buttonTitle(options, this.$select));
    },
    getSelected: function () {
      return $('option', this.$select).filter(':selected');
    },
    getOptionByValue: function (value) {
      for (var options = $('option', this.$select), valueToCompare = value.toString(), i = 0; i < options.length; i += 1) {
        var option = options[i];
        if (option.value === valueToCompare)
          return $(option);
      }
    },
    getInputByValue: function (value) {
      for (var checkboxes = $('li input', this.$ul), valueToCompare = value.toString(), i = 0; i < checkboxes.length; i += 1) {
        var checkbox = checkboxes[i];
        if (checkbox.value === valueToCompare)
          return $(checkbox);
      }
    },
    updateOriginalOptions: function () {
      this.originalOptions = this.$select.clone()[0].options;
    },
    asyncFunction: function (callback, timeout, self) {
      var args = Array.prototype.slice.call(arguments, 3);
      return setTimeout(function () {
        callback.apply(self || window, args);
      }, timeout);
    }
  }, $.fn.multiselect = function (option, parameter) {
    return this.each(function () {
      var data = $(this).data('multiselect'), options = 'object' == typeof option && option;
      data || (data = new Multiselect(this, options), $(this).data('multiselect', data)), 'string' == typeof option && (data[option](parameter), 'destroy' === option && $(this).data('multiselect', !1));
    });
  }, $.fn.multiselect.Constructor = Multiselect, $(function () {
    $('select[data-role=multiselect]').multiselect();
  });
}(window.jQuery), angular.module('regions').factory('Regions', [
  '$resource',
  function ($resource) {
    return $resource('regions/:regionId', { regionId: '@_id' }, { update: { method: 'PUT' } });
  }
]), angular.module('subregions').run([
  'Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', 'Subregions', 'subregions', 'dropdown', '/admin/subregions(/create)?', 'false'), Menus.addSubMenuItem('topbar', 'subregions', 'List Subregions', 'admin/subregions', '/admin/subregions', 'false'), Menus.addSubMenuItem('topbar', 'subregions', 'New Subregion', 'admin/subregions/create', 'admin/subregions/create', 'false');
  }
]).constant('subregionsConfig', {
  PUBLIC_IMAGE_PATH: 'common/images/subregion/',
  PUBLIC_AUDIO_PATH: 'common/audio/subregion/'
}), angular.module('subregions').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('listSubregionsAdmin', {
      url: '/admin/subregions',
      templateUrl: 'modules/subregions/views/admin/list-subregions.client.view.html'
    }).state('createSubregionAdmin', {
      url: '/admin/subregions/create',
      templateUrl: 'modules/subregions/views/admin/create-subregion.client.view.html'
    }).state('viewSubregionAdmin', {
      url: '/admin/subregions/:subregionId',
      templateUrl: 'modules/subregions/views/admin/view-subregion.client.view.html'
    }).state('editSubregionAdmin', {
      url: '/admin/subregions/:subregionId/edit',
      templateUrl: 'modules/subregions/views/admin/edit-subregion.client.view.html'
    }).state('listSubregionsPublic', {
      url: '/subregions',
      templateUrl: 'modules/subregions/views/public/list-subregions.client.view.html'
    }).state('viewSubregionPublic', {
      url: '/subregions/:subregionId',
      templateUrl: 'modules/subregions/views/public/view-subregion.client.view.html'
    });
  }
]), angular.module('subregions').controller('SubregionsController', [
  '$scope',
  '$stateParams',
  '$location',
  'subregionsConfig',
  'Authentication',
  'Subregions',
  'fileupload',
  'ngAudio',
  function ($scope, $stateParams, $location, subregionsConfig, Authentication, Subregions, fileupload) {
    $scope.authentication = Authentication, $scope.create = function () {
      var picList = [];
      $scope.picList.forEach(function (pic) {
        picList.push(pic.name);
      });
      var audioList = [];
      $scope.audioList.forEach(function (audio) {
        audioList.push(audio.name);
      });
      var subregion = new Subregions({
          name: this.name,
          description: this.description,
          pics: picList,
          audio: audioList,
          pic: $scope.pic.value.name
        });
      console.log(subregion), subregion.$save(function (response) {
        $location.path('admin/subregions/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      }), this.name = '', this.description = '';
    }, $scope.remove = function (subregion) {
      if (subregion) {
        subregion.$remove();
        for (var i in $scope.subregions)
          $scope.subregions[i] === subregion && $scope.subregions.splice(i, 1);
      } else
        $scope.subregion.$remove(function () {
          $location.path('admin/subregions');
        });
    }, $scope.update = function () {
      var subregion = $scope.subregion;
      subregion.pic = $scope.pic.value.name;
      var picList = [];
      $scope.picList.forEach(function (pic) {
        picList.push(pic.name);
      }), subregion.pics = picList;
      var audioList = [];
      $scope.audioList.forEach(function (audio) {
        audioList.push(audio.name);
      }), subregion.audio = audioList, subregion.$update(function () {
        $location.path('admin/subregions/' + subregion._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    }, $scope.find = function () {
      $scope.subregions = Subregions.query();
    }, $scope.findOne = function () {
      var Subregion = Subregions.get({ subregionId: $stateParams.subregionId }, function () {
          var picList = [], audioList = [];
          $scope.subregion = Subregion, Subregion.pics.forEach(function (pic) {
            var picFullData = {
                path: subregionsConfig.PUBLIC_IMAGE_PATH + Subregion._id + '/',
                name: pic
              };
            picList.push(picFullData);
          }), $scope.picList = picList, Subregion.audio.forEach(function (audio) {
            var audioFullData = {
                path: subregionsConfig.PUBLIC_AUDIO_PATH + Subregion._id + '/',
                name: audio
              };
            audioList.push(audioFullData);
          }), $scope.audioList = audioList, $scope.pic.value = {
            path: subregionsConfig.PUBLIC_IMAGE_PATH + Subregion._id + '/',
            name: Subregion.pic
          };
        });
    }, $scope.audioList = [], $scope.picList = [], $scope.picPercent = {
      value: parseInt(0),
      set: function (value) {
        this.value = value;
      }
    }, $scope.audioPercent = {
      value: parseInt(0),
      set: function (value) {
        this.value = value;
      }
    }, $scope.removeFile = function ($file, type) {
      'image' === type && $scope.picList.splice($scope.picList.indexOf($file), 1), 'audio' === type && $scope.audioList.splice($scope.audioList.indexOf($file), 1);
    }, $scope.onFileSelect = function ($files, type) {
      for (var i = 0; i < $files.length; i++) {
        var upl = fileupload.upload($files[i]);
        'image' === type && (fileupload.progress(upl, $scope.picPercent), fileupload.success(upl, $scope.picList)), 'audio' === type && (fileupload.progress(upl, $scope.audioPercent), fileupload.success(upl, $scope.audioList));
      }
    }, $scope.pic = {
      value: '',
      set: function (value) {
        this.value = value;
      }
    }, $scope.singlePicPercent = {
      value: parseInt(0),
      set: function (value) {
        this.value = value;
      }
    }, $scope.removePic = function () {
      $scope.pic.value = !1;
    }, $scope.picSelect = function ($files) {
      for (var i = 0; i < $files.length; i++) {
        var upl = fileupload.upload($files[i]);
        fileupload.progress(upl, $scope.singlePicPercent), fileupload.success(upl, $scope.pic);
      }
    };
  }
]), angular.module('subregions').factory('Subregions', [
  '$resource',
  function ($resource) {
    return $resource('subregions/:subregionId', { subregionId: '@_id' }, { update: { method: 'PUT' } });
  }
]), angular.module('users').config([
  '$httpProvider',
  function ($httpProvider) {
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
            case 401:
              Authentication.user = null, $location.path('signin');
              break;
            case 403:
            }
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]), angular.module('users').config([
  '$stateProvider',
  function ($stateProvider) {
    $stateProvider.state('profile', {
      url: '/settings/profile',
      templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
    }).state('password', {
      url: '/settings/password',
      templateUrl: 'modules/users/views/settings/change-password.client.view.html'
    }).state('accounts', {
      url: '/settings/accounts',
      templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
    }).state('signup', {
      url: '/signup',
      templateUrl: 'modules/users/views/signup.client.view.html'
    }).state('signin', {
      url: '/signin',
      templateUrl: 'modules/users/views/signin.client.view.html'
    });
  }
]), angular.module('users').controller('AuthenticationController', [
  '$scope',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $http, $location, Authentication) {
    $scope.authentication = Authentication, $scope.authentication.user && $location.path('/'), $scope.signup = function () {
      $http.post('/auth/signup', $scope.credentials).success(function (response) {
        $scope.authentication.user = response, $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    }, $scope.signin = function () {
      $http.post('/auth/signin', $scope.credentials).success(function (response) {
        $scope.authentication.user = response, $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]), angular.module('users').controller('SettingsController', [
  '$scope',
  '$http',
  '$location',
  'Users',
  'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user, $scope.user || $location.path('/'), $scope.hasConnectedAdditionalSocialAccounts = function () {
      for (var i in $scope.user.additionalProvidersData)
        return !0;
      return !1;
    }, $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || $scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider];
    }, $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null, $http.delete('/users/accounts', { params: { provider: provider } }).success(function (response) {
        $scope.success = !0, $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    }, $scope.updateUserProfile = function () {
      $scope.success = $scope.error = null;
      var user = new Users($scope.user);
      user.$update(function (response) {
        $scope.success = !0, Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    }, $scope.changeUserPassword = function () {
      $scope.success = $scope.error = null, $http.post('/users/password', $scope.passwordDetails).success(function () {
        $scope.success = !0, $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]), angular.module('users').factory('Authentication', [function () {
    var _this = this;
    return _this._data = { user: window.user }, _this._data;
  }]), angular.module('users').factory('Users', [
  '$resource',
  function ($resource) {
    return $resource('users', {}, { update: { method: 'PUT' } });
  }
]);
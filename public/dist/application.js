'use strict';
// Init the application configuration module for AngularJS application
var ApplicationConfiguration = function () {
    // Init module configuration options
    var applicationModuleName = 'viaje-musical';
    var applicationModuleVendorDependencies = [
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
        'ngAudio'
      ];
    // Add a new vertical module
    var registerModule = function (moduleName) {
      // Create angular module
      angular.module(moduleName, []);
      // Add the module to the AngularJS configuration file
      angular.module(applicationModuleName).requires.push(moduleName);
    };
    return {
      applicationModuleName: applicationModuleName,
      applicationModuleVendorDependencies: applicationModuleVendorDependencies,
      registerModule: registerModule
    };
  }();'use strict';
//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);
// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config([
  '$locationProvider',
  function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_')
    window.location.hash = '#!';
  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('composer');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('genres');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('instruments');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('regions', 'modal');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');'use strict';
//Setting up route
angular.module('composer').config([
  '$stateProvider',
  function ($stateProvider) {
    // Composer state routing
    $stateProvider.state('composer', {
      url: '/compositor',
      templateUrl: 'modules/composer/views/composer.client.view.html'
    }).state('player', {
      url: '/multipista',
      templateUrl: 'modules/composer/views/player.client.view.html'
    });
  }
]);'use strict';
angular.module('composer').controller('ComposerController', [
  '$scope',
  'player',
  function ($scope, player) {
    angular.extend($scope, {
      tracks: [
        'quena',
        'charango',
        'chaschas',
        'bombo'
      ],
      selectedInstrument: 'bombo',
      selectedInstrumentImg: function () {
        return this.selectedInstrument + '-grande.png';
      },
      play: function () {
        player.play();
      },
      stop: function () {
        player.stop();
      },
      closeMessage: function () {
        $scope.messageTemplate = null;
      },
      templateName: function (messageTemplate) {
        console.log(messageTemplate ? messageTemplate + '.html' : null);
        return messageTemplate ? messageTemplate + '.html' : null;
      },
      new: function () {
        $scope.messageTemplate = 'new';
        console.log($scope.messageTemplate);
      },
      wipe: function () {
        $scope.messageTemplate = 'wipe';
        console.log($scope.messageTemplate);
      }
    });
  }
]);'use strict';
angular.module('composer').controller('PlayerController', [
  '$scope',
  function ($scope) {
  }
]);'use strict';
angular.module('composer').directive('message', [function () {
    return {
      templateUrl: '/modules/composer/directives/message.client.directive.html',
      restrict: 'E',
      transclude: true,
      scope: { template: '=' }
    };
  }]);'use strict';
angular.module('composer').directive('track', [
  'player',
  function (player) {
    return {
      templateUrl: '/modules/composer/directives/track.client.directive.html',
      restrict: 'E',
      scope: { name: '=' },
      controller: [
        '$scope',
        function ($scope) {
          $scope.toggleMute = function (track) {
            track.toggleMute();
          };
        }
      ],
      link: function postLink(scope, element, attrs) {
        scope.track = player.createTrack(scope.name);
      }
    };
  }
]);'use strict';
angular.module('composer').factory('click', [function () {
    var Click = function () {
      this.time = 0;
      this.skipTime = 1000;
      this.offset = null;
      this.clickRef = null;
      this.timePaused = null;
    };
    Click.prototype.isTicking = function () {
      return this.clickRef !== null;
    };
    Click.prototype.toggle = function () {
      if (this.clickRef) {
        clearInterval(this.clickRef);
        this.clickRef = null;
        this.timePaused = this.milis();
      } else {
        this.offset += this.milis() - this.timePaused;
        this.startTick();
      }
    };
    Click.prototype.restart = function () {
      if (this.isTicking()) {
        this.offset = this.milis();
        this.tick();  // Force tick since tracks might want to update before the scheduled tick
      } else {
        this.time = 0;
        this.timePaused = 0;
        this.offset = null;  // $("body").trigger("update-progress"); FIXME EVENT
      }
    };
    Click.prototype.start = function () {
      this.offset = this.milis();
      this.startTick();
    };
    Click.prototype.startTick = function () {
      this.clickRef = setInterval(this.tick.bind(this), 1);
    };
    Click.prototype.tick = function () {
      this.time = this.milis() - this.offset;  // $("body").trigger("update-progress"); FIXME EVENT
    };
    Click.prototype.currentTime = function () {
      return this.time / 1000;
    };
    Click.prototype.milis = function () {
      return new Date().getTime();
    };
    return new Click();
  }]);'use strict';
angular.module('composer').factory('player', [
  'click',
  function (click) {
    /**
		 * Audio Player
		 */
    var AudioPlayer = function () {
      this.tracks = [];
      this.playing = false;
    };
    AudioPlayer.prototype.currentTime = function () {
      return click.currentTime();
    };
    AudioPlayer.prototype.duration = function () {
      return this.tracks[0].$el.duration;
    };
    AudioPlayer.prototype.updateTracks = function () {
      angular.forEach(this.tracks, function (track) {
        track.updateTime();
      });
    };
    AudioPlayer.prototype.toggleMute = function (track) {
      this.tracks[track].toggleMute();
    };
    AudioPlayer.prototype.stop = function () {
      if (this.playing) {
        this.playing = false;
        click.toggle();
        angular.forEach(this.tracks, function (track) {
          track.stop();
        });
      }
    };
    AudioPlayer.prototype.toggle = function () {
      this.playing = !this.playing;
      click.toggle();
      angular.forEach(this.tracks, function (track) {
        track.togglePlay();
      });
    };
    AudioPlayer.prototype.play = function () {
      this.playing = true;
      click.start();
      angular.forEach(this.tracks, function (track) {
        track.$el.play();
      });
    };
    AudioPlayer.prototype.overTime = function () {
      return this.currentTime() >= this.duration();
    };
    AudioPlayer.prototype.progress = function () {
      return Math.round(this.currentTime() / this.duration() * 1000) / 10;
    };
    AudioPlayer.prototype.createTrack = function (name) {
      var track = new AudioTrack(name);
      this.tracks.push(track);
      return track;
    };
    /**
		 * Audio Track
		 */
    var AudioTrack = function (trackName) {
      this.name = trackName;
      var url = '/modules/composer/audio/clavelito/' + trackName + '.mp3';
      this.$el = new Audio(url);
    };
    AudioTrack.prototype.toggleMute = function () {
      this.$el.muted = !this.$el.muted;
    };
    AudioTrack.prototype.play = function () {
      this.updateTime();
      this.$el.play();
    };
    AudioTrack.prototype.stop = function () {
      this.$el.pause();
    };
    AudioTrack.prototype.togglePlay = function () {
      if (this.$el.paused) {
        this.play();
      } else {
        this.stop();
      }
    };
    AudioTrack.prototype.updateTime = function () {
      this.$el.currentTime = click.currentTime();
    };
    // Public API
    return new AudioPlayer();
  }
]);'use strict';
// Setting up route
angular.module('core').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');
    // Home state routing
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'modules/core/views/public/home.client.view.html'
    }).state('admin', {
      url: '/admin',
      templateUrl: 'modules/core/views/admin/home.client.view.html'
    });
  }
]);'use strict';
angular.module('core').controller('HeaderController', [
  '$scope',
  'Authentication',
  'Menus',
  function ($scope, Authentication, Menus) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };
    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
  }
]);'use strict';
angular.module('core').controller('HomeController', [
  '$scope',
  'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
  }
]);'use strict';
var PUBLIC_TMP_PATH = 'tmp/';
var UPLOAD_ROUTE = '/upload';
angular.module('core').factory('fileupload', [
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
          return upl.success(function (data, status, headers, config) {
            var fileFullData = {
                'path': PUBLIC_TMP_PATH,
                'name': data.file.name
              };
            scope.push(fileFullData);
          });
        }
      };
    return factory;
  }
]);'use strict';
//Menu service used for managing  menus
angular.module('core').service('Menus', [function () {
    // Define a set of default roles
    this.defaultRoles = ['user'];
    // Define the menus object
    this.menus = {};
    // A private function for rendering decision 
    var shouldRender = function (user) {
      if (user) {
        for (var userRoleIndex in user.roles) {
          for (var roleIndex in this.roles) {
            if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
              return true;
            }
          }
        }
      } else {
        return this.isPublic;
      }
      return false;
    };
    // Validate menu existance
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exists');
        }
      } else {
        throw new Error('MenuId was not provided');
      }
      return false;
    };
    // Get the menu object by menu id
    this.getMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      return this.menus[menuId];
    };
    // Add new menu object by menu id
    this.addMenu = function (menuId, isPublic, roles) {
      // Create the new menu
      this.menus[menuId] = {
        isPublic: isPublic || false,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      };
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      delete this.menus[menuId];
    };
    // Add menu item object
    this.addMenuItem = function (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Push new menu item
      this.menus[menuId].items.push({
        title: menuItemTitle,
        link: menuItemURL,
        menuItemType: menuItemType || 'item',
        menuItemClass: menuItemType,
        uiRoute: menuItemUIRoute || '/' + menuItemURL,
        isPublic: isPublic || this.menus[menuId].isPublic,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      });
      // Return the menu object
      return this.menus[menuId];
    };
    // Add submenu item object
    this.addSubMenuItem = function (menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: menuItemTitle,
            link: menuItemURL,
            uiRoute: menuItemUIRoute || '/' + menuItemURL,
            isPublic: isPublic || this.menus[menuId].isPublic,
            roles: roles || this.defaultRoles,
            shouldRender: shouldRender
          });
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenuItem = function (menuId, menuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeSubMenuItem = function (menuId, submenuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    //Adding the topbar menu
    this.addMenu('topbar', true);
  }]);'use strict';
var defaultModalInstanceCtrl = function ($scope, $modalInstance, items) {
  $scope.items = items;
  $scope.selected = { item: $scope.items[0] };
  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};
angular.module('core').factory('openModal', [
  '$modal',
  function ($modal) {
    return function (next, scopeItems, modaCtrl, size) {
      if (typeof scopeItems === 'undefined')
        scopeItems = [];
      if (typeof modaCtrl === 'undefined')
        modaCtrl = defaultModalInstanceCtrl;
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
]);'use strict';
// Configuring the Genres module
angular.module('genres').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Genres', 'genres', 'dropdown', '/admin/genres(/create)?', 'false');
    Menus.addSubMenuItem('topbar', 'genres', 'List Genres', 'admin/genres', '/admin/genres', 'false');
    Menus.addSubMenuItem('topbar', 'genres', 'New Genre', 'admin/genres/create', 'admin/genres/create', 'false');
  }
]);'use strict';
// Setting up route
angular.module('genres').config([
  '$stateProvider',
  function ($stateProvider) {
    // Genres state routing
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
    ;
  }
]);'use strict';
angular.module('genres').controller('GenresController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Genres',
  'fileupload',
  'ngAudio',
  function ($scope, $stateParams, $location, Authentication, Genres, fileupload, ngAudio) {
    $scope.authentication = Authentication;
    var PUBLIC_IMAGE_PATH = 'common/images/genre/';
    var PUBLIC_AUDIO_PATH = 'common/audio/genre/';
    //////////////// CREATE INSTRUMENT ////////////////
    $scope.create = function () {
      var picList = [];
      $scope.picList.forEach(function (pic, index) {
        picList.push(pic.name);
      });
      var audioList = [];
      $scope.audioList.forEach(function (audio, index) {
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
      });
      this.name = '';
      this.description = '';
    };
    //////////////// DELETE INSTRUMENT ////////////////
    $scope.remove = function (genre) {
      if (genre) {
        genre.$remove();
        for (var i in $scope.genres) {
          if ($scope.genres[i] === genre) {
            $scope.genres.splice(i, 1);
          }
        }
      } else {
        $scope.genre.$remove(function () {
          $location.path('admin/genres');
        });
      }
    };
    //////////////// EDIT INSTRUMENT ////////////////
    $scope.update = function () {
      var genre = $scope.genre;
      var picList = [];
      $scope.picList.forEach(function (pic, index) {
        picList.push(pic.name);
      });
      genre.pics = picList;
      var audioList = [];
      $scope.audioList.forEach(function (audio, index) {
        audioList.push(audio.name);
      });
      genre.audio = audioList;
      genre.$update(function () {
        $location.path('admin/genres/' + genre._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    //////////////// LIST INSTRUMENT ////////////////
    $scope.find = function () {
      $scope.genres = Genres.query();
    };
    //////////////// VIEW INSTRUMENT ////////////////
    $scope.findOne = function () {
      var Genre = Genres.get({ genreId: $stateParams.genreId }, function () {
          var picList = [];
          var audioList = [];
          $scope.genre = Genre;
          Genre.pics.forEach(function (pic, index) {
            var picFullData = {
                'path': PUBLIC_IMAGE_PATH + Genre._id + '/',
                'name': pic
              };
            picList.push(picFullData);
          });
          $scope.picList = picList;
          Genre.audio.forEach(function (audio, index) {
            var audioFullData = {
                'path': PUBLIC_AUDIO_PATH + Genre._id + '/',
                'name': audio
              };
            audioList.push(audioFullData);
          });
          $scope.audioList = audioList;
        });
    };
    //////////////// FileUpload ////////////////
    $scope.audioList = [];
    $scope.picList = [];
    $scope.picPercent = {
      value: parseInt(0),
      set: function (value) {
        this.value = value;
      }
    };
    $scope.audioPercent = {
      value: parseInt(0),
      set: function (value) {
        this.value = value;
      }
    };
    $scope.removeFile = function ($file, type) {
      if (type === 'image')
        $scope.picList.splice($scope.picList.indexOf($file), 1);
      if (type === 'audio')
        $scope.audioList.splice($scope.audioList.indexOf($file), 1);
    };
    $scope.onFileSelect = function ($files, type) {
      for (var i = 0; i < $files.length; i++) {
        var upl = fileupload.upload($files[i]);
        if (type === 'image') {
          fileupload.progress(upl, $scope.picPercent);
          fileupload.success(upl, $scope.picList);
        }
        if (type === 'audio') {
          fileupload.progress(upl, $scope.audioPercent);
          fileupload.success(upl, $scope.audioList);
        }
      }
    };
  }
]);'use strict';
//Genres service used for communicating with the genres REST endpoints
angular.module('genres').factory('Genres', [
  '$resource',
  function ($resource) {
    return $resource('genres/:genreId', { genreId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Configuring the Instruments module
angular.module('instruments').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Instruments', 'instruments', 'dropdown', '/admin/instruments(/create)?', 'false');
    Menus.addSubMenuItem('topbar', 'instruments', 'List Instruments', 'admin/instruments', '/admin/instruments', 'false');
    Menus.addSubMenuItem('topbar', 'instruments', 'New Instrument', 'admin/instruments/create', 'admin/instruments/create', 'false');
  }
]);'use strict';
// Setting up route
angular.module('instruments').config([
  '$stateProvider',
  function ($stateProvider) {
    // Instruments state routing
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
    ;
  }
]);'use strict';
angular.module('instruments').controller('InstrumentsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Instruments',
  'fileupload',
  'ngAudio',
  function ($scope, $stateParams, $location, Authentication, Instruments, fileupload, ngAudio) {
    $scope.authentication = Authentication;
    var PUBLIC_IMAGE_PATH = 'common/images/instrument/';
    var PUBLIC_AUDIO_PATH = 'common/audio/instrument/';
    //////////////// CREATE INSTRUMENT ////////////////
    $scope.create = function () {
      var picList = [];
      $scope.picList.forEach(function (pic, index) {
        picList.push(pic.name);
      });
      var audioList = [];
      $scope.audioList.forEach(function (audio, index) {
        audioList.push(audio.name);
      });
      var instrument = new Instruments({
          name: this.name,
          description: this.description,
          pics: picList,
          audio: audioList
        });
      instrument.$save(function (response) {
        $location.path('admin/instruments/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      this.name = '';
      this.description = '';
    };
    //////////////// DELETE INSTRUMENT ////////////////
    $scope.remove = function (instrument) {
      if (instrument) {
        instrument.$remove();
        for (var i in $scope.instruments) {
          if ($scope.instruments[i] === instrument) {
            $scope.instruments.splice(i, 1);
          }
        }
      } else {
        $scope.instrument.$remove(function () {
          $location.path('admin/instruments');
        });
      }
    };
    //////////////// EDIT INSTRUMENT ////////////////
    $scope.update = function () {
      var instrument = $scope.instrument;
      var picList = [];
      $scope.picList.forEach(function (pic, index) {
        picList.push(pic.name);
      });
      instrument.pics = picList;
      var audioList = [];
      $scope.audioList.forEach(function (audio, index) {
        audioList.push(audio.name);
      });
      instrument.audio = audioList;
      instrument.$update(function () {
        $location.path('admin/instruments/' + instrument._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    //////////////// LIST INSTRUMENT ////////////////
    $scope.find = function () {
      $scope.instruments = Instruments.query();
    };
    //////////////// VIEW INSTRUMENT ////////////////
    $scope.findOne = function () {
      var Instrument = Instruments.get({ instrumentId: $stateParams.instrumentId }, function () {
          var picList = [];
          var audioList = [];
          $scope.instrument = Instrument;
          Instrument.pics.forEach(function (pic, index) {
            var picFullData = {
                'path': PUBLIC_IMAGE_PATH + Instrument._id + '/',
                'name': pic
              };
            picList.push(picFullData);
          });
          $scope.picList = picList;
          Instrument.audio.forEach(function (audio, index) {
            var audioFullData = {
                'path': PUBLIC_AUDIO_PATH + Instrument._id + '/',
                'name': audio
              };
            audioList.push(audioFullData);
          });
          $scope.audioList = audioList;
        });
    };
    //////////////// FileUpload ////////////////
    $scope.audioList = [];
    $scope.picList = [];
    $scope.picPercent = {
      value: parseInt(0),
      set: function (value) {
        this.value = value;
      }
    };
    $scope.audioPercent = {
      value: parseInt(0),
      set: function (value) {
        this.value = value;
      }
    };
    $scope.removeFile = function ($file, type) {
      if (type === 'image')
        $scope.picList.splice($scope.picList.indexOf($file), 1);
      if (type === 'audio')
        $scope.audioList.splice($scope.audioList.indexOf($file), 1);
    };
    $scope.onFileSelect = function ($files, type) {
      for (var i = 0; i < $files.length; i++) {
        var upl = fileupload.upload($files[i]);
        if (type === 'image') {
          fileupload.progress(upl, $scope.picPercent);
          fileupload.success(upl, $scope.picList);
        }
        if (type === 'audio') {
          fileupload.progress(upl, $scope.audioPercent);
          fileupload.success(upl, $scope.audioList);
        }
      }
    };
  }
]);'use strict';
//Instruments service used for communicating with the instruments REST endpoints
angular.module('instruments').factory('Instruments', [
  '$resource',
  function ($resource) {
    return $resource('instruments/:instrumentId', { instrumentId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Configuring the Regions module
angular.module('regions').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Regions', 'regions', 'dropdown', '/admin/regions(/create)?', 'false');
    Menus.addSubMenuItem('topbar', 'regions', 'List Regions', 'admin/regions', '/admin/regions', 'false');
    Menus.addSubMenuItem('topbar', 'regions', 'New Region', 'admin/regions/create', 'admin/regions/create', 'false');
  }
]);'use strict';
// Setting up route
angular.module('regions').config([
  '$stateProvider',
  function ($stateProvider) {
    // Regions state routing
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
    });
    ;
  }
]);'use strict';
angular.module('regions').controller('RegionsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Regions',
  'openModal',
  'fileupload',
  'Instruments',
  function ($scope, $stateParams, $location, Authentication, Regions, openModal, fileupload, Instruments) {
    var PUBLIC_IMAGE_PATH = 'common/images/region/';
    $scope.authentication = Authentication;
    $scope.Instruments = Instruments.query();
    //////////////// CREATE REGION ////////////////			
    $scope.create = function () {
      var picList = [];
      $scope.picList.forEach(function (pic, index) {
        picList.push(pic.name);
      });
      var region = new Regions({
          name: this.name,
          description: this.description,
          instruments: this.instruments,
          pics: picList
        });
      region.$save(function (response) {
        $location.path('admin/regions/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      this.name = '';
      this.description = '';
    };
    //////////////// DELETE REGION ////////////////
    $scope.remove = function (region) {
      if (region) {
        region.$remove();
        for (var i in $scope.regions) {
          if ($scope.regions[i] === region) {
            $scope.regions.splice(i, 1);
          }
        }
      } else {
        $scope.region.$remove(function () {
          $location.path('admin/regions');
        });
      }
    };
    //////////////// EDIT REGION ////////////////
    $scope.update = function () {
      var region = $scope.region;
      var picList = [];
      $scope.picList.forEach(function (pic, index) {
        picList.push(pic.name);
      });
      region.pics = picList;
      region.$update(function () {
        $location.path('admin/regions/' + region._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    //////////////// LIST REGIONS ////////////////
    $scope.find = function () {
      $scope.regions = Regions.query();
    };
    //////////////// VIEW REGION ////////////////
    $scope.findOne = function () {
      var Region = Regions.get({ regionId: $stateParams.regionId }, function () {
          var instrumentList = [];
          $scope.region = Region;
          Region.instruments.forEach(function (selectedElement, index) {
            instrumentList.push(Instruments.get({ instrumentId: selectedElement }));
          });
          $scope.instruments = instrumentList;
          var picList = [];
          $scope.region = Region;
          Region.pics.forEach(function (pic, index) {
            var picFullData = {
                'path': PUBLIC_IMAGE_PATH + Region._id + '/',
                'name': pic
              };
            picList.push(picFullData);
          });
          $scope.picList = picList;
        });
    };
    //////////////// FileUpload ////////////////
    $scope.picList = [];
    $scope.percent = {
      value: parseInt(0),
      set: function (value) {
        this.value = value;
      }
    };
    $scope.removeFile = function ($file) {
      $scope.picList.splice($scope.picList.indexOf($file), 1);
    };
    $scope.onFileSelect = function ($files) {
      for (var i = 0; i < $files.length; i++) {
        var upl = fileupload.upload($files[i]);
        fileupload.progress(upl, $scope.percent);
        fileupload.success(upl, $scope.picList);
      }
    };
    //////////////// MODAL ////////////////
    $scope.open = function () {
      openModal(function (data) {
        console.log(data);
      }, [
        'a',
        'b'
      ]);
    };
  }
]);
//TODO: esta directive es una mochada, cambiar por algo mejor...
angular.module('regions').directive('multiselect', [
  '$stateParams',
  'Instruments',
  'Regions',
  function ($stateParams, Instruments, Regions) {
    return function (scope, element, attrs) {
      var resourceDependencies = { 'Instruments': Instruments };
      var Resource = attrs.ngData;
      var elementId = attrs.id;
      var selectedItems = attrs.ngSelection;
      element.multiselect({ enableFiltering: true });
      resourceDependencies[Resource].query(function (response) {
        var itemsList = [];
        response.forEach(function (resource, index) {
          var item = {
              'label': resource.name,
              'value': resource._id
            };
          itemsList.push(item);
        });
        element.multiselect('dataprovider', itemsList);
        if ($stateParams.regionId) {
          var Region = Regions.get({ regionId: $stateParams.regionId }, function () {
              Region[elementId].forEach(function (selectedElement, index) {
                element.multiselect('select', selectedElement);
              });
            });
        }
      });
    };
  }
]);/**
 * bootstrap-multiselect.js
 * https://github.com/davidstutz/bootstrap-multiselect
 *
 * Copyright 2012 - 2014 David Stutz
 *
 * Dual licensed under the BSD-3-Clause and the Apache License, Version 2.0.
 */
/* jshint ignore:start */
!function ($) {
  'use strict';
  if (Array.prototype.forEach === null || Array.prototype.forEach === undefined) {
    Array.prototype.forEach = function (func) {
      var index;
      for (index = 0; index < this.length; ++index) {
        func(this[index]);
      }
    };
  }
  var ko;
  if (typeof ko !== 'undefined' && ko.bindingHandlers && !ko.bindingHandlers.multiselect) {
    ko.bindingHandlers.multiselect = {
      init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var listOfSelectedItems = allBindingsAccessor().selectedOptions, config = ko.utils.unwrapObservable(valueAccessor());
        $(element).multiselect(config);
        if (isObservableArray(listOfSelectedItems)) {
          // Subscribe to the selectedOptions: ko.observableArray
          listOfSelectedItems.subscribe(function (changes) {
            var addedArray = [], deletedArray = [];
            changes.forEach(function (change) {
              switch (change.status) {
              case 'added':
                addedArray.push(change.value);
                break;
              case 'deleted':
                deletedArray.push(change.value);
                break;
              }
            });
            if (addedArray.length > 0) {
              $(element).multiselect('select', addedArray);
            }
            if (deletedArray.length > 0) {
              $(element).multiselect('deselect', deletedArray);
            }
          }, null, 'arrayChange');
        }
      },
      update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var listOfItems = allBindingsAccessor().options, ms = $(element).data('multiselect'), config = ko.utils.unwrapObservable(valueAccessor());
        if (isObservableArray(listOfItems)) {
          // Subscribe to the options: ko.observableArray incase it changes later
          listOfItems.subscribe(function (theArray) {
            $(element).multiselect('rebuild');
          });
        }
        if (!ms) {
          $(element).multiselect(config);
        } else {
          ms.updateOriginalOptions();
        }
      }
    };
  }
  function isObservableArray(obj) {
    return ko.isObservable(obj) && obj.destroyAll !== undefined;
  }
  /**
     * Constructor to create a new multiselect using the given select.
     * 
     * @param {jQuery} select
     * @param {Object} options
     * @returns {Multiselect}
     */
  function Multiselect(select, options) {
    this.options = this.mergeOptions(options);
    this.$select = $(select);
    // Initialization.
    // We have to clone to create a new reference.
    this.originalOptions = this.$select.clone()[0].options;
    this.query = '';
    this.searchTimeout = null;
    this.options.multiple = this.$select.attr('multiple') === 'multiple';
    this.options.onChange = $.proxy(this.options.onChange, this);
    this.options.onDropdownShow = $.proxy(this.options.onDropdownShow, this);
    this.options.onDropdownHide = $.proxy(this.options.onDropdownHide, this);
    // Build select all if enabled.
    this.buildContainer();
    this.buildButton();
    this.buildDropdown();
    this.buildSelectAll();
    this.buildDropdownOptions();
    this.buildFilter();
    this.updateButtonText();
    this.updateSelectAll();
    this.$select.hide().after(this.$container);
  }
  Multiselect.prototype = {
    defaults: {
      buttonText: function (options, select) {
        if (options.length === 0) {
          return this.nonSelectedText + ' <b class="caret"></b>';
        } else {
          if (options.length > this.numberDisplayed) {
            return options.length + ' ' + this.nSelectedText + ' <b class="caret"></b>';
          } else {
            var selected = '';
            options.each(function () {
              var label = $(this).attr('label') !== undefined ? $(this).attr('label') : $(this).html();
              selected += label + ', ';
            });
            return selected.substr(0, selected.length - 2) + ' <b class="caret"></b>';
          }
        }
      },
      buttonTitle: function (options, select) {
        if (options.length === 0) {
          return this.nonSelectedText;
        } else {
          var selected = '';
          options.each(function () {
            selected += $(this).text() + ', ';
          });
          return selected.substr(0, selected.length - 2);
        }
      },
      label: function (element) {
        return $(element).attr('label') || $(element).html();
      },
      onChange: function (option, checked) {
      },
      onDropdownShow: function (event) {
      },
      onDropdownHide: function (event) {
      },
      buttonClass: 'btn btn-default',
      dropRight: false,
      selectedClass: 'active',
      buttonWidth: 'auto',
      buttonContainer: '<div class="btn-group" />',
      maxHeight: false,
      checkboxName: 'multiselect',
      includeSelectAllOption: false,
      includeSelectAllIfMoreThan: 0,
      selectAllText: ' Select all',
      selectAllValue: 'multiselect-all',
      enableFiltering: false,
      enableCaseInsensitiveFiltering: false,
      filterPlaceholder: 'Search',
      filterBehavior: 'text',
      preventInputChangeEvent: false,
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
      this.$container = $(this.options.buttonContainer);
      this.$container.on('show.bs.dropdown', this.options.onDropdownShow);
      this.$container.on('hide.bs.dropdown', this.options.onDropdownHide);
    },
    buildButton: function () {
      this.$button = $(this.options.templates.button).addClass(this.options.buttonClass);
      // Adopt active state.
      if (this.$select.prop('disabled')) {
        this.disable();
      } else {
        this.enable();
      }
      // Manually add button width if set.
      if (this.options.buttonWidth && this.options.buttonWidth !== 'auto') {
        this.$button.css({ 'width': this.options.buttonWidth });
      }
      // Keep the tab index from the select.
      var tabindex = this.$select.attr('tabindex');
      if (tabindex) {
        this.$button.attr('tabindex', tabindex);
      }
      this.$container.prepend(this.$button);
    },
    buildDropdown: function () {
      // Build ul.
      this.$ul = $(this.options.templates.ul);
      if (this.options.dropRight) {
        this.$ul.addClass('pull-right');
      }
      // Set max height of dropdown menu to activate auto scrollbar.
      if (this.options.maxHeight) {
        // TODO: Add a class for this option to move the css declarations.
        this.$ul.css({
          'max-height': this.options.maxHeight + 'px',
          'overflow-y': 'auto',
          'overflow-x': 'hidden'
        });
      }
      this.$container.append(this.$ul);
    },
    buildDropdownOptions: function () {
      this.$select.children().each($.proxy(function (index, element) {
        // Support optgroups and options without a group simultaneously.
        var tag = $(element).prop('tagName').toLowerCase();
        if (tag === 'optgroup') {
          this.createOptgroup(element);
        } else if (tag === 'option') {
          if ($(element).data('role') === 'divider') {
            this.createDivider();
          } else {
            this.createOptionValue(element);
          }
        }  // Other illegal tags will be ignored.
      }, this));
      // Bind the change event on the dropdown elements.
      $('li input', this.$ul).on('change', $.proxy(function (event) {
        var $target = $(event.target);
        var checked = $target.prop('checked') || false;
        var isSelectAllOption = $target.val() === this.options.selectAllValue;
        // Apply or unapply the configured selected class.
        if (this.options.selectedClass) {
          if (checked) {
            $target.parents('li').addClass(this.options.selectedClass);
          } else {
            $target.parents('li').removeClass(this.options.selectedClass);
          }
        }
        // Get the corresponding option.
        var value = $target.val();
        var $option = this.getOptionByValue(value);
        var $optionsNotThis = $('option', this.$select).not($option);
        var $checkboxesNotThis = $('input', this.$container).not($target);
        if (isSelectAllOption) {
          if (checked) {
            this.selectall();
          } else {
            this.deselectall();
          }
        }
        if (!isSelectAllOption) {
          if (checked) {
            $option.prop('selected', true);
            if (this.options.multiple) {
              // Simply select additional option.
              $option.prop('selected', true);
            } else {
              // Unselect all other options and corresponding checkboxes.
              if (this.options.selectedClass) {
                $($checkboxesNotThis).parents('li').removeClass(this.options.selectedClass);
              }
              $($checkboxesNotThis).prop('checked', false);
              $optionsNotThis.prop('selected', false);
              // It's a single selection, so close.
              this.$button.click();
            }
            if (this.options.selectedClass === 'active') {
              $optionsNotThis.parents('a').css('outline', '');
            }
          } else {
            // Unselect option.
            $option.prop('selected', false);
          }
        }
        this.$select.change();
        this.updateButtonText();
        this.updateSelectAll();
        this.options.onChange($option, checked);
        if (this.options.preventInputChangeEvent) {
          return false;
        }
      }, this));
      $('li a', this.$ul).on('touchstart click', function (event) {
        event.stopPropagation();
        var $target = $(event.target);
        if (event.shiftKey) {
          var checked = $target.prop('checked') || false;
          if (checked) {
            var prev = $target.parents('li:last').siblings('li[class="active"]:first');
            var currentIdx = $target.parents('li').index();
            var prevIdx = prev.index();
            if (currentIdx > prevIdx) {
              $target.parents('li:last').prevUntil(prev).each(function () {
                $(this).find('input:first').prop('checked', true).trigger('change');
              });
            } else {
              $target.parents('li:last').nextUntil(prev).each(function () {
                $(this).find('input:first').prop('checked', true).trigger('change');
              });
            }
          }
        }
        $target.blur();
      });
      // Keyboard support.
      this.$container.off('keydown.multiselect').on('keydown.multiselect', $.proxy(function (event) {
        if ($('input[type="text"]', this.$container).is(':focus')) {
          return;
        }
        if ((event.keyCode === 9 || event.keyCode === 27) && this.$container.hasClass('open')) {
          // Close on tab or escape.
          this.$button.click();
        } else {
          var $items = $(this.$container).find('li:not(.divider):not(.disabled) a').filter(':visible');
          if (!$items.length) {
            return;
          }
          var index = $items.index($items.filter(':focus'));
          // Navigation up.
          if (event.keyCode === 38 && index > 0) {
            index--;
          }  // Navigate down.
          else if (event.keyCode === 40 && index < $items.length - 1) {
            index++;
          } else if (!~index) {
            index = 0;
          }
          var $current = $items.eq(index);
          $current.focus();
          if (event.keyCode === 32 || event.keyCode === 13) {
            var $checkbox = $current.find('input');
            $checkbox.prop('checked', !$checkbox.prop('checked'));
            $checkbox.change();
          }
          event.stopPropagation();
          event.preventDefault();
        }
      }, this));
    },
    createOptionValue: function (element) {
      if ($(element).is(':selected')) {
        $(element).prop('selected', true);
      }
      // Support the label attribute on options.
      var label = this.options.label(element);
      var value = $(element).val();
      var inputType = this.options.multiple ? 'checkbox' : 'radio';
      var $li = $(this.options.templates.li);
      $('label', $li).addClass(inputType);
      $('label', $li).append('<input type="' + inputType + '" name="' + this.options.checkboxName + '" />');
      var selected = $(element).prop('selected') || false;
      var $checkbox = $('input', $li);
      $checkbox.val(value);
      if (value === this.options.selectAllValue) {
        $li.addClass('multiselect-item multiselect-all');
        $checkbox.parent().parent().addClass('multiselect-all');
      }
      $('label', $li).append(' ' + label);
      this.$ul.append($li);
      if ($(element).is(':disabled')) {
        $checkbox.attr('disabled', 'disabled').prop('disabled', true).parents('a').attr('tabindex', '-1').parents('li').addClass('disabled');
      }
      $checkbox.prop('checked', selected);
      if (selected && this.options.selectedClass) {
        $checkbox.parents('li').addClass(this.options.selectedClass);
      }
    },
    createDivider: function (element) {
      var $divider = $(this.options.templates.divider);
      this.$ul.append($divider);
    },
    createOptgroup: function (group) {
      var groupName = $(group).prop('label');
      // Add a header for the group.
      var $li = $(this.options.templates.liGroup);
      $('label', $li).text(groupName);
      this.$ul.append($li);
      if ($(group).is(':disabled')) {
        $li.addClass('disabled');
      }
      // Add the options of the group.
      $('option', group).each($.proxy(function (index, element) {
        this.createOptionValue(element);
      }, this));
    },
    buildSelectAll: function () {
      var alreadyHasSelectAll = this.hasSelectAll();
      if (!alreadyHasSelectAll && this.options.includeSelectAllOption && this.options.multiple && $('option', this.$select).length > this.options.includeSelectAllIfMoreThan) {
        // Check whether to add a divider after the select all.
        if (this.options.includeSelectAllDivider) {
          this.$ul.prepend($(this.options.templates.divider));
        }
        var $li = $(this.options.templates.li);
        $('label', $li).addClass('checkbox');
        $('label', $li).append('<input type="checkbox" name="' + this.options.checkboxName + '" />');
        var $checkbox = $('input', $li);
        $checkbox.val(this.options.selectAllValue);
        $li.addClass('multiselect-item multiselect-all');
        $checkbox.parent().parent().addClass('multiselect-all');
        $('label', $li).append(' ' + this.options.selectAllText);
        this.$ul.prepend($li);
        $checkbox.prop('checked', false);
      }
    },
    buildFilter: function () {
      // Build filter if filtering OR case insensitive filtering is enabled and the number of options exceeds (or equals) enableFilterLength.
      if (this.options.enableFiltering || this.options.enableCaseInsensitiveFiltering) {
        var enableFilterLength = Math.max(this.options.enableFiltering, this.options.enableCaseInsensitiveFiltering);
        if (this.$select.find('option').length >= enableFilterLength) {
          this.$filter = $(this.options.templates.filter);
          $('input', this.$filter).attr('placeholder', this.options.filterPlaceholder);
          this.$ul.prepend(this.$filter);
          this.$filter.val(this.query).on('click', function (event) {
            event.stopPropagation();
          }).on('input keydown', $.proxy(function (event) {
            // This is useful to catch "keydown" events after the browser has updated the control.
            clearTimeout(this.searchTimeout);
            this.searchTimeout = this.asyncFunction($.proxy(function () {
              if (this.query !== event.target.value) {
                this.query = event.target.value;
                $.each($('li', this.$ul), $.proxy(function (index, element) {
                  var value = $('input', element).val();
                  var text = $('label', element).text();
                  var filterCandidate = '';
                  if (this.options.filterBehavior === 'text') {
                    filterCandidate = text;
                  } else if (this.options.filterBehavior === 'value') {
                    filterCandidate = value;
                  } else if (this.options.filterBehavior === 'both') {
                    filterCandidate = text + '\n' + value;
                  }
                  if (value !== this.options.selectAllValue && text) {
                    // by default lets assume that element is not
                    // interesting for this search
                    var showElement = false;
                    if (this.options.enableCaseInsensitiveFiltering && filterCandidate.toLowerCase().indexOf(this.query.toLowerCase()) > -1) {
                      showElement = true;
                    } else if (filterCandidate.indexOf(this.query) > -1) {
                      showElement = true;
                    }
                    if (showElement) {
                      $(element).show().removeClass('filter-hidden');
                    } else {
                      $(element).hide().addClass('filter-hidden');
                    }
                  }
                }, this));
              }
              this.updateSelectAll();
            }, this), 300, this);
          }, this));
        }
      }
    },
    destroy: function () {
      this.$container.remove();
      this.$select.show();
      this.$select.data('multiselect', null);
    },
    refresh: function () {
      $('option', this.$select).each($.proxy(function (index, element) {
        var $input = $('li input', this.$ul).filter(function () {
            return $(this).val() === $(element).val();
          });
        if ($(element).is(':selected')) {
          $input.prop('checked', true);
          if (this.options.selectedClass) {
            $input.parents('li').addClass(this.options.selectedClass);
          }
        } else {
          $input.prop('checked', false);
          if (this.options.selectedClass) {
            $input.parents('li').removeClass(this.options.selectedClass);
          }
        }
        if ($(element).is(':disabled')) {
          $input.attr('disabled', 'disabled').prop('disabled', true).parents('li').addClass('disabled');
        } else {
          $input.prop('disabled', false).parents('li').removeClass('disabled');
        }
      }, this));
      this.updateButtonText();
      this.updateSelectAll();
    },
    select: function (selectValues) {
      if (!$.isArray(selectValues)) {
        selectValues = [selectValues];
      }
      for (var i = 0; i < selectValues.length; i++) {
        var value = selectValues[i];
        var $option = this.getOptionByValue(value);
        var $checkbox = this.getInputByValue(value);
        if (this.options.selectedClass) {
          $checkbox.parents('li').addClass(this.options.selectedClass);
        }
        $checkbox.prop('checked', true);
        $option.prop('selected', true);
      }
      this.updateButtonText();
    },
    clearSelection: function () {
      this.deselectall(false);
      this.updateButtonText();
      this.updateSelectAll();
    },
    deselect: function (deselectValues) {
      if (!$.isArray(deselectValues)) {
        deselectValues = [deselectValues];
      }
      for (var i = 0; i < deselectValues.length; i++) {
        var value = deselectValues[i];
        var $option = this.getOptionByValue(value);
        var $checkbox = this.getInputByValue(value);
        if (this.options.selectedClass) {
          $checkbox.parents('li').removeClass(this.options.selectedClass);
        }
        $checkbox.prop('checked', false);
        $option.prop('selected', false);
      }
      this.updateButtonText();
    },
    selectall: function () {
      var allCheckboxes = $('li input[type="checkbox"]:enabled', this.$ul), visibleCheckboxes = allCheckboxes.filter(':visible'), allCheckboxesCount = allCheckboxes.length, visibleCheckboxesCount = visibleCheckboxes.length;
      visibleCheckboxes.prop('checked', true);
      $('li:not(.divider):not(.disabled)', this.$ul).filter(':visible').addClass(this.options.selectedClass);
      if (allCheckboxesCount === visibleCheckboxesCount) {
        $('option:enabled', this.$select).prop('selected', true);
      } else {
        var values = visibleCheckboxes.map(function () {
            return $(this).val();
          }).get();
        $('option:enabled', this.$select).filter(function (index) {
          return $.inArray($(this).val(), values) !== -1;
        }).prop('selected', true);
      }
    },
    deselectall: function (justVisible) {
      var allCheckboxes = $('li input[type="checkbox"]:enabled', this.$ul);
      var visibleCheckboxes = void 0;
      justVisible = typeof justVisible === 'undefined' ? true : justVisible;
      if (justVisible) {
        var values = void 0;
        visibleCheckboxes = allCheckboxes.filter(':visible');
        visibleCheckboxes.prop('checked', false);
        values = visibleCheckboxes.map(function () {
          return $(this).val();
        }).get();
        $('option:enabled', this.$select).filter(function (index) {
          return $.inArray($(this).val(), values) !== -1;
        }).prop('selected', false);
        $('li:not(.divider):not(.disabled)', this.$ul).filter(':visible').removeClass(this.options.selectedClass);
      } else {
        allCheckboxes.prop('checked', false);
        $('option:enabled', this.$select).prop('selected', false);
        $('li:not(.divider):not(.disabled)', this.$ul).removeClass(this.options.selectedClass);
      }
    },
    rebuild: function () {
      this.$ul.html('');
      // Important to distinguish between radios and checkboxes.
      this.options.multiple = this.$select.attr('multiple') === 'multiple';
      this.buildSelectAll();
      this.buildDropdownOptions();
      this.buildFilter();
      this.updateButtonText();
      this.updateSelectAll();
    },
    dataprovider: function (dataprovider) {
      var optionDOM = '';
      dataprovider.forEach(function (option) {
        optionDOM += '<option value="' + option.value + '">' + option.label + '</option>';
      });
      this.$select.html(optionDOM);
      this.rebuild();
    },
    enable: function () {
      this.$select.prop('disabled', false);
      this.$button.prop('disabled', false).removeClass('disabled');
    },
    disable: function () {
      this.$select.prop('disabled', true);
      this.$button.prop('disabled', true).addClass('disabled');
    },
    setOptions: function (options) {
      this.options = this.mergeOptions(options);
    },
    mergeOptions: function (options) {
      return $.extend(true, {}, this.defaults, options);
    },
    hasSelectAll: function () {
      return $('li.' + this.options.selectAllValue, this.$ul).length > 0;
    },
    updateSelectAll: function () {
      if (this.hasSelectAll()) {
        var allBoxes = $('li:not(.multiselect-item):not(.filter-hidden) input:enabled', this.$ul), allBoxesLength = allBoxes.length, checkedBoxesLength = allBoxes.filter(':checked').length, selectAllLi = $('li.' + this.options.selectAllValue, this.$ul), selectAllInput = selectAllLi.find('input');
        if (checkedBoxesLength > 0 && checkedBoxesLength === allBoxesLength) {
          selectAllInput.prop('checked', true);
          selectAllLi.addClass(this.options.selectedClass);
        } else {
          selectAllInput.prop('checked', false);
          selectAllLi.removeClass(this.options.selectedClass);
        }
      }
    },
    updateButtonText: function () {
      var options = this.getSelected();
      // First update the displayed button text.
      $('button', this.$container).html(this.options.buttonText(options, this.$select));
      // Now update the title attribute of the button.
      $('button', this.$container).attr('title', this.options.buttonTitle(options, this.$select));
    },
    getSelected: function () {
      return $('option', this.$select).filter(':selected');
    },
    getOptionByValue: function (value) {
      var options = $('option', this.$select);
      var valueToCompare = value.toString();
      for (var i = 0; i < options.length; i = i + 1) {
        var option = options[i];
        if (option.value === valueToCompare) {
          return $(option);
        }
      }
    },
    getInputByValue: function (value) {
      var checkboxes = $('li input', this.$ul);
      var valueToCompare = value.toString();
      for (var i = 0; i < checkboxes.length; i = i + 1) {
        var checkbox = checkboxes[i];
        if (checkbox.value === valueToCompare) {
          return $(checkbox);
        }
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
  };
  $.fn.multiselect = function (option, parameter) {
    return this.each(function () {
      var data = $(this).data('multiselect');
      var options = typeof option === 'object' && option;
      // Initialize the multiselect.
      if (!data) {
        data = new Multiselect(this, options);
        $(this).data('multiselect', data);
      }
      // Call multiselect method.
      if (typeof option === 'string') {
        data[option](parameter);
        if (option === 'destroy') {
          $(this).data('multiselect', false);
        }
      }
    });
  };
  $.fn.multiselect.Constructor = Multiselect;
  $(function () {
    $('select[data-role=multiselect]').multiselect();
  });
}(window.jQuery);  /* jshint ignore:end */'use strict';
//Regions service used for communicating with the regions REST endpoints
angular.module('regions').factory('Regions', [
  '$resource',
  function ($resource) {
    return $resource('regions/:regionId', { regionId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Config HTTP Error Handling
angular.module('users').config([
  '$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
            case 401:
              // Deauthenticate the global user
              Authentication.user = null;
              // Redirect to signin page
              $location.path('signin');
              break;
            case 403:
              // Add unauthorized behaviour 
              break;
            }
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);'use strict';
// Setting up route
angular.module('users').config([
  '$stateProvider',
  function ($stateProvider) {
    // Users state routing
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
]);'use strict';
angular.module('users').controller('AuthenticationController', [
  '$scope',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    //If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    $scope.signup = function () {
      $http.post('/auth/signup', $scope.credentials).success(function (response) {
        //If successful we assign the response to the global user model
        $scope.authentication.user = response;
        //And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    $scope.signin = function () {
      $http.post('/auth/signin', $scope.credentials).success(function (response) {
        //If successful we assign the response to the global user model
        $scope.authentication.user = response;
        //And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('SettingsController', [
  '$scope',
  '$http',
  '$location',
  'Users',
  'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/');
    // Check if there are additional accounts 
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }
      return false;
    };
    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || $scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider];
    };
    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;
      $http.delete('/users/accounts', { params: { provider: provider } }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    // Update a user profile
    $scope.updateUserProfile = function () {
      $scope.success = $scope.error = null;
      var user = new Users($scope.user);
      user.$update(function (response) {
        $scope.success = true;
        Authentication.user = response;
      }, function (response) {
        $scope.error = response.data.message;
      });
    };
    // Change user password
    $scope.changeUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
// Authentication service for user variables
angular.module('users').factory('Authentication', [function () {
    var _this = this;
    _this._data = { user: window.user };
    return _this._data;
  }]);'use strict';
// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', [
  '$resource',
  function ($resource) {
    return $resource('users', {}, { update: { method: 'PUT' } });
  }
]);
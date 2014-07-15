'use strict';

angular.module('composer').controller('ComposerController', ['$scope', 'composer',
	function($scope, composer) {
    angular.extend($scope, {
      instruments : composer.tracksConfig,
      selectedInstrument: composer.tracksConfig[0],
      changeInstrument: function(instrument) {
        $scope.selectedInstrument = instrument;
      },
      play : function() {
        composer.play();
      },
      stop : function() {
        composer.stop();
      },
      closeMessage: function() {
        $scope.messageTemplate = null;
      },
      templateName : function(messageTemplate) {
        return messageTemplate ? messageTemplate + '.html' : null;
      },
      confirmNew : function() {
        $scope.messageTemplate = 'new';
      },
      confirmExample : function() {
        $scope.messageTemplate = 'example';
      },
      new: function() {
        composer.cleanUp();
        $scope.closeMessage();
      },
      wipe : function() {
        $scope.messageTemplate = 'wipe';
      }
    });
	}
]);
'use strict';

angular.module('composer').controller('ComposerController', ['$scope', 'player',
	function($scope, player) {

    angular.extend($scope, {

      tracks : ['quena', 'charango', 'chaschas', 'bombo'],
      selectedInstrument: 'bombo',

      selectedInstrumentImg: function() {
        return this.selectedInstrument + '-grande.png';
      },

      play : function() {
        player.play();
      },

      stop : function() {
        player.stop();
      },

      closeMessage: function() {
        $scope.messageTemplate = null;
      },

      templateName : function(messageTemplate) {
        console.log(messageTemplate ? messageTemplate + '.html' : null);
        return messageTemplate ? messageTemplate + '.html' : null;
      },

      new : function() {
        $scope.messageTemplate = 'new';
        console.log($scope.messageTemplate);
      },

      wipe : function() {
        $scope.messageTemplate = 'wipe';
        console.log($scope.messageTemplate);
      }
    });
	}
]);
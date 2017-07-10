/*global angular*/
'use strict';

angular.module('composer').directive('sample', ['composer', 'Tracks', '_', '$stateParams',
function(composer, Tracks, _, $stateParams) {
  return {
    templateUrl: '/modules/core/views/composer/sample.directive.html',
    restrict: 'E',
    scope: {
      instrument: '=',
      sample: '=',
      track: '='
    },
    link: function postLink(scope, element, attrs) {
      var instrumentName = scope.instrument.toLowerCase(),
        tracked = scope.track !== undefined;
      angular.extend(scope, {
        indexer: function() {
          if (!$stateParams.regionName) return [];
          var samples = _.findWhere(Tracks[$stateParams.regionName], { name: scope.instrument }).samples;

          var query = { beats: scope.sample.beats };          
          if (scope.sample.group) {
            query.group = scope.sample.group;
          }
          samples = _.where(samples, query);

          var sample = _.findWhere(samples, { file: scope.sample.file, beats: scope.sample.beats });
          return new Array(samples.indexOf(sample));
        },
        dragToGrid: function(event, ui) {
          var helper = angular.element(ui.helper);
          if (helper.data('grid')) {
            ui.position.left = composer.grid.snappedPosition(ui.position.left);
            if (!tracked) ui.position.left += composer.grid.originDelta(instrumentName);
            ui.position.top = composer.grid.offset(instrumentName).top - element.offset().top;
          }
        },
        playSample: function()
        {
          var url = '/modules/core/audio/samples/'+scope.sample.file+'.mp3';
          var sample = new Audio(url);
          sample.play();
        },
        deleteSample: function(event)
        {
          event.preventDefault();
          var helper = angular.element(event.currentTarget);
          if (!helper.data('grid') && tracked)
          {
            helper.remove();
            scope.track.removeSample(scope.sample);
          }
        },
        delete: function(event, ui) {
          var helper = angular.element(ui.helper);
          if (!helper.data('grid') && tracked) {
            helper.remove();
            scope.track.removeSample(scope.sample);
          }
        },
        jquiOptions: function() {
          return {
            revert: tracked ? false : 'invalid',
            helper: tracked ? 'original' : 'clone',
            scope: instrumentName,
            containment: tracked ? '.track-grids' : ''
          };
        },
        draggableOptions: function() {
          return {
            placeholder: 'keep',
            onDrag: 'dragToGrid',
            onStop: 'delete'
          };
        }
      });
    }
  };
}
]);

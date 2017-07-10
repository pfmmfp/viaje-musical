/*global angular*/
'use strict';

angular.module('composer').factory('Tracks', ['_', 'TracksNOA', 'TracksNEA', 'TracksPam', 'TracksSP',
function(_, TracksNOA, TracksNEA, TracksPam, TracksSP) {

  var Tracks = {
    NOA: TracksNOA,
    NEA: TracksNEA,
    PAMPA: TracksPam,
    CUYO: [],
    PATAGONIA: [],
    'SIERRAS PAMPEANAS': TracksSP,
  };

  return Tracks;
}]);

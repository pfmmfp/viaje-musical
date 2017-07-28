/*global angular*/
'use strict';

angular.module('composer').factory('Tracks', ['_', 'TracksNOA', 'TracksNEA', 'TracksPam', 'TracksSP',
function(_, TracksNOA, TracksNEA, TracksPam, TracksSP) {
  
  function shuffle() { 
    return Math.random() - 0.5;
  }
  
  _.each([TracksNOA, TracksNEA, TracksPam, TracksSP], function(regionTracks) {
    _.each(regionTracks, function(instruments) {
      instruments.samples.sort(shuffle);
    });
  });
  
  var Tracks = {
    noa: { tracks: TracksNOA, bpm: 96 },
    nea: { tracks: TracksNEA, bpm: 100 },
    pampa: { tracks: TracksPam, bpm: 100 },
    cuyo: { tracks: [], bpm: 100 },
    patagonia: { tracks: [], bpm: 100 },
    sierras: { tracks: TracksSP, bpm: 72 },
  };

  return Tracks;
}]);

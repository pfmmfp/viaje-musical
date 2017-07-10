/*global angular*/
'use strict';

angular.module('composer').factory('TracksPam', [function() {

  var Tracks = [{
    name: 'Bandoneon',
    samples: [
      { beats: 2, file: 'Quena-2T-Cel1-01' },
    ],
    sampleComposition: [
      { file: 'Quena-2T-Cel4-01', pos: 20 },
    ]
  },{
    name: 'Guitarra',
    samples: [
      { beats: 1, file: 'Char-1T-Am' },
    ],
    sampleComposition: [
      { file: 'Char-20T-Intro-01', pos: 0 },
    ]
  },{
    name: 'Piano',
    samples: [
      { beats: 1, file: 'Char-1T-Am' },
    ],
    sampleComposition: [
      { file: 'Char-20T-Intro-01', pos: 0 },
    ]
  }];

  return Tracks;
}]);

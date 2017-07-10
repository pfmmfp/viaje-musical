/*global angular*/
'use strict';

angular.module('composer').factory('TracksSP', [function() {

  var Tracks = [{
    name: 'Voz1',
    samples: [
      { beats: 2, file: 'Quena-2T-Cel1-01' },
    ],
    sampleComposition: [
      { file: 'Quena-2T-Cel4-01', pos: 20 },
    ]
  },{
    name: 'Voz2',
    samples: [
      { beats: 1, file: 'Char-1T-Am' },
    ],
    sampleComposition: [
      { file: 'Char-20T-Intro-01', pos: 0 },
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
  },{
    name: 'Bombo',
    samples: [
      { beats: 1, file: 'Char-1T-Am' },
    ],
    sampleComposition: [
      { file: 'Char-20T-Intro-01', pos: 0 },
    ]
  }];

  return Tracks;
}]);

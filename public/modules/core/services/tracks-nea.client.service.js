/*global angular*/
'use strict';

angular.module('composer').factory('TracksNEA', [function() {

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
    name: 'Contrabajo',
    samples: [
      { beats: 4, file: 'Chas-4T-01' },
    ],
    sampleComposition: [
      { file: 'Chas-4T-02', pos: 0 },
    ]
  }];

  return Tracks;
}]);

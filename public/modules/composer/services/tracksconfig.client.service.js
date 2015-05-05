'use strict';

angular.module('composer').factory('TracksConfig', ['_',
	function(_) {

		var tracksConfig = [{
        name: 'Quena',
        regions: ['NOA'],
        samples: [
          { beats: 2, file: 'Quena-2T-Cel1-01', group: 1 },
          { beats: 2, file: 'Quena-2T-Cel1-02', group: 1 },
          { beats: 2, file: 'Quena-2T-Cel1-03', group: 1 },
          { beats: 2, file: 'Quena-2T-Cel1-04', group: 1 },
          { beats: 2, file: 'Quena-2T-Cel1-05', group: 1 },
          { beats: 2, file: 'Quena-2T-Cel1-06', group: 1 },
          { beats: 2, file: 'Quena-2T-Cel1-07', group: 1 },
          { beats: 2, file: 'Quena-2T-Cel1-08', group: 1 },
          { beats: 2, file: 'Quena-2T-Cel1-09', group: 1 },
          { beats: 2, file: 'Quena-2T-Cel1-10', group: 1 },
          { beats: 2, file: 'Quena-2T-Cel2-01', group: 2 },
          { beats: 2, file: 'Quena-2T-Cel2-02', group: 2 },
          { beats: 2, file: 'Quena-2T-Cel2-03', group: 2 },
          { beats: 2, file: 'Quena-2T-Cel2-04', group: 2 },
          { beats: 2, file: 'Quena-2T-Cel2-05', group: 2 },
          { beats: 2, file: 'Quena-2T-Cel2-06', group: 2 },
          { beats: 2, file: 'Quena-2T-Cel2-07', group: 2 },
          { beats: 2, file: 'Quena-2T-Cel2-08', group: 2 },
          { beats: 2, file: 'Quena-2T-Cel2-09', group: 2 },
          { beats: 2, file: 'Quena-2T-Cel2-10', group: 2 },
          { beats: 2, file: 'Quena-2T-Cel3-01', group: 3 },
          { beats: 2, file: 'Quena-2T-Cel3-02', group: 3 },
          { beats: 2, file: 'Quena-2T-Cel3-03', group: 3 },
          { beats: 2, file: 'Quena-2T-Cel3-04', group: 3 },
          { beats: 2, file: 'Quena-2T-Cel3-05', group: 3 },
          { beats: 2, file: 'Quena-2T-Cel3-06', group: 3 },
          { beats: 2, file: 'Quena-2T-Cel3-07', group: 3 },
          { beats: 2, file: 'Quena-2T-Cel3-08', group: 3 },
          { beats: 2, file: 'Quena-2T-Cel3-09', group: 3 },
          { beats: 2, file: 'Quena-2T-Cel3-10', group: 3 },
          { beats: 2, file: 'Quena-2T-Cel4-01', group: 4 },
          { beats: 2, file: 'Quena-2T-Cel4-02', group: 4 },
          { beats: 2, file: 'Quena-2T-Cel4-03', group: 4 },
          { beats: 2, file: 'Quena-2T-Cel4-04', group: 4 },
          { beats: 2, file: 'Quena-2T-Cel4-05', group: 4 },
          { beats: 2, file: 'Quena-2T-Cel4-06', group: 4 },
          { beats: 2, file: 'Quena-2T-Cel4-07', group: 4 },
          { beats: 2, file: 'Quena-2T-Cel4-08', group: 4 },
          { beats: 2, file: 'Quena-2T-Cel4-09', group: 4 },
          { beats: 2, file: 'Quena-2T-Cel4-10', group: 4 },
          { beats: 2, file: 'Quena-2T-Cel5-01', group: 5 },
          { beats: 2, file: 'Quena-2T-Cel5-02', group: 5 },
          { beats: 2, file: 'Quena-2T-Cel5-03', group: 5 },
          { beats: 2, file: 'Quena-2T-Cel5-04', group: 5 },
          { beats: 2, file: 'Quena-2T-Cel5-05', group: 5 },
          { beats: 2, file: 'Quena-2T-Cel5-06', group: 5 },
          { beats: 2, file: 'Quena-2T-Cel5-07', group: 5 },
          { beats: 2, file: 'Quena-2T-Cel5-08', group: 5 },
          { beats: 2, file: 'Quena-2T-Cel5-09', group: 5 },
          { beats: 2, file: 'Quena-2T-Cel5-10', group: 5 },
          { beats: 2, file: 'Quena-2T-Cel6-01', group: 6 },
          { beats: 2, file: 'Quena-2T-Cel6-02', group: 6 },
          { beats: 2, file: 'Quena-2T-Cel6-03', group: 6 },
          { beats: 2, file: 'Quena-2T-Cel6-04', group: 6 },
          { beats: 2, file: 'Quena-2T-Cel6-05', group: 6 },
          { beats: 2, file: 'Quena-2T-Cel6-06', group: 6 },
          { beats: 2, file: 'Quena-2T-Cel6-07', group: 6 },
          { beats: 2, file: 'Quena-2T-Cel6-08', group: 6 },
          { beats: 2, file: 'Quena-2T-Cel6-09', group: 6 },
          { beats: 2, file: 'Quena-2T-Cel6-10', group: 6 },
          { beats: 4, file: 'Quena-4T-Final-A' },
          { beats: 4, file: 'Quena-4T-Final-B-01' },
          { beats: 4, file: 'Quena-4T-Final-B-02' },
          { beats: 4, file: 'Quena-4T-Final-B-03' },
          { beats: 4, file: 'Quena-4T-Final-B-04' },
          { beats: 8, file: 'Quena-8T-Final-AB' }
        ],
        sampleComposition: [
        	{ file: 'Quena-2T-Cel4-01', pos: 20 },
        	{ file: 'Quena-2T-Cel3-03', pos: 22 },
        	{ file: 'Quena-2T-Cel4-08', pos: 24 },
        	{ file: 'Quena-2T-Cel5-06', pos: 26 },
					{ file: 'Quena-2T-Cel4-01', pos: 28 },
					{ file: 'Quena-2T-Cel3-03', pos: 30 },
					{ file: 'Quena-2T-Cel4-08', pos: 32 },
					{ file: 'Quena-2T-Cel5-06', pos: 34 },
					{ file: 'Quena-2T-Cel6-08', pos: 36 },
					{ file: 'Quena-2T-Cel4-01', pos: 38 },
					{ file: 'Quena-2T-Cel2-02', pos: 40 },
					{ file: 'Quena-2T-Cel1-01', pos: 42 },
					{ file: 'Quena-2T-Cel6-08', pos: 44 },
					{ file: 'Quena-2T-Cel4-01', pos: 46 },
					{ file: 'Quena-2T-Cel2-02', pos: 48 },
					{ file: 'Quena-2T-Cel5-01', pos: 50 }
        ]
      },
      {
        name: 'Charango',
        regions: ['NOA'],
        samples: [
          { beats: 1, file: 'Char-1T-Am' },
          { beats: 1, file: 'Char-1T-C' },
          { beats: 1, file: 'Char-1T-D' },
          { beats: 1, file: 'Char-1T-D7' },
          { beats: 1, file: 'Char-1T-E7' },
          { beats: 1, file: 'Char-1T-Em' },
          { beats: 1, file: 'Char-1T-F' },
          { beats: 1, file: 'Char-1T-G' },
          { beats: 1, file: 'Char-1T-G7' },
          { beats: 1, file: 'Char-1Tdec-Em7' },
          { beats: 2, file: 'Char-2T-Am' },
          { beats: 2, file: 'Char-2T-C' },
          { beats: 2, file: 'Char-2T-D' },
          { beats: 2, file: 'Char-2T-D7' },
          { beats: 2, file: 'Char-2T-E7' },
          { beats: 2, file: 'Char-2T-Em' },
          { beats: 2, file: 'Char-2T-Em7' },
          { beats: 2, file: 'Char-2T-F' },
          { beats: 2, file: 'Char-2T-G' },
          { beats: 2, file: 'Char-2T-G7' },
          { beats: 3, file: 'Char-3T-Am' },
          { beats: 3, file: 'Char-3T-C' },
          { beats: 3, file: 'Char-3T-D' },
          { beats: 3, file: 'Char-3T-D7' },
          { beats: 3, file: 'Char-3T-E7' },
          { beats: 3, file: 'Char-3T-Em' },
          { beats: 3, file: 'Char-3T-Em7' },
          { beats: 3, file: 'Char-3T-F' },
          { beats: 3, file: 'Char-3T-G' },
          { beats: 3, file: 'Char-3T-G7' },
          { beats: 4, file: 'Char-4T-Final-A' },
          { beats: 4, file: 'Char-4T-Final-B-01' },
          { beats: 4, file: 'Char-4T-Final-B-02' },
          { beats: 4, file: 'Char-4T-Final-B-03' },
          { beats: 4, file: 'Char-4T-Final-B-04' },
          { beats: 8, file: 'Char-8T-Final-AB' },
          { beats: 20, file: 'Char-20T-Intro-01' },
          { beats: 20, file: 'Char-20T-Intro-02' },
          { beats: 20, file: 'Char-20T-Intro-03' }
				],
        sampleComposition: [
        	{ file: 'Char-20T-Intro-01', pos: 0 },
        	{ file: 'Char-2T-F', pos: 22 },
					{ file: 'Char-2T-G', pos: 24 },
					{ file: 'Char-2T-C', pos: 26 },
					{ file: 'Char-2T-Am', pos: 28 },
					{ file: 'Char-2T-F', pos: 30 },
					{ file: 'Char-2T-G', pos: 32 },
					{ file: 'Char-2T-C', pos: 34 },
					{ file: 'Char-2T-G', pos: 36 },
					{ file: 'Char-2T-Am', pos: 38 },
					{ file: 'Char-2T-E7', pos: 40 },
					{ file: 'Char-2T-Am', pos: 42 },
					{ file: 'Char-2T-G', pos: 44 },
					{ file: 'Char-2T-Am', pos: 46 },
					{ file: 'Char-4T-Final-B-02', pos: 48 }
        ]
      },
      {
        name: 'Chaschas',
        regions: ['NOA'],
        samples: [
          { beats: 4, file: 'Chas-4T-01' },
          { beats: 4, file: 'Chas-4T-02' },
          { beats: 4, file: 'Chas-4T-03' },
        ],
        sampleComposition: [
					{ file: 'Chas-4T-02', pos: 0 },
					{ file: 'Chas-4T-02', pos: 4 },
					{ file: 'Chas-4T-02', pos: 8 },
					{ file: 'Chas-4T-02', pos: 12 },
					{ file: 'Chas-4T-03', pos: 16 },
					{ file: 'Chas-4T-02', pos: 20 },
					{ file: 'Chas-4T-02', pos: 24 },
					{ file: 'Chas-4T-02', pos: 28 },
					{ file: 'Chas-4T-02', pos: 32 },
					{ file: 'Chas-4T-02', pos: 36 },
					{ file: 'Chas-4T-02', pos: 40 },
					{ file: 'Chas-4T-02', pos: 44 }
        ]
      },
      {
        name: 'Bombo',
        regions: ['NOA'],
        samples: [
          { beats: 4, file: 'Bombo-4T-01' },
          { beats: 4, file: 'Bombo-4T-02' },
          { beats: 4, file: 'Bombo-4T-03' },
          { beats: 4, file: 'Bombo-4T-04' },
          { beats: 4, file: 'Bombo-4T-05' },
          { beats: 4, file: 'Bombo-4T-06' },
          { beats: 4, file: 'Bombo-4T-07' },
          { beats: 4, file: 'Bombo-4T-08' }
        ],
        sampleComposition: [
					{ file: 'Bombo-4T-01', pos: 0 },
					{ file: 'Bombo-4T-01', pos: 4 },
					{ file: 'Bombo-4T-01', pos: 8 },
					{ file: 'Bombo-4T-01', pos: 12 },
					{ file: 'Bombo-4T-08', pos: 16 },
					{ file: 'Bombo-4T-01', pos: 20 },
					{ file: 'Bombo-4T-01', pos: 24 },
					{ file: 'Bombo-4T-01', pos: 28 },
					{ file: 'Bombo-4T-01', pos: 32 },
					{ file: 'Bombo-4T-01', pos: 36 },
					{ file: 'Bombo-4T-01', pos: 40 },
					{ file: 'Bombo-4T-01', pos: 44 },
					{ file: 'Bombo-4T-08', pos: 48 }
        ]
      }
    ];

  tracksConfig.byName = function(instrumentName) {
    return _.findWhere(this, { name: instrumentName });
  };

  tracksConfig.byRegion = function(regionName)
  {
    return _.filter(this, function(instrument){
      console.log(instrument);
      return instrument.regions.indexOf(regionName) > -1;
    });
  };

	return tracksConfig;
	}
]);
/*global angular*/
'use strict';

angular.module('composer').factory('TracksSP', [function() {

  var Tracks = [{
    name: 'Voz1',
    samples: [
      { beats: 6, file: 'Voz_estrofa1_c1-2' },
      { beats: 6, file: 'Voz_estrofa1_c3-4' },
      { beats: 6, file: 'Voz_estrofa1_c5-6' },
      { beats: 6, file: 'Voz_estrofa1_c7-8' },
      { beats: 6, file: 'Voz_estrofa2_c1-2' },
      { beats: 6, file: 'Voz_estrofa2_c3-4' },
      { beats: 6, file: 'Voz_estrofa2_c5-6' },
      { beats: 6, file: 'Voz_estrofa2_c7-8' },
      { beats: 6, file: 'Voz_estribillo_c1-2' },
      { beats: 6, file: 'Voz_estribillo_c3-4' },
      { beats: 6, file: 'Voz_estribillo_c5-6' },
      { beats: 6, file: 'Voz_estribillo_c7-8' },
      { beats: 6, file: 'Voz_estrofa3_c1-2' },
      { beats: 6, file: 'Voz_estrofa3_c3-4' },
      { beats: 6, file: 'Voz_estrofa3_c5-6' },
      { beats: 6, file: 'Voz_estrofa3_c7-8' },
      { beats: 6, file: 'Voz_estrofa4_c1-2' },
      { beats: 6, file: 'Voz_estrofa4_c3-4' },
      { beats: 6, file: 'Voz_estrofa4_c5-6' },
      { beats: 6, file: 'Voz_estrofa4_c7-8' },
      { beats: 6, file: 'Voz_estribillo2_c1-2' },
      { beats: 6, file: 'Voz_estribillo2_c3-4' },
      { beats: 6, file: 'Voz_estribillo2_c5-6' },
      { beats: 6, file: 'Voz_estribillo2_c7-8' },
      { beats: 6, file: 'Voz_estribillo2_Final' },
    ],
    sampleComposition: [
      { file: 'Voz_estrofa1_c1-2',	pos: 24 },
      { file: 'Voz_estrofa1_c3-4',	pos: 30 },
      { file: 'Voz_estrofa1_c5-6',	pos: 36 },
      { file: 'Voz_estrofa1_c7-8',	pos: 42 },
      { file: 'Voz_estrofa1_c5-6',	pos: 48 },
      { file: 'Voz_estrofa1_c7-8',	pos: 54 },
      { file: 'Voz_estrofa2_c1-2',	pos: 60 },
      { file: 'Voz_estrofa2_c3-4',	pos: 66 },
      { file: 'Voz_estrofa2_c5-6',	pos: 72 },
      { file: 'Voz_estrofa2_c7-8',	pos: 78 },
      { file: 'Voz_estribillo_c1-2',	pos: 96 },
      { file: 'Voz_estribillo_c3-4',	pos: 102 },
      { file: 'Voz_estribillo_c5-6',	pos: 108 },
      { file: 'Voz_estribillo_c7-8',	pos: 114 },
      { file: 'Voz_estribillo_c5-6',	pos: 120 },
      { file: 'Voz_estribillo_c7-8',	pos: 126 },
      { file: 'Voz_estrofa3_c1-2',	pos: 156 },
      { file: 'Voz_estrofa3_c3-4',	pos: 162 },
      { file: 'Voz_estrofa3_c5-6',	pos: 168 },
      { file: 'Voz_estrofa3_c7-8',	pos: 174 },
      { file: 'Voz_estrofa3_c5-6',	pos: 180 },
      { file: 'Voz_estrofa3_c7-8',	pos: 186 },
      { file: 'Voz_estrofa4_c1-2',	pos: 192 },
      { file: 'Voz_estrofa4_c3-4',	pos: 198 },
      { file: 'Voz_estrofa4_c5-6',	pos: 204 },
      { file: 'Voz_estrofa4_c7-8',	pos: 210 },
      { file: 'Voz_estrofa4_c5-6',	pos: 216 },
      { file: 'Voz_estrofa4_c7-8',	pos: 222 },
      { file: 'Voz_estribillo2_c1-2',	pos: 228 },
      { file: 'Voz_estribillo2_c3-4',	pos: 234 },
      { file: 'Voz_estribillo2_c5-6',	pos: 240 },
      { file: 'Voz_estribillo2_c7-8',	pos: 246 },
      { file: 'Voz_estribillo2_c5-6',	pos: 252 },
      { file: 'Voz_estribillo2_Final',	pos: 258 },
    ]
  },{
    name: 'Voz2',
    samples: [
      { beats: 6, file: 'Voz2_estrofa1_c5-6' },
      { beats: 6, file: 'Voz2_estrofa1_c7-8' },
      { beats: 6, file: 'Voz2_estrofa3_c5-6' },
      { beats: 6, file: 'Voz2_estrofa3_c7-8' },
      { beats: 6, file: 'Voz2_estrofa4_c1-2' },
      { beats: 6, file: 'Voz2_estrofa4_c3-4' },
      { beats: 6, file: 'Voz2_estrofa4_c5-6' },
      { beats: 6, file: 'Voz2_estrofa4_c7-8' },
      { beats: 6, file: 'Voz2_estribillo2_c1-2' },
      { beats: 6, file: 'Voz2_estribillo2_c3-4' },
      { beats: 6, file: 'Voz2_estribillo2_c5-6' },
      { beats: 6, file: 'Voz2_estribillo2_c7-8' },
      { beats: 6, file: 'Voz2_estribillo2_Final' },
    ],
    sampleComposition: [
      { file: 'Voz2_estrofa1_c5-6', pos:	48 },
      { file: 'Voz2_estrofa1_c7-8', pos:	54 },
      { file: 'Voz2_estrofa3_c5-6', pos:	180	},
      { file: 'Voz2_estrofa3_c7-8', pos:	186	},
      { file: 'Voz2_estrofa4_c1-2', pos:	192	},
      { file: 'Voz2_estrofa4_c3-4', pos:	198	},
      { file: 'Voz2_estrofa4_c5-6', pos:	204	},
      { file: 'Voz2_estrofa4_c7-8', pos:	210	},
      { file: 'Voz2_estrofa4_c5-6', pos:	216	},
      { file: 'Voz2_estrofa4_c7-8', pos:	222	},
      { file: 'Voz2_estribillo2_c1-2', pos:	228	},
      { file: 'Voz2_estribillo2_c3-4', pos:	234	},
      { file: 'Voz2_estribillo2_c5-6', pos:	240	},
      { file: 'Voz2_estribillo2_c7-8', pos:	246	},
      { file: 'Voz2_estribillo2_c5-6', pos:	252	},
      { file: 'Voz2_estribillo2_Final', pos:	258	},
    ]
  },{
    name: 'Guitarra',
    samples: [
      { beats: 3, file: 'Guitarra_intro_c1_(Gm-C7)' },
      { beats: 3, file: 'Guitarra_intro_c2_(F)' },
      { beats: 3, file: 'Guitarra_intro_c3_(A7)' },
      { beats: 3, file: 'Guitarra_intro_c4_(Dm)' },
      { beats: 3, file: 'Guitarra_intro_c5_(Gm-C7)' },
      { beats: 3, file: 'Guitarra_intro_c6_(F)' },
      { beats: 3, file: 'Guitarra_intro_c7_(Dm-A7)' },
      { beats: 3, file: 'Guitarra_intro_c8_(Dm)' },
      { beats: 3, file: 'Guitarra_estrofa_c1_(Dm)' },
      { beats: 3, file: 'Guitarra_estrofa_c3_(C)' },
      { beats: 3, file: 'Guitarra_estrofa_c6_(Dm-C-Bb_-_con_cejilla)' },
      { beats: 3, file: 'Guitarra_estrofa_c9_(Gm)' },
      { beats: 3, file: 'Guitarra_estrofa_c10_(Dm-C-Bb_-_sin_cejilla)' },
      { beats: 3, file: 'Guitarra_estrofa_c11_(A7_-_Acéfalo)' },
      { beats: 3, file: 'Guitarra_estrofa_c12_(Dm_-_no_es_final)' },
      { beats: 3, file: 'Guitarra_estribillo_c11_(A7_-_Vidala)' },
      { beats: 3, file: 'Guitarra_estribillo_c12_(Dm_-_Final)' },
      { beats: 3, file: 'Guitarra_estribillo_c1_(D7)' },
      { beats: 3, file: 'Guitarra_estribillo_c2_(Gm7)' },
      { beats: 3, file: 'Guitarra_estribillo_c3_(C7)' },
      { beats: 3, file: 'Guitarra_estribillo_c4_(F)' },
      { beats: 3, file: 'Guitarra_estribillo_c5_(Gm7_-_Acéfalo)' },
      { beats: 3, file: 'Guitarra_estribillo_c7_(A7)' },
      { beats: 3, file: 'Guitarra_estribillo_c8_(Dm-D7)' },
    ],
    sampleComposition: [
      //intro
      { file: 'Guitarra_intro_c1_(Gm-C7)',  pos: 0 },
      { file: 'Guitarra_intro_c2_(F)',      pos: 3 },
      { file: 'Guitarra_intro_c3_(A7)',     pos: 6 },
      { file: 'Guitarra_intro_c4_(Dm)',     pos: 9 },
      { file: 'Guitarra_intro_c5_(Gm-C7)',  pos: 12 },
      { file: 'Guitarra_intro_c6_(F)',      pos: 15 },
      { file: 'Guitarra_intro_c7_(Dm-A7)',  pos: 18 },
      { file: 'Guitarra_intro_c8_(Dm)',     pos: 21 },
      //estrofa 1 y 2
      { file: 'Guitarra_estrofa_c1_(Dm)',   pos: 24 },
      { file: 'Guitarra_estrofa_c9_(Gm)',   pos: 27 },
      { file: 'Guitarra_estrofa_c3_(C)',    pos: 30 },
      { file: 'Guitarra_estribillo_c4_(F)', pos: 33 },
      { file: 'Guitarra_estrofa_c9_(Gm)', pos: 36 },
      { file: 'Guitarra_estrofa_c6_(Dm-C-Bb_-_con_cejilla)', pos: 39 },
      { file: 'Guitarra_estribillo_c7_(A7)', pos: 42 },
      { file: 'Guitarra_estribillo_c8_(Dm-D7)', pos: 45 },
      { file: 'Guitarra_estrofa_c9_(Gm)', pos: 48 },
      { file: 'Guitarra_estrofa_c10_(Dm-C-Bb_-_sin_cejilla)', pos: 51 },
      { file: 'Guitarra_estrofa_c11_(A7_-_Acéfalo)', pos: 54 },
      { file: 'Guitarra_estrofa_c12_(Dm_-_no_es_final)', pos: 57 },
      { file: 'Guitarra_estrofa_c1_(Dm)', pos: 60 },
      { file: 'Guitarra_estrofa_c9_(Gm)', pos: 63 },
      { file: 'Guitarra_estrofa_c3_(C)', pos: 66 },
      { file: 'Guitarra_estribillo_c4_(F)', pos: 69 },
      { file: 'Guitarra_estrofa_c9_(Gm)', pos: 72 },
      { file: 'Guitarra_estrofa_c6_(Dm-C-Bb_-_con_cejilla)', pos: 75 },
      { file: 'Guitarra_estribillo_c7_(A7)', pos: 78 },
      { file: 'Guitarra_estribillo_c8_(Dm-D7)', pos: 81 },
      { file: 'Guitarra_estrofa_c9_(Gm)', pos: 84 },
      { file: 'Guitarra_estrofa_c10_(Dm-C-Bb_-_sin_cejilla)', pos: 87 },
      { file: 'Guitarra_estrofa_c11_(A7_-_Acéfalo)', pos: 90 },
      { file: 'Guitarra_estrofa_c12_(Dm_-_no_es_final)', pos: 93 },
      //estribillo
      { file: 'Guitarra_estribillo_c1_(D7)', pos: 96 },
      { file: 'Guitarra_estribillo_c2_(Gm7)', pos: 99 },
      { file: 'Guitarra_estribillo_c3_(C7)', pos: 102 },
      { file: 'Guitarra_estribillo_c4_(F)', pos: 105 },
      { file: 'Guitarra_estribillo_c5_(Gm7_-_Acéfalo)', pos: 108 },
      { file: 'Guitarra_estrofa_c6_(Dm-C-Bb_-_con_cejilla)', pos: 111 },
      { file: 'Guitarra_estribillo_c7_(A7)', pos: 114 },
      { file: 'Guitarra_estribillo_c8_(Dm-D7)', pos: 117 },
      { file: 'Guitarra_estrofa_c9_(Gm)', pos: 120 },
      { file: 'Guitarra_estrofa_c10_(Dm-C-Bb_-_sin_cejilla)', pos: 123 },
      { file: 'Guitarra_estribillo_c11_(A7_-_Vidala)', pos: 126 },
      { file: 'Guitarra_estribillo_c12_(Dm_-_Final)', pos: 129 },
      //estrofa 1 y 2
      { file: 'Guitarra_estrofa_c1_(Dm)', pos:	156 },
      { file: 'Guitarra_estrofa_c9_(Gm)', pos:	159 },
      { file: 'Guitarra_estrofa_c3_(C)', pos:	162 },
      { file: 'Guitarra_estribillo_c4_(F)', pos:	165 },
      { file: 'Guitarra_estrofa_c9_(Gm)', pos:	168 },
      { file: 'Guitarra_estrofa_c6_(Dm-C-Bb_-_con_cejilla)', pos:	171 },
      { file: 'Guitarra_estribillo_c7_(A7)', pos:	174 },
      { file: 'Guitarra_estribillo_c8_(Dm-D7)', pos:	177 },
      { file: 'Guitarra_estrofa_c9_(Gm)', pos:	180 },
      { file: 'Guitarra_estrofa_c10_(Dm-C-Bb_-_sin_cejilla)', pos:	183 },
      { file: 'Guitarra_estrofa_c11_(A7_-_Acéfalo)', pos:	186 },
      { file: 'Guitarra_estrofa_c12_(Dm_-_no_es_final)', pos:	189 },
      { file: 'Guitarra_estrofa_c1_(Dm)', pos:	192 },
      { file: 'Guitarra_estrofa_c9_(Gm)', pos:	195 },
      { file: 'Guitarra_estrofa_c3_(C)', pos:	198 },
      { file: 'Guitarra_estribillo_c4_(F)', pos:	201 },
      { file: 'Guitarra_estrofa_c9_(Gm)', pos:	204 },
      { file: 'Guitarra_estrofa_c6_(Dm-C-Bb_-_con_cejilla)', pos:	207 },
      { file: 'Guitarra_estribillo_c7_(A7)', pos:	210 },
      { file: 'Guitarra_estribillo_c8_(Dm-D7)', pos:	213 },
      { file: 'Guitarra_estrofa_c9_(Gm)', pos:	216 },
      { file: 'Guitarra_estrofa_c10_(Dm-C-Bb_-_sin_cejilla)', pos:	219 },
      { file: 'Guitarra_estrofa_c11_(A7_-_Acéfalo)', pos:	222 },
      { file: 'Guitarra_estrofa_c12_(Dm_-_no_es_final)', pos:	225 },
      //estribillo
      { file: 'Guitarra_estribillo_c1_(D7)', pos:	228 },
      { file: 'Guitarra_estribillo_c2_(Gm7)', pos:	231 },
      { file: 'Guitarra_estribillo_c3_(C7)', pos:	234 },
      { file: 'Guitarra_estribillo_c4_(F)', pos:	237 },
      { file: 'Guitarra_estribillo_c5_(Gm7_-_Acéfalo)', pos:	240 },
      { file: 'Guitarra_estrofa_c6_(Dm-C-Bb_-_con_cejilla)', pos:	243 },
      { file: 'Guitarra_estribillo_c7_(A7)', pos:	246 },
      { file: 'Guitarra_estribillo_c8_(Dm-D7)', pos:	249 },
      { file: 'Guitarra_estrofa_c9_(Gm)', pos:	252 },
      { file: 'Guitarra_estrofa_c10_(Dm-C-Bb_-_sin_cejilla)', pos:	255 },
      { file: 'Guitarra_estribillo_c11_(A7_-_Vidala)', pos:	258 },
      { file: 'Guitarra_estribillo_c12_(Dm_-_Final)', pos:	261 },
    ]
  },{
    name: 'Piano',
    samples: [
      { beats: 6, file: 'Piano_intro_c1-2' },
      { beats: 6, file: 'Piano_intro_c3-4' },
      { beats: 6, file: 'Piano_intro_c5-6' },
      { beats: 6, file: 'Piano_intro_c7-8' },
      { beats: 6, file: 'Piano_intro2_c1-2' },
      { beats: 6, file: 'Piano_intro2_c3-4' },
      { beats: 6, file: 'Piano_intro2_c5-6' },
      { beats: 6, file: 'Piano_intro2_c7-8' },
      { beats: 3, file: 'Piano_estrofa_c1_(Dm)' },
      { beats: 3, file: 'Piano_estrofa_c2_(Gm)' },
      { beats: 3, file: 'Piano_estrofa_c3_(C7)' },
      { beats: 3, file: 'Piano_estrofa_c4_(F)' },
      { beats: 3, file: 'Piano_estrofa_c5_(Gm)' },
      { beats: 3, file: 'Piano_estrofa_c6_(Dm-C-Bb)' },
      { beats: 3, file: 'Piano_estrofa_c7_(A7)' },
      { beats: 3, file: 'Piano_estrofa_c8_(Dm-D7)' },
      { beats: 3, file: 'Piano_estrofa_c9_(Gm)' },
      { beats: 3, file: 'Piano_estrofa_c10_(Dm-C-Bb)' },
      { beats: 3, file: 'Piano_estrofa_c11_(A7)' },
      { beats: 3, file: 'Piano_estrofa_c12_(Dm)' },
      { beats: 6, file: 'Piano_estribillo_c11-12' },
      { beats: 3, file: 'Piano_estribillo_c1_(D7)' },
      { beats: 3, file: 'Piano_estribillo_c2_(Gm)' },
      { beats: 3, file: 'Piano_estribillo_c3_(C7)' },
      { beats: 3, file: 'Piano_estribillo_c4_(F)' },
      { beats: 6, file: 'Piano_estribillo_c5-6' },
      { beats: 6, file: 'Piano_estribillo_c7-8' },
      { beats: 6, file: 'Piano_estribillo_c9-10' },
    ],
    sampleComposition: [
      { file: 'Piano_intro_c1-2', pos: 0 },
      { file: 'Piano_intro_c3-4', pos: 6 },
      { file: 'Piano_intro_c5-6', pos: 12 },
      { file: 'Piano_intro_c7-8', pos: 18 },
      { file: 'Piano_estrofa_c1_(Dm)', pos: 60 },
      { file: 'Piano_estrofa_c2_(Gm)', pos:	63 },
      { file: 'Piano_estrofa_c3_(C7)', pos:	66 },
      { file: 'Piano_estrofa_c4_(F)', pos:	69 },
      { file: 'Piano_estrofa_c5_(Gm)', pos:	72 },
      { file: 'Piano_estrofa_c6_(Dm-C-Bb)', pos:	75 },
      { file: 'Piano_estrofa_c7_(A7)', pos:	78 },
      { file: 'Piano_estrofa_c8_(Dm-D7)', pos:	81 },
      { file: 'Piano_estrofa_c9_(Gm)', pos:	84 },
      { file: 'Piano_estrofa_c10_(Dm-C-Bb)', pos:	87 },
      { file: 'Piano_estrofa_c11_(A7)', pos:	90 },
      { file: 'Piano_estrofa_c12_(Dm)', pos:	93 },
      { file: 'Piano_estribillo_c1_(D7)', pos:	96 },
      { file: 'Piano_estribillo_c2_(Gm)', pos:	99 },
      { file: 'Piano_estribillo_c3_(C7)', pos:	102 },
      { file: 'Piano_estribillo_c4_(F)', pos:	105 },
      { file: 'Piano_estribillo_c5-6', pos:	108 },
      { file: 'Piano_estribillo_c7-8', pos:	114 },
      { file: 'Piano_estribillo_c9-10', pos:	120 },
      { file: 'Piano_estribillo_c11-12', pos:	126 },
      { file: 'Piano_intro2_c1-2', pos:	132 },
      { file: 'Piano_intro2_c3-4', pos:	138 },
      { file: 'Piano_intro2_c5-6', pos:	144 },
      { file: 'Piano_intro2_c7-8', pos:	150 },
      { file: 'Piano_estrofa_c1_(Dm)', pos:	192 },
      { file: 'Piano_estrofa_c2_(Gm)', pos:	195 },
      { file: 'Piano_estrofa_c3_(C7)', pos:	198 },
      { file: 'Piano_estrofa_c4_(F)', pos:	201 },
      { file: 'Piano_estrofa_c5_(Gm)', pos:	204 },
      { file: 'Piano_estrofa_c6_(Dm-C-Bb)', pos:	207 },
      { file: 'Piano_estrofa_c7_(A7)', pos:	210 },
      { file: 'Piano_estrofa_c8_(Dm-D7)', pos:	213 },
      { file: 'Piano_estrofa_c9_(Gm)', pos:	216 },
      { file: 'Piano_estrofa_c10_(Dm-C-Bb)', pos:	219 },
      { file: 'Piano_estrofa_c11_(A7)', pos:	222 },
      { file: 'Piano_estrofa_c12_(Dm)', pos:	225 },
      { file: 'Piano_estribillo_c1_(D7)', pos:	228 },
      { file: 'Piano_estribillo_c2_(Gm)', pos:	231 },
      { file: 'Piano_estribillo_c3_(C7)', pos:	234 },
      { file: 'Piano_estribillo_c4_(F)', pos:	237 },
      { file: 'Piano_estribillo_c5-6', pos:	240 },
      { file: 'Piano_estribillo_c7-8', pos:	246 },
      { file: 'Piano_estribillo_c9-10', pos:	252 },
      { file: 'Piano_estribillo_c11-12', pos:	258 },      
    ]
  },{
    name: 'Bombo',
    samples: [
      { beats: 3, file: 'Bombo_01_(Básico)' },
      { beats: 3, file: 'Bombo_02_(Variante_1)' },
      { beats: 3, file: 'Bombo_03_(Variante_2)' },
      { beats: 3, file: 'Bombo_04_(Variante_3)' },
      { beats: 3, file: 'Bombo_05_(Sin_tierra)' },
      { beats: 3, file: 'Bombo_06_(Básico_más_agregado)' },
      { beats: 3, file: 'Bombo_07_(Variante_3_a_dos_manos)' },
      { beats: 3, file: 'Bombo_08_(Acéfalo_-_corcha_y_negras)' },
      { beats: 3, file: 'Bombo_09_(Vidala)' },
      { beats: 3, file: 'Bombo_10_(Simil_Chacarera)' },
      { beats: 3, file: 'Bombo_11_(Final)' },
    ],
    sampleComposition: [
      { file: 'Bombo_05_(Sin_tierra)', pos:	21 },
      { file: 'Bombo_01_(Básico)', pos:	24 },
      { file: 'Bombo_01_(Básico)', pos:	27 },
      { file: 'Bombo_01_(Básico)', pos:	30 },
      { file: 'Bombo_03_(Variante_2)', pos:	33 },
      { file: 'Bombo_01_(Básico)', pos:	36 },
      { file: 'Bombo_04_(Variante_3)', pos:	39 },
      { file: 'Bombo_03_(Variante_2)', pos:	42 },
      { file: 'Bombo_06_(Básico_más_agregado)', pos:	45 },
      { file: 'Bombo_01_(Básico)', pos:	48 },
      { file: 'Bombo_04_(Variante_3)', pos:	51 },
      { file: 'Bombo_03_(Variante_2)', pos:	54 },
      { file: 'Bombo_01_(Básico)', pos:	57 },
      { file: 'Bombo_01_(Básico)', pos:	60 },
      { file: 'Bombo_01_(Básico)', pos:	63 },
      { file: 'Bombo_04_(Variante_3)', pos:	66 },
      { file: 'Bombo_03_(Variante_2)', pos:	69 },
      { file: 'Bombo_01_(Básico)', pos:	72 },
      { file: 'Bombo_04_(Variante_3)', pos:	75 },
      { file: 'Bombo_03_(Variante_2)', pos:	78 },
      { file: 'Bombo_06_(Básico_más_agregado)', pos:	81 },
      { file: 'Bombo_01_(Básico)', pos:	84 },
      { file: 'Bombo_04_(Variante_3)', pos:	87 },
      { file: 'Bombo_03_(Variante_2)', pos:	90 },
      { file: 'Bombo_01_(Básico)', pos:	93 },
      { file: 'Bombo_01_(Básico)', pos:	96 },
      { file: 'Bombo_01_(Básico)', pos:	99 },
      { file: 'Bombo_01_(Básico)', pos:	102 },
      { file: 'Bombo_10_(Simil_Chacarera)', pos:	105 },
      { file: 'Bombo_01_(Básico)', pos:	108 },
      { file: 'Bombo_04_(Variante_3)', pos:	111 },
      { file: 'Bombo_03_(Variante_2)', pos:	114 },
      { file: 'Bombo_06_(Básico_más_agregado)', pos:	117 },
      { file: 'Bombo_01_(Básico)', pos:	120 },
      { file: 'Bombo_03_(Variante_2)', pos:	123 },
      { file: 'Bombo_04_(Variante_3)', pos:	126 },
      { file: 'Bombo_11_(Final)', pos:	129 },
      { file: 'Bombo_05_(Sin_tierra)', pos:	156 },
      { file: 'Bombo_01_(Básico)', pos:	159 },
      { file: 'Bombo_01_(Básico)', pos:	162 },
      { file: 'Bombo_03_(Variante_2)', pos:	165 },
      { file: 'Bombo_01_(Básico)', pos:	168 },
      { file: 'Bombo_04_(Variante_3)', pos:	171 },
      { file: 'Bombo_03_(Variante_2)', pos:	174 },
      { file: 'Bombo_06_(Básico_más_agregado)', pos:	177 },
      { file: 'Bombo_01_(Básico)', pos:	180 },
      { file: 'Bombo_04_(Variante_3)', pos:	183 },
      { file: 'Bombo_03_(Variante_2)', pos:	186 },
      { file: 'Bombo_01_(Básico)', pos:	189 },
      { file: 'Bombo_01_(Básico)', pos:	192 },
      { file: 'Bombo_01_(Básico)', pos:	195 },
      { file: 'Bombo_04_(Variante_3)', pos:	198 },
      { file: 'Bombo_03_(Variante_2)', pos:	201 },
      { file: 'Bombo_01_(Básico)', pos:	204 },
      { file: 'Bombo_04_(Variante_3)', pos:	207 },
      { file: 'Bombo_03_(Variante_2)', pos:	210 },
      { file: 'Bombo_06_(Básico_más_agregado)', pos:	213 },
      { file: 'Bombo_01_(Básico)', pos:	216 },
      { file: 'Bombo_04_(Variante_3)', pos:	219 },
      { file: 'Bombo_03_(Variante_2)', pos:	222 },
      { file: 'Bombo_01_(Básico)', pos:	225 },
      { file: 'Bombo_01_(Básico)', pos:	228 },
      { file: 'Bombo_01_(Básico)', pos:	231 },
      { file: 'Bombo_01_(Básico)', pos:	234 },
      { file: 'Bombo_10_(Simil_Chacarera)', pos:	237 },
      { file: 'Bombo_01_(Básico)', pos:	240 },
      { file: 'Bombo_04_(Variante_3)', pos:	243 },
      { file: 'Bombo_03_(Variante_2)', pos:	246 },
      { file: 'Bombo_06_(Básico_más_agregado)', pos:	249 },
      { file: 'Bombo_01_(Básico)', pos:	252 },
      { file: 'Bombo_03_(Variante_2)', pos:	255 },
      { file: 'Bombo_04_(Variante_3)', pos:	258 },
      { file: 'Bombo_11_(Final)', pos:	261 },
    ]
  }];

  return Tracks;
}]);
/*global angular*/
'use strict';

// Configuring the Regions module
angular.module('core').constant('config',{
  "region":{
    "PUBLIC_IMAGE_PATH": "common/images/region/",
    "PUBLIC_AUDIO_PATH": "common/audio/region/"
  },
  "instrument":{
    "PUBLIC_IMAGE_PATH": "common/images/instrument/",
    "PUBLIC_AUDIO_PATH": "common/audio/instrument/"
  }
});

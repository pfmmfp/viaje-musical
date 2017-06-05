'use strict';

module.exports = {
  app: {
    title: 'Viaje Musical',
    description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
    keywords: 'MongoDB, Express, AngularJS, Node.js'
  },
  port: process.env.PORT || 3000,
  templateEngine: 'swig',
  sessionSecret: 'MEAN',
  sessionCollection: 'sessions',
  publicPaths: {
    tmp: 'public/tmp/'
  },
  assets: {
    lib: {
      css: [
        'public/lib/angular-carousel/dist/angular-carousel.css'
      ],
      js: [
        'public/lib/ng-file-upload/angular-file-upload-shim.min.js',
        'public/lib/jquery/dist/jquery.min.js',
        'public/lib/PxLoader/dist/pxloader-all.min.js',
        'public/lib/bootstrap/dist/js/bootstrap.js',
        'public/lib/angular/angular.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-cookies/angular-cookies.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-touch/angular-touch.js',
        'public/lib/angular-sanitize/angular-sanitize.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-ui-utils/ui-utils.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/ng-file-upload/angular-file-upload.min.js',
        'public/lib/angular-carousel/dist/angular-carousel.js',
        'public/lib/ng-audio/angular.audio.js',
        'public/lib/underscore/underscore.js',
        'public/lib/raphael/raphael-min.js',
        'public/lib/angular-underscore-module/angular-underscore-module.js',
        'public/lib/jquery-ui/jquery-ui.js',
        'public/lib/angular-dragdrop/src/angular-dragdrop.js',
        'public/lib/unity/UnityObject2.js'
      ]
    },
    css: [
      'public/css/*.css',
      'public/modules/**/css/*.css'
    ],
    js: [
      'public/config.js',
      'public/application.js',
      'public/modules/*/*.js',
      'public/modules/*/*[!tests]*/*.js'
    ],
    tests: [
      'public/lib/angular-mocks/angular-mocks.js',
      'public/modules/*/tests/*.js'
    ]
  }
};

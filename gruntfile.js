'use strict';

module.exports = function(grunt) {
  // Unified Watch Object
  var watchFiles = {
    serverViews: ['app/views/**/*.*'],
    serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'],
    clientViews: ['public/modules/**/views/*.html'],
    clientJS: ['public/js/*.js', 'public/modules/**/*.js'],
    clientCSS: ['public/modules/**/*.css'],
    sass: 'style/{,*/}*.{scss,sass}'
  };

  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      serverViews: {
        files: watchFiles.serverViews,
        options: {
          livereload: true
        }
      },
      serverJS: {
        files: watchFiles.serverJS,
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      clientViews: {
        files: watchFiles.clientViews,
        options: {
          livereload: true
        }
      },
      clientJS: {
        files: watchFiles.clientJS,
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      clientCSS: {
        files: watchFiles.clientCSS,
        tasks: ['csslint'],
        options: {
          livereload: true
        }
      },
      sass: {
        files: watchFiles.sass,
        tasks: ['sass:dev'],
        options: {
          livereload: true
        }
      }
    },
    jshint: {
      all: {
        src: watchFiles.clientJS.concat(watchFiles.serverJS),
        options: {
          jshintrc: true
        }
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      all: {
        src: watchFiles.clientCSS
      }
    },
    uglify: {
      production: {
        options: {
          mangle: false
        },
        files: {
          'public/dist/application.min.js': 'public/dist/application.js'
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'public/dist/application.min.css': '<%= applicationCSSFiles %>'
        }
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          nodeArgs: ['--debug'],
          ext: 'js,html',
          watch: watchFiles.serverViews.concat(watchFiles.serverJS)
        }
      }
    },
    'node-inspector': {
      custom: {
        options: {
          'web-port': 1337,
          'web-host': 'localhost',
          'debug-port': 5858,
          'save-live-edit': true,
          'no-preload': true,
          'stack-trace-limit': 50,
          'hidden': []
        }
      }
    },
    ngmin: {
      production: {
        files: {
          'public/dist/application.js': '<%= applicationJavaScriptFiles %>'
        }
      }
    },
    concurrent: {
      default: ['nodemon', 'watch'],
      debug: ['nodemon', 'watch', 'node-inspector'],
      options: {
        logConcurrentOutput: true
      }
    },
    env: {
      test: {
        NODE_ENV: 'test'
      }
    },
    sass: {
      dev: {
        options: {
          style: 'expanded',
          sourcemap: true
        },
        files: {
          'public/css/style.css': 'style/*.scss'
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ['public/lib/bootstrap/dist/fonts/**'], dest: 'public/dist/bootstrap/', filter: 'isFile'}
        ]
      }
    },
    'file-creator':
    {
      options:
      {
        openFlags: 'w'
      },
      "folder":
      {
        "public/dist/imageList.json": function(fs, fd, done)
        {
          var glob = grunt.file.glob;
          var _ = grunt.util._;
          glob('public/modules/core/img/app/*', function (err, files)
          {
            var widgets = [];
            _.each(files, function(file)
            {
              widgets.push(file);
            });

            glob('public/common/images/**/**/*+(jpg|jpeg|png|gif)', function (err, files)
            {
              _.each(files, function(file)
              {
                widgets.push(file);
              });

              console.log(widgets);

              fs.writeSync(fd, '{ "images":[');
              _.each(widgets, function(file, i)
              {
                if(i === ( widgets.length - 1))
                  fs.writeSync(fd, '"' + file.substr(7) +'"]}');
                else
                  fs.writeSync(fd, '"' + file.substr(7) +'",');
              });

              done();
            });
          });
        }
      }
    }

  });

  // Load NPM tasks
  require('load-grunt-tasks')(grunt);

  // Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  // A Task for loading the configuration object
  grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {
    require('./config/init')();
    var config = require('./config/config');

    grunt.config.set('applicationJavaScriptFiles', config.assets.js);
    grunt.config.set('applicationCSSFiles', config.assets.css);
  });

  // Default task(s).
  grunt.registerTask('default', ['file-creator', 'lint', 'sass:dev', 'concurrent:default']);

  // Debug task.
  grunt.registerTask('debug', ['lint', 'concurrent:debug']);

  // Lint task(s).
  grunt.registerTask('lint', ['jshint', 'csslint']);

  // Build task(s).
  grunt.registerTask('build', ['file-creator', 'lint', 'loadConfig', 'ngmin', 'uglify', 'sass:dev', 'cssmin', 'copy']);

  // Test task.
  grunt.registerTask('test', ['env:test']);
};

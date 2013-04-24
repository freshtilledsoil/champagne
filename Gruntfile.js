module.exports = function (grunt) {
  var javascripts = 'champagne/jquery.champagne.js',
      stylesheets = 'champagne/*.scss';

  grunt.initConfig({
    // Javascript
    // ---------------------------------------------
    jshint: {
      dev: javascripts
    },

    uglify: {
      dist: {
        src: javascripts,
        dest: 'champagne/jquery.champagne.min.js',
        separator: ';'
      }
    },

    // CSS
    // ---------------------------------------------
    sass: {
      dev: {
        options: {
          lineNumbers: true,
          style: 'nested'
        },
        files: {
          'champagne/champagne.css': stylesheets
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'champagne/champagne.min.css': stylesheets
        }
      }
    },

    regarde: {
      // TODO: need to reload grunt when updating Gruntfile
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: 'restart-grunt',
        options: {
          nocase: true
        }
      },
      scripts: {
        files: javascripts,
        tasks: [
          'jshint',
          'uglify'
        ],
        spawn: true
      },
      sass: {
        files: stylesheets,
        tasks: ['sass'],
        spawn: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('restart-grunt', 'Restart grunt', function () {
    grunt.fail.warn('Please restart grunt.');
  });

  grunt.registerTask('default', [
    'jshint',
    'uglify',
    'sass'
  ]);
};

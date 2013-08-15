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

    watch: {
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

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);

  grunt.registerTask('dev', [
    'jshint',
    'uglify',
    'sass'
  ]);
};

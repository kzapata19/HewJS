module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

     watch: {
      browserify: {
        files: ['client/components/*.jsx'],
        tasks: ['browserify', 'uglify']
      }
    },

    browserify: {
      dist: {
        options: {
           transform: [['babelify', {presets: ['es2015', 'react']}]]
        },
        src: ['client/components/*.jsx'],
        dest: 'client/compiled/components/app.js',
      }
    },

    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'client/compiled/components/app.min.js': 'client/compiled/components/app.js'
        }
       }
    },

    shell: {
      command: 'git pull --rebase upstream master'
    }

  });
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['watch']);

  grunt.registerTask('rebase', ['shell']);

  grunt.registerTask('build', [
    'browserify', 'uglify'
  ]);

};
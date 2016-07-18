module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      browserify: {
        files: ['client/components/*.jsx'],
        tasks: ['browserify']
      }
    },

    browserify: {
      dist: {
        options: {
           transform: [['babelify', {presets: ['es2015', 'react']}]]
        },
        src: ['client/components/app.jsx'],
        dest: 'client/compiled/components/app.js',
      }
    },
    shell: {
      command: 'git pull --rebase upstream master'
    }

  });
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['browserify']);



  grunt.registerTask('rebase', function() {
    grunt.task.run(['shell']);
  })

};
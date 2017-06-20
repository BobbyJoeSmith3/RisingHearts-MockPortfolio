module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      // this is the 'dev' sass config used with grunt watch command
      dev: {
        options: {
          style: 'expanded',
          // tell Sass to look in the Bootstrap stylesheets directory when compiling
          loadPath: 'node_modules/bootstrap-sass/assets/stylesheets'
        },
        files: {
          'style/css/main.css' : 'style/sass/main.scss'
        }
      },
      // this is the 'production' sass config used with the 'grunt buildcss' command
      dist: {
        options: {
          style: 'compressed',
          loadPath: 'node_modules/bootstrap-sass/assets/stylesheets'
        },
        files: {
          // 'destination' : 'source'
          'style/css/main.css' : 'style/sass/main.scss'
        }
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass:dev']
      }
    },

    // Make multiple responsive images
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            /* Change these */
            width: 1920,
            suffix: '_large_2x',
            quality: 40
          },{
            width: 960,
            suffix: '_large_1x',
            quality: 40
          },{
            width: 1600,
            suffix: '_medium_2x',
            quality: 40
          },{
            width: 800,
            suffix: '_medium_1x',
            quality: 40
          },{
            width: 1160,
            suffix: '_small_2x',
            quality: 40
          },{
            width: 580,
            suffix: '_small_1x',
            quality: 40
          }]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'images_src/',
          dest: 'images/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['images'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['images']
        },
      },
    },
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('sizeimages', ['clean', 'mkdir', 'responsive_images']);
  grunt.registerTask('buildcss', ['sass:dist']);
}

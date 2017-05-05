module.exports = function(grunt){
    //project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: grunt.file.read('banner.txt'),
        uglify: {
            options: {
                compress: {
                    sequences: false,
                    screw_ie8 : false
                },
                sourceMap: true,        
                banner: '<%= banner %>'
            },
            build: {
                expand: true,
                src: '**/*.js',
                dest: 'lib',
                cwd: 'src'
                //src: '<%= concat.dist.dest %>',
                //dest: 'app/lib/<%= pkg.name %>.min.js'
            }
        },
        clean: {
            src: ['lib', 'app/lib']
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['src/system.js'],
                dest: 'lib/<%= pkg.name %>.js'
            }
        },
        copy:{
            main: {
                files: [
                    {expand: false, src: ['lib/defaultAspect.js'], dest: 'app/lib/defaultAspect.js'},
                    {expand: false, src: ['lib/magnifyall.js'], dest: 'app/lib/magnifyall.min.js'},
                    {expand: false, src: ['lib/router.js'], dest: 'app/lib/router.min.js'}
                ]
            }
        },
        watch: {
            src: {
                files: 'src/**/*',
                tasks: ['build']
            }
        },connect: {
            server: {
            options: {
                port: 80,
                hostname: '*',
                base: 'app',
                open: true,
                onCreateServer: function(server, connect, options) {
                    /*var io = require('socket.io').listen(server);
                    io.sockets.on('connection', function(socket) {
                        // do something with socket
                    });*/
                },middleware: function(connect, options, middlewares) {
                    // inject a custom middleware into the array of default middlewares
                    middlewares.unshift(function(req, res, next) {
                        return next();
                    });

                    return middlewares;
                }
            }
            }
        }
    });


    
    // load plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Define Tasks
    grunt.registerTask('build', ['clean', 'concat', 'uglify', 'copy']);
    grunt.registerTask('default', ['build', 'connect', 'watch']);
};
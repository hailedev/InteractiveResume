/**
 * Created by Hai on 8/03/2017.
 */
module.exports = function (grunt) {
    var target = grunt.option("target") || "debug";
    target = target.toLowerCase();
    var minify = grunt.option("minify") || (target === "release");

    grunt.initConfig({
        requirejs:{
            compile:{
                options:{
                    baseUrl:"./js",
                    mainConfigFile:"./js/module-bootstrap.js",
                    include: ["module-bootstrap.js","main.js"],
                    optimize: target === "debug" ?"none" : "uglify2",
                    out: target === "debug" ?"../dist/js/main.js" : "../dist/js/main.min.js"
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {src: ["./assets/**"], dest: "../dist/"},
                    {src: ["./styles/**/*"], dest: "../dist/"},
                    {src: ["./js/lib/jquery-1.11.2.min.js"], dest:"../dist/"},
                    {src: ["./js/lib/require.js"], dest:"../dist/"}
                ]
            }
        },
        clean: {
            options: {
                force: true
            },
            dist: ["../dist"]
        },
        htmlbuild:{
            dist:{
                src: "index.html",
                dest: "../dist/",
                options: {
                    beautify:true,
                    scripts: {
                        bundle: [target === "debug" ? "../dist/js/main.js" : "../dist/js/main.min.js"]
                    },
                    data: {
                        application: false
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-html-build");
    grunt.file.setBase("./src");
    grunt.registerTask("build", ["clean", "requirejs", "copy", "htmlbuild"]);
};
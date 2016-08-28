module.exports = {
    sass:{
        source:'./public/sass/*.scss',
        dest:'./public/css'
    },
    js:{
        source:'./public/js/*.js',
        dest:'./public/js/'
    },
    css:{
        source:'./public/css/*.css',
        dest:'./public/css'
    },
    nodemon:{
        options:{
            verbose: true,
            ignore: ["./sessions/*","./node-modules/*", "./public/lib/*"],
            script: 'server.js'
        }
    }
};
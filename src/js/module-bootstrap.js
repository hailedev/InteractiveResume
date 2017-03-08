requirejs.config({
    paths: {
        'jquery': 'lib/jquery-2.1.1.min',
        'simple-modal': 'lib/simple-modal-rq',
        'createjs': 'lib/easeljs-rq',
        'ndgmr': 'lib/ndgmr-rq',
        'domReady': 'lib/domReady'
    },
    config: {
        'app/game':{
            FPS: 60,
            MoveSpeed: 8
        },
        'app/entities/hero':{
            MoveSpeed: 8
        }
    }
});

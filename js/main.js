// composition root
require(['jquery', 'domReady!', 'app/game', 'app/helpers/mouse', 'app/helpers/keyboard', 'app/core/enums'],
    function($, doc, game, mouse, keyboard, enums){
        // add the enums
        for (var key in enums) {
            if (enums.hasOwnProperty(key)) {
                window[key] = enums[key];
            }
        }

        var mouseHandler = new mouse();
        mouseHandler.init();

        var keyboardHandler = new keyboard();
        keyboardHandler.init();

        var currentGame = new game(mouseHandler, keyboardHandler);
        currentGame.start();
    }
);
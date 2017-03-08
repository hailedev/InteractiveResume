define(
    'app/core/enums',
    [],
    function(){
        return {
            /**
             * @name GameModes
             */
            GameModes: {
                Starting: 0,
                Loading: 1,
                Ready: 2,
                Running: 3
            },

            /**
             * @name PlayerStates
             */
            PlayerStates: {
                Standing: 0,
                Running: 1,
                Jumping: 2
            },

            /**
             * @name PlayerDirection
             */
            PlayerDirection: {
                Left: 0,
                Right: 1,
                Up: 2,
                Down: 3
            },

            /**
             * @name Levels
             */
            Levels: {
                Start: 0,
                Heavens: 1,
                Caverns: 2,
                Whimsy: 3,
                Cathedral: 4
            }
        }
    }
);

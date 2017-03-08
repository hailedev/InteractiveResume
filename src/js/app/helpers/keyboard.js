define(
    'app/helpers/keyboard',
    ['jquery'],
    function($){

        //region Private Constants
        var KEYCODE_ENTER = 13;		//usefull keycode
        var KEYCODE_SPACE = 32;		//usefull keycode
        var KEYCODE_UP = 38;		//usefull keycode
        var KEYCODE_LEFT = 37;		//usefull keycode
        var KEYCODE_RIGHT = 39;		//usefull keycode
        var KEYCODE_W = 87;			//usefull keycode
        var KEYCODE_A = 65;			//usefull keycode
        var KEYCODE_D = 68;			//usefull keycode
        var KEYCODE_DOWN = 40;
        var KEYCODE_S = 83;
        //endregion

        /**
         * The keyboard handler
         *
         * @name Keyboard
         * @constructor
         *
         * @property {Boolean} left     Whether the left key is held down
         * @property {Boolean} right    Whether the right key is held down
         * @property {Boolean} down     Whether the down key is held down
         * @property {Boolean} up       Whether the up key is held down
         * @property {Boolean} enter    Whether the enter key is held down
         * @property {Boolean} space    Whether the space key is held down
         *
         * @requires jquery
         */
        var Keyboard = function(){
            //region Private Members
            this._currentKeyDown = 0;
            this._previousKeyDown = 0;

            var _left = false;
            var _right = false;
            var _up = false;
            var _down = false;
            var _space = false;
            var _enter = false;
            var _disable = false;
            //endregion

            //region Public Properties
            /**
             * Whether the left key is held down
             * @property {Boolean} left
             */
            Object.defineProperty(this, "left", {
                get: function(){
                    return _left;
                },
                set: function(value){
                    _left = value;
                }
            });

            /**
             * Whether the right key is held down
             * @property {Boolean} right
             */
            Object.defineProperty(this, "right", {
                get: function(){
                    return _right;
                },
                set: function(value){
                    _right = value;
                }
            });

            /**
             * Whether the up key is held down
             * @property {Boolean} up
             */
            Object.defineProperty(this, "up", {
                get: function(){
                    return _up;
                },
                set: function(value){
                    _up = value;
                }
            });

            /**
             * Whether the down key is held down
             * @property {Boolean} down
             */
            Object.defineProperty(this, "down", {
                get: function(){
                    return _down;
                },
                set: function(value){
                    _down = value;
                }
            });

            /**
             * Whether the space key is held down
             * @property {Boolean} space
             */
            Object.defineProperty(this, "space", {
                get: function(){
                    return _space;
                },
                set: function(value){
                    _space = value;
                }
            });

            /**
             * Whether the enter key is held down
             * @property {Boolean} enter
             */
            Object.defineProperty(this, "enter", {
                get: function(){
                    return _enter;
                },
                set: function(value){
                    _enter = value;
                }
            });

            /**
             * Whether to disable the keyboard
             * @property {Boolean} disable
             */
            Object.defineProperty(this, "disable", {
                get: function(){
                    return _disable;
                },
                set: function(value){
                    _disable = value;
                }
            });
            //endregion
        };

        //region Private Functions
        /**
         * The key down event handler
         * @param {Object} ev   The event args
         */
        var keydownhandler = function(ev){
            if(this.disable){
                return false;
            }

            if(ev.keyCode === KEYCODE_SPACE){
                this.space = true;
            }

            if(ev.keyCode !== this._currentKeyDown){
                clearKeys.call(this);
                this._previousKeyDown = this._currentKeyDown;
                this._currentKeyDown = ev.keyCode;
            }

            switch(ev.keyCode) {
                case KEYCODE_A:
                case KEYCODE_LEFT:
                    this.left = true;
                    break;
                case KEYCODE_D:
                case KEYCODE_RIGHT:
                    this.right = true;
                    break;
                case KEYCODE_W:
                case KEYCODE_UP:
                    this.up = true;
                    break;
                case KEYCODE_ENTER:
                    this.enter = true;
                    break;
                case KEYCODE_DOWN:
                case KEYCODE_S:
                    this.down = true;
            }

            return false;
        };

        /**
         * The key up event handler
         * @param {Object} ev   The event args
         */
        var keyuphandler = function(ev){
            if(ev.keyCode === this._previousKeyDown){
                this._previousKeyDown = 0;
            }
            if(ev.keyCode === this._currentKeyDown){
                clearKeys.call(this);
                this._currentKeyDown = 0;
                if(this._previousKeyDown !== 0){
                    keydownhandler.call(this, { keyCode: this._previousKeyDown});
                }
            }

            this.space = false;
        };

        /**
         * Resets the suppressed keys
         */
        var clearKeys = function(){
            this.left = false;
            this.right = false;
            this.up = false;
            this.enter = false;
            this.down = false;
        };
        //endregion

        //region Public Functions
        /**
         * Init
         */
        Keyboard.prototype.init = function(){
            $(document).keydown(keydownhandler.bind(this));
            $(document).keyup(keyuphandler.bind(this));
        };
        //endregion

        return Keyboard;
    }
);

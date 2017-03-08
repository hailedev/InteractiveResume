define(
    'app/helpers/mouse',
    ['jquery'],
    function($){

        /**
         * The mouse handler
         *
         * @name Mouse
         * @constructor
         *
         * @property {Number} x         The x position of the mouse click
         * @property {Number} y         The y position of the mouse click
         * @property {Boolean} down     Whether the mouse button is held down
         * @property {Boolean} dragging Whether the user is dragging the mouse
         *
         * @requires jquery
         */
        var Mouse = function(){
            //region Private Members
            this._canvasOffset = null;
            this._container = null;

            var _x = 0;
            var _y = 0;
            var _down = false;
            var _dragging = false;
            //endregion

            //region Public Properties
            /**
             * The x position of the mouse click
             * @property {Number} x
             */
            Object.defineProperty(this, "x", {
                get: function(){
                    return _x;
                },
                set: function(value){
                    _x = value;
                }
            });

            /**
             * The y position of the mouse click
             * @property {Number} y
             */
            Object.defineProperty(this, "y", {
                get: function(){
                    return _y;
                },
                set: function(value){
                    _y = value;
                }
            });

            /**
             * Whether the mouse button is held down
             * @property {Number} down
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
             * Whether the user is dragging the mouse
             * @property {Number} dragging
             */
            Object.defineProperty(this, "dragging", {
                get: function(){
                    return _dragging;
                },
                set: function(value){
                    _dragging = value;
                }
            });
            //endregion
        };

        //region Private Functions
        /**
         * The mouse up event handler
         */
        var mouseuphandler = function() {
            this.down = false;
            this.dragging = false;
        };

        /**
         * The mouse down event handler
         */
        var mousedownhandler = function(ev){
            this.down = this._container.is(":hover");
            this.downX = this.x;
            this.downY = this.y;
            //ev.originalEvent.preventDefault();
        };

        /**
         * The mouse move event handler
         */
        var mousemovehandler = function(ev) {
            var offset = $('#game-canvas').offset();
            this.x = ev.pageX - this._canvasOffset.left;
            this.y = ev.pageY - this._canvasOffset.top;
            if(this.down){
                this.dragging = true;
            }
        };
        //endregion

        //region Public Functions
        /**
         * Init
         */
        Mouse.prototype.init = function(){
            var that = this;
            this._container = $("#game-container");
            this._container.mouseup(mouseuphandler.bind(this));
            this._container.mousedown(mousedownhandler.bind(this));
            this._container.mousemove(mousemovehandler.bind(this));
            that._canvasOffset = $('#game-canvas').offset();
            $(window).on("resize", function(){
                that._canvasOffset = $('#game-canvas').offset();
            });
        };
        //endregion

        return Mouse;
    }
);

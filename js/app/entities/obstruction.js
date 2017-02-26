/**
 * Created with JetBrains WebStorm.
 * User: Hai
 * Date: 18/10/14
 * Time: 10:24 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    'app/entities/obstruction',
    ['createjs'],
    function(createjs){
        /**
         * A region of excluded area
         *
         * @name Obstruction
         * @constructor
         *
         * @requires createjs
         */
        var Obstruction = function(startX, startY, width, height){
            var _startX = startX;
            var _startY = startY;
            var _height = height;
            var _width = width;

            //region Public Functions
            /**
             * The start x location of the excluded area
             * @property {Number} startX
             */
            Object.defineProperty(this, "startX", {
                get: function(){
                    return _startX;
                },
                set: function(value){
                    _startX = value;
                }
            });

            /**
             * The start y location of the excluded area
             * @property {Number} startY
             */
            Object.defineProperty(this, "startY", {
                get: function(){
                    return _startY;
                },
                set: function(value){
                    _startY = value;
                }
            });

            /**
             * The height of the excluded area
             * @property {Number} height
             */
            Object.defineProperty(this, "height", {
                get: function(){
                    return _height;
                },
                set: function(value){
                    _height = value;
                }
            });

            /**
             * The width of the excluded area
             * @property {Number} width
             */
            Object.defineProperty(this, "width", {
                get: function(){
                    return _width;
                },
                set: function(value){
                    _width = value;
                }
            });
            //endregion
        };

        Obstruction.prototype = Object.create(createjs.Bitmap.prototype);

        //region Public Functions
        /**
         * Init
         */
        Obstruction.prototype.init = function(){
            createjs.Bitmap.apply(this, []);

            if(!this.image){
                this.image = {
                    width: this.width,
                    height: this.height
                }
            }

            return this;
        };
        //endregion

        return Obstruction;
    }
);

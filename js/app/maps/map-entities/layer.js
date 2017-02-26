/**
 * Created with JetBrains WebStorm.
 * User: Hai
 * Date: 24/11/14
 * Time: 9:06 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    'app/maps/map-entities/layer',
    ['createjs', 'app/core/loader'],
    function(createjs, Loader){

        /**
         * Object representing a layer on the map
         *
         * @name Layer
         * @constructor
         *
         * @property {Object} startLocation
         *
         * @param {String} assetId
         * @param {Object} startLocation
         *
         * @requires createjs
         */
        var Layer = function(assetId, startLocation){
            var _location = startLocation;

            this._assetId = assetId;

            /**
             * The start location for the layer
             * @property {Object} startLocation
             */
            Object.defineProperty(this, "startLocation", {
                get: function(){
                    return _location;
                },
                set: function(value){
                    _location = value;
                }
            });
        };

        Layer.prototype = Object.create(createjs.Bitmap.prototype);

        //region Public Functions
        /**
         * Init
         */
        Layer.prototype.init = function(){
            createjs.Bitmap.apply(this, [Loader.getResult(this._assetId)]);
            this.x = this.startLocation.x;
            this.y = this.startLocation.y;

            return this;
        };
        //endregion

        return Layer;
    }
);
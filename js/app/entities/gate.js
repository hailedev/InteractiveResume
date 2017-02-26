/**
 * Created with JetBrains WebStorm.
 * User: Hai
 * Date: 28/09/14
 * Time: 10:34 AM
 * To change this template use File | Settings | File Templates.
 */
define(
    'app/entities/gate',
    ['createjs', 'app/entities/entity', 'app/core/loader'],
    function(createjs, Entity, Loader){

        // load the assets used by this module
        Loader.manifest.push({src:"assets/gate.png", id:"gate"});

        /**
         * Object representing a gate to a new level
         *
         * @name Gate
         * @constructor
         *
         * @property {Number} level
         * @property {Portal} portal
         *
         * @param {Number} startX       The x axis start position
         * @param {Number} startY       The y axis start position
         * @param {Number} level        The level the gate leads to
         * @param {Function} canOpen    The can open callback
         * @param {Portal} portal
         *
         * @requires createjs
         * @requires Entity
         */
        var Gate = function(startX, startY, level, canOpen, portal){
            this._startX = startX;
            this._startY = startY;
            this._canOpen = canOpen ? canOpen : function(){ return true; };

            var _level = level;
            var _portal = portal;

            //region Public Properties
            /**
             * The level the gate leads to
             * @property {Number} level
             */
            Object.defineProperty(this, "level", {
                get: function(){
                    return _level;
                },
                set: function(value){
                    _level = value;
                }
            });

            /**
             *
             * @property {Sprite} portal
             */
            Object.defineProperty(this, "portal", {
                get: function(){
                    return _portal;
                },
                set: function(value){
                    _portal = value;
                }
            });
            //endregion
        };

        Gate.prototype = Object.create(Entity.prototype);

        //region Public Functions
        /**
         * Init
         */
        Gate.prototype.init = function(){
            var data = new createjs.SpriteSheet({
                "images": [Loader.getResult("gate")],
                "frames": {"regX": 0, "height": 40, "count": 1, "regY": 0, "width": 20}
            });

            Entity.apply(this, [this._startX, this._startY, data]);
            Entity.prototype.init.call(this, []);
            this.gotoAndStop(0);
            this.alpha = 0.0;//0.5;
            this.name = 'gate';
            return this;
        };

        /**
         * Whether the gate can be opened
         * @param player
         */
        Gate.prototype.canOpen = function(player){
            return this._canOpen(player);
        };

        /**
         * The scale factor for the gate
         * @param scaleX
         * @param scaleY
         */
        Gate.prototype.scale = function(scaleX, scaleY){
            this.scaleX = scaleX;
            this.scaleY = scaleY;
            return this;
        };
        //endregion

        return Gate;
    }
);

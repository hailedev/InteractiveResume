/**
 * Created with JetBrains WebStorm.
 * User: Hai
 * Date: 9/10/14
 * Time: 9:35 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    'app/entities/chest',
    ['createjs', 'app/entities/entity', 'app/core/loader'],
    function(createjs, Entity, Loader){

        // load the assets used by this module
        Loader.manifest.push({src:"assets/chest.png", id:"chest"});

        /**
         * Object representing a chest
         *
         * @name Chest
         * @constructor
         *
         * @property {String} state
         * @property {Boolean} clear
         *
         * @param {Number} startX   The x axis start position
         * @param {Number} startY   The y axis start position
         * @param {Object} item     The item contained in the chest
         * @param {Boolean} clear   Whether to remove the chest
         *
         * @requires Entity
         * @requires Loader
         */
        var Chest = function(startX, startY, item, clear){
            this._startX = startX;
            this._startY = startY;
            this._item = item;

            var _state = "closed";
            var _clear = clear;

            /**
             * The current state of the chest, either opened or closed
             * @property {String} state
             */
            Object.defineProperty(this, "state", {
                get: function(){
                    return _state;
                },
                set: function(value){
                    _state = value;
                }
            });

            /**
             * Whether to remove the chest on open
             * @property {Boolean} clear
             */
            Object.defineProperty(this, "clear", {
                get: function(){
                    return _clear;
                }
            });
        };

        Chest.prototype = Object.create(Entity.prototype);

        //region Public Functions
        /**
         * Init
         */
        Chest.prototype.init = function(spriteData){
            if(!spriteData){
                spriteData = new createjs.SpriteSheet({
                    "images": [Loader.getResult("chest")],
                    "frames": {"regX": 0, "height": 128, "count": 2, "regY": 0, "width": 120},
                    "animations": {"closed": [0, 0], "open": [1, 1]}
                });
            }

            Entity.apply(this, [this._startX, this._startY, spriteData]);
            Entity.prototype.init.call(this, []);
            this.framerate = 30;
            this.gotoAndStop("closed");
            this.name = 'chest';
            return this;
        };

        /**
         * Opens the chest returning the item
         */
        Chest.prototype.open = function(){
            this.gotoAndPlay("open");
            this.state = "open";

            this._item.tickEnabled = true;
            this._item.gotoAndPlay("start");
            return this._item;
        };
        //endregion

        return Chest;
    }
);
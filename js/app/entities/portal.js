/**
 * Created with JetBrains WebStorm.
 * User: Hai
 * Date: 8/11/14
 * Time: 6:57 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    'app/entities/portal',
    ['createjs', 'app/entities/entity'],
    function(createjs, Entity){

        /**
         * Object representing an entrance graphic
         *
         * @name Portal
         * @constructor
         *
         * @property {Boolean} canEnter      The name of the entity
         * @property {Boolean} isEntity      Whether the gate is collidable entity
         *
         * @requires createjs
         */
        var Portal = function(startX, startY, data, entity){
            this._startX = startX;
            this._startY = startY;
            this._data = data;

            var canEnter = false;
            var isEntity = entity === undefined;

            Object.defineProperty(this, "canEnter", {
                get: function(){
                    return canEnter;
                },
                set: function(value){
                    canEnter = value;
                }
            });

            Object.defineProperty(this, "isEntity", {
                get: function(){
                    return isEntity;
                },
                set: function(value){
                    isEntity = value;
                }
            });
        };

        Portal.prototype = Object.create(Entity.prototype);

        //region Private Functions
        /**
         * The tick event handler for the sprite
         */
        var tick = function(){
            var currentFrame = this.currentFrame;
            var numFrames = this.spriteSheet.getNumFrames(this.currentAnimation) - 1;

            if(this.canEnter && currentFrame != numFrames){
                currentFrame++;
                this._goto(this.currentAnimation, currentFrame);
                return;
            }

            if(!this.canEnter && currentFrame != 0){
                currentFrame--;
                this._goto(this.currentAnimation, currentFrame);
            }
        };
        //endregion

        //region Public Functions
        /**
         * Init
         */
        Portal.prototype.init = function(){
            Entity.apply(this, [this._startX, this._startY, this._data]);
            Entity.prototype.init.call(this, []);
            this.tickEnabled = true;
            this.gotoAndStop("start");
            this.addEventListener("tick", tick.bind(this));
            this.name = "portal";
            return this;
        };
        //endregion

        return Portal;
    }
);
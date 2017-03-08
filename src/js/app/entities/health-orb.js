/**
 * Created with JetBrains WebStorm.
 * User: Hai
 * Date: 4/10/14
 * Time: 7:42 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    'app/entities/health-orb',
    ['createjs', 'app/entities/entity', 'app/core/loader'],
    function(createjs, Entity, Loader){

        // load the assets used by this module
        Loader.manifest.push({src:"assets/health-orb.png", id:"health-orb"});

        /**
         * Object representing a health orb
         *
         * @name HealthOrb
         * @constructor
         * @augments Entity
         *
         * @property {String} message
         * @property {Number} healAmount
         *
         * @param {Number} startX   The x axis start position
         * @param {Number} startY   The y axis start position
         * @param {String} message  The message to display in the message box
         *
         * @requires createjs
         * @requires Entity
         * @requires Loader
         */
        var HealthOrb = function(startX, startY, message){
            this._startX = startX;
            this._startY = startY;

            var _healAmount = 4;
            var _message = message;
            var _collected = false;

            //region Public Properties
            /**
             * The message to display on the game screen
             * @property {String} message
             */
            Object.defineProperty(this, "message", {
                get: function(){
                    return _message;
                },
                set: function(value){
                    _message = value;
                }
            });

            /**
             * The amount to heal the player
             * @property {Number} healAmount
             */
            Object.defineProperty(this, "healAmount", {
                get: function(){
                    return _healAmount;
                },
                set: function(value){
                    _healAmount = value;
                }
            });

            /**
             * Whether the orb has been collected
             * @property {Boolean} collected
             */
            Object.defineProperty(this, "collected", {
                get: function(){
                    return _collected;
                },
                set: function(value){
                    _collected = value;
                }
            });
            //endregion
        };

        HealthOrb.prototype = Object.create(Entity.prototype);

        //region Public Functions
        /**
         * Init
         */
        HealthOrb.prototype.init = function(){
            var data = new createjs.SpriteSheet({
                "images": [Loader.getResult("health-orb")],
                "frames": {"regX": 0, "height": 102, "count": 1, "regY": 0, "width": 100}
            });

            Entity.apply(this, [this._startX, this._startY, data]);
            Entity.prototype.init.call(this, []);
            this.setTransform(50, 50, 0.5, 0.5);
            this.gotoAndStop(0);
            this.name = 'health-orb';
            return this;
        };
        //endregion

        return HealthOrb;
    }
);

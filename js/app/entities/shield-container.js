/**
 * Created with JetBrains WebStorm.
 * User: Hai
 * Date: 28/12/14
 * Time: 10:00 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    'app/entities/shield-container',
    ['createjs', 'app/entities/chest', 'app/entities/entity', 'app/core/loader'],
    function(createjs, Chest, Entity, Loader){

        Loader.manifest.push({src:"assets/shield-container.png", id:"shield-container"});

        /**
         * Object representing the lowered shield
         *
         * @name ShieldContainer
         * @constructor
         *
         * @property {String} state
         *
         * @param {Number} startX   The x axis start position
         * @param {Number} startY   The y axis start position
         * @param {Object} item     The item contained in the chest
         *
         * @requires Entity
         * @requires Loader
         */
        var ShieldContainer = function(startX, startY, item){
            Chest.apply(this, [startX, startY, item, true]);
        };

        ShieldContainer.prototype = Object.create(Chest.prototype);

        //region Public Functions
        /**
         * Init
         */
        ShieldContainer.prototype.init = function(){
            var data = new createjs.SpriteSheet({
                "images": [Loader.getResult("shield-container")],
                "frames": {"regX": 0, "height": 56, "count": 2, "regY": 0, "width": 144},
                "animations": {"closed": [0, 0], "open": [1, 1]}
            });

            Entity.apply(this, [this._startX, this._startY, data]);
            Entity.prototype.init.call(this, []);
            this.framerate = 30;
            this.gotoAndStop("closed");
            this.name = 'chest';
            return this;
        };
        //endregion

        return ShieldContainer;
    }
);
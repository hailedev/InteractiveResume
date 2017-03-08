/**
 * Created with JetBrains WebStorm.
 * User: Hai
 * Date: 30/11/14
 * Time: 4:28 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    'app/entities/ice-block',
    ['createjs', 'app/entities/chest', 'app/entities/entity', 'app/core/loader'],
    function(createjs, Chest, Entity, Loader){

        Loader.manifest.push({src:"assets/ice-block/ice-block.png", id:"ice-block"});

        /**
         * Object representing a IceBlock
         *
         * @name IceBlock
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
        var IceBlock = function(startX, startY, item){
            Chest.apply(this, [startX, startY, item]);
        };

        IceBlock.prototype = Object.create(Chest.prototype);

        //region Public Functions
        /**
         * Init
         */
        IceBlock.prototype.init = function(){
            var data = new createjs.SpriteSheet({
                "images": [Loader.getResult("ice-block")],
                "frames": {"regX": 0, "height": 103, "count": 2, "regY": 0, "width": 110},
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

        return IceBlock;
    }
);
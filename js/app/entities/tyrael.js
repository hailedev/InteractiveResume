/**
 * Created with JetBrains WebStorm.
 * User: Hai
 * Date: 20/01/15
 * Time: 11:24 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    'app/entities/tyrael',
    ['createjs', 'app/entities/entity', 'app/core/loader'],
    function(createjs, Entity, Loader){

        Loader.manifest.push({src:"assets/tyrael.png", id:"tyrael"});

        /**
         * Object representing the tyrael character
         *
         * @name Tyrael
         * @constructor
         *
         * @requires createjs
         * @requires Entity
         * @requires Loader
         */
        var Tyrael = function(startX, startY){
            this._startX = startX;
            this._startY = startY;
        };

        Tyrael.prototype = Object.create(Entity.prototype);

        //region Puplic Functions
        /**
         * Init
         */
        Tyrael.prototype.init = function(){
            var data = new createjs.SpriteSheet({
                "images": [Loader.getResult("tyrael")],
                "frames": {"regX": 0, "height": 200, "count": 1, "regY": 0, "width": 409},
                "animations": {"start": [0, 0, "start"]}
            });

            Entity.apply(this, [this._startX, this._startY, data]);
            Entity.prototype.init.call(this, []);
            this.name = 'tyrael';
            this.gotoAndStop(0);
            return this;
        };
        //endregion

        return Tyrael;
    }
);

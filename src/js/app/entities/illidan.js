/**
 * Created with JetBrains WebStorm.
 * User: Hai
 * Date: 25/10/14
 * Time: 11:11 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    'app/entities/illidan',
    ['createjs', 'app/entities/entity', 'app/core/loader'],
    function(createjs, Entity, Loader){

        Loader.manifest.push({src:"assets/illidan.png", id:"illidan"});

        /**
         * Object representing the illidan character
         *
         * @name Illidan
         * @constructor
         *
         * @requires createjs
         * @requires Entity
         * @requires Loader
         */
        var Illidan = function(startX, startY){
            this._startX = startX;
            this._startY = startY;
        };

        Illidan.prototype = Object.create(Entity.prototype);

        //region Puplic Functions
        /**
         * Init
         */
        Illidan.prototype.init = function(){
            var data = new createjs.SpriteSheet({
                "images": [Loader.getResult("illidan")],
                "frames": {"regX": 0, "height": 262, "count": 1, "regY": 0, "width": 220},
                "animations": {"start": [0, 0, "start"]}
            });

            Entity.apply(this, [this._startX, this._startY, data]);
            Entity.prototype.init.call(this, []);
            this.name = 'illidan';
            this.gotoAndStop(0);
            return this;
        };
        //endregion

        return Illidan;
    }
);

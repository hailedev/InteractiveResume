/**
 * Created with JetBrains WebStorm.
 * User: Hai
 * Date: 8/11/14
 * Time: 10:28 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    'app/entities/caverns-entrance',
    ['app/entities/portal', 'app/core/loader'],
    function(Portal, Loader){

        // load the assets used by this module
        Loader.manifest.push({src:"assets/caverns-entrance-gate.png", id:"caverns-entrance-gate"});

        /**
         * Object representing the cavers gate
         *
         * @name CavernsEntrance
         * @constructor
         *
         * @param {Number} startX   The x axis start position
         * @param {Number} startY   The y axis start position
         *
         * @extends Portal
         * @requires Loader
         */
        var CavernsEntrance = function(startX, startY){
            this._startX = startX;
            this._startY = startY;
        };

        CavernsEntrance.prototype = Object.create(Portal.prototype);

        //region Public Functions
        /**
         * Init
         */
        CavernsEntrance.prototype.init = function(){
            var data = new createjs.SpriteSheet({
                "images": [Loader.getResult("caverns-entrance-gate")],
                "frames": {"regX": 0, "height": 171, "count": 32, "regY": 0, "width": 250},
                "animations": {"start": [0, 31]}
            });

            Portal.apply(this, [this._startX, this._startY, data]);
            return Portal.prototype.init.call(this, []);
        };
        //endregion

        return CavernsEntrance;
    }
);

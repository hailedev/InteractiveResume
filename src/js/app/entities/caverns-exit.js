/**
 * Created with JetBrains WebStorm.
 * User: Hai
 * Date: 9/11/14
 * Time: 8:18 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    'app/entities/caverns-exit',
    ['app/entities/portal', 'app/core/loader'],
    function(Portal, Loader){

        // load the assets used by this module
        Loader.manifest.push({src:"assets/caverns-exit-gate.png", id:"caverns-exit-gate"});

        /**
         * Object representing the cathedral exit gate
         *
         * @name CavernsExit
         * @constructor
         *
         * @param {Number} startX   The x axis start position
         * @param {Number} startY   The y axis start position
         *
         * @extends Portal
         * @requires Loader
         */
        var CavernsExit = function(startX, startY){
            this._startX = startX;
            this._startY = startY;
        };

        CavernsExit.prototype = Object.create(Portal.prototype);

        //region Public Functions
        /**
         * Init
         */
        CavernsExit.prototype.init = function(){
            var data = new createjs.SpriteSheet({
                "images": [Loader.getResult("caverns-exit-gate")],
                "frames": {"regX": 0, "height": 172, "count": 32, "regY": 0, "width": 231},
                "animations": {"start": [0, 31]}
            });

            Portal.apply(this, [this._startX, this._startY, data, false]);
            return Portal.prototype.init.call(this, []);
        };
        //endregion

        return CavernsExit;
    }
);
/**
 * Created with JetBrains WebStorm.
 * User: Hai
 * Date: 8/11/14
 * Time: 10:42 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    'app/entities/whimsy-entrance',
    ['app/entities/portal', 'app/core/loader'],
    function(Portal, Loader){

        // load the assets used by this module
        Loader.manifest.push({src:"assets/whimsy-entrance-gate.png", id:"whimsy-entrance-gate"});

        /**
         * Object representing the whimsy gate
         *
         * @name WhimsyEntrance
         * @constructor
         *
         * @param {Number} startX   The x axis start position
         * @param {Number} startY   The y axis start position
         *
         * @extends Portal
         * @requires Loader
         */
        var WhimsyEntrance = function(startX, startY){
            this._startX = startX;
            this._startY = startY;
        };

        WhimsyEntrance.prototype = Object.create(Portal.prototype);

        //region Public Functions
        /**
         * Init
         */
        WhimsyEntrance.prototype.init = function(){
            var data = new createjs.SpriteSheet({
                "images": [Loader.getResult("whimsy-entrance-gate")],
                "frames": {"regX": 0, "height": 105, "count": 20, "regY": 0, "width": 340},
                "animations": {"start": [0, 19]}
            });

            Portal.apply(this, [this._startX, this._startY, data]);
            return Portal.prototype.init.call(this, []);
        };
        //endregion

        return WhimsyEntrance;
    }
);
/**
 * Created with JetBrains WebStorm.
 * User: Hai
 * Date: 9/11/14
 * Time: 7:43 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    'app/entities/whimsy-exit',
    ['app/entities/portal', 'app/core/loader'],
    function(Portal, Loader){

        // load the assets used by this module
        Loader.manifest.push({src:"assets/whimsy-exit-gate.png", id:"whimsy-exit-gate"});

        /**
         * Object representing the cathedral exit gate
         *
         * @name WhimsyExit
         * @constructor
         *
         * @param {Number} startX   The x axis start position
         * @param {Number} startY   The y axis start position
         *
         * @extends Portal
         * @requires Loader
         */
        var WhimsyExit = function(startX, startY){
            this._startX = startX;
            this._startY = startY;
        };

        WhimsyExit.prototype = Object.create(Portal.prototype);

        //region Public Functions
        /**
         * Init
         */
        WhimsyExit.prototype.init = function(){
            var data = new createjs.SpriteSheet({
                "images": [Loader.getResult("whimsy-exit-gate")],
                "frames": {"regX": 0, "height": 270, "count": 20, "regY": 0, "width": 200},
                "animations": {"start": [0, 19]}
            });

            Portal.apply(this, [this._startX, this._startY, data]);
            this.scaleX = 0.7;
            this.scaleY = 0.6;
            return Portal.prototype.init.call(this, []);
        };
        //endregion

        return WhimsyExit;
    }
);
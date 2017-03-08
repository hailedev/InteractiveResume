/**
 * Created with JetBrains WebStorm.
 * User: Hai
 * Date: 9/11/14
 * Time: 7:04 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    'app/entities/cathedral-exit',
    ['app/entities/portal', 'app/core/loader'],
    function(Portal, Loader){

        // load the assets used by this module
        Loader.manifest.push({src:"assets/cathedral-exit-gate.png", id:"cathedral-exit-gate"});

        /**
         * Object representing the cathedral exit gate
         *
         * @name CathedralExit
         * @constructor
         *
         * @param {Number} startX   The x axis start position
         * @param {Number} startY   The y axis start position
         *
         * @extends Portal
         * @requires Loader
         */
        var CathedralExit = function(startX, startY){
            this._startX = startX;
            this._startY = startY;
        };

        CathedralExit.prototype = Object.create(Portal.prototype);

        //region Public Functions
        /**
         * Init
         */
        CathedralExit.prototype.init = function(){
            var data = new createjs.SpriteSheet({
                "images": [Loader.getResult("cathedral-exit-gate")],
                "frames": {"regX": 0, "height": 150, "count": 32, "regY": 0, "width": 140},
                "animations": {"start": [0, 31]}
            });

            Portal.apply(this, [this._startX, this._startY, data, false]);
            return Portal.prototype.init.call(this, []);
        };
        //endregion

        return CathedralExit;
    }
);
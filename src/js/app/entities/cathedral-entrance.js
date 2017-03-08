/**
 * Created with JetBrains WebStorm.
 * User: Hai
 * Date: 8/11/14
 * Time: 6:58 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    'app/entities/cathedral-entrance',
    ['app/entities/portal', 'app/core/loader'],
    function(Portal, Loader){

        // load the assets used by this module
        Loader.manifest.push({src:"assets/cathedral-entrance-gate.png", id:"cathedral-entrance-gate"});

        /**
         * Object representing the cavers gate
         *
         * @name CathedralEntrance
         * @constructor
         *
         * @param {Number} startX   The x axis start position
         * @param {Number} startY   The y axis start position
         *
         * @extends Portal
         * @requires Loader
         */
        var CathedralEntrance = function(startX, startY){
            this._startX = startX;
            this._startY = startY;
        };

        CathedralEntrance.prototype = Object.create(Portal.prototype);

        //region Public Functions
        /**
         * Init
         */
        CathedralEntrance.prototype.init = function(){
            var data = new createjs.SpriteSheet({
                "images": [Loader.getResult("cathedral-entrance-gate")],
                "frames": {"regX": 0, "height": 380, "count": 24, "regY": 0, "width": 220},
                "animations": {"start": [0, 23]}
            });

            Portal.apply(this, [this._startX, this._startY, data]);
            return Portal.prototype.init.call(this, []);
        };
        //endregion

        return CathedralEntrance;
    }
);
/**
 * Created with JetBrains WebStorm.
 * User: Hai
 * Date: 8/11/14
 * Time: 11:03 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    'app/entities/heavens-entrance',
    ['app/entities/portal', 'app/core/loader'],
    function(Portal, Loader){

        // load the assets used by this module
        Loader.manifest.push({src:"assets/heavens-entrance-gate.png", id:"heavens-entrance-gate"});

        /**
         * Object representing the cavers gate
         *
         * @name HeavensEntrance
         * @constructor
         *
         * @param {Number} startX   The x axis start position
         * @param {Number} startY   The y axis start position
         *
         * @extends Portal
         * @requires Loader
         */
        var HeavensEntrance = function(startX, startY){
            this._startX = startX;
            this._startY = startY;
        };

        HeavensEntrance.prototype = Object.create(Portal.prototype);

        //region Public Functions
        /**
         * Init
         */
        HeavensEntrance.prototype.init = function(){
            var data = new createjs.SpriteSheet({
                "images": [Loader.getResult("heavens-entrance-gate")],
                "frames": {"regX": 0, "height": 270, "count": 20, "regY": 0, "width": 200},
                "animations": {"start": [0, 19]}
            });

            Portal.apply(this, [this._startX, this._startY, data]);
            this.scaleX = 0.7;
            this.scaleY = 0.6;
            return Portal.prototype.init.call(this, []);
        };
        //endregion

        return HeavensEntrance;
    }
);
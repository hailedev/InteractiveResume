/**
 * Created with JetBrains WebStorm.
 * User: Hai
 * Date: 12/10/14
 * Time: 7:33 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    'app/entities/helm',
    ['createjs', 'app/entities/entity', 'app/core/loader'],
    function(createjs, Entity, Loader){

        // load the assets used by this module
        Loader.manifest.push({src:"assets/helm.png", id:"helm"});

        /**
         * Object representing the helm
         *
         * @name Helm
         * @constructor
         *
         * @property {String} slot
         * @property {String} description
         *
         */
        var Helm = function(startX, startY){
            this._startX = startX;
            this._startY = startY;

            var _slot = "head";
            var _description = "<h3>Academic Qualifications Acquired</h3>" +
                "<p>Completed Master of Computer Science at Monash University in 2009, and Bachelor of Digital Systems with Honours in 2004, also at Monash University.<br/><br/> " +
                "Completed research projects in the field of content based image retrieval, in which user feedback is used to weight the relevance of features in order to align with user perceptions of similarity.<br/><br/>" +
                "Conducted literature surveys in improving quality of service of mobile data transmission. </p>";

            /**
             * The slot the item is for
             * @property {String} state
             */
            Object.defineProperty(this, "slot", {
                get: function(){
                    return _slot;
                }
            });

            /**
             * The slot the item is for
             * @property {String} description
             */
            Object.defineProperty(this, "description", {
                get: function(){
                    return _description;
                }
            });
        };

        Helm.prototype = Object.create(Entity.prototype);

        //region Public Functions
        /**
         * Init
         */
        Helm.prototype.init = function(){
            var data = new createjs.SpriteSheet({
                "images": [Loader.getResult("helm")],
                "frames": {"regX": 0, "height": 77, "count": 1, "regY": 0, "width": 55},
                "animations": {"start": [0, 0, "start"]}
            });

            Entity.apply(this, [this._startX, this._startY, data]);
            Entity.prototype.init.call(this, []);
            this.name = 'helm';
            return this;
        };
        //endregion

        return Helm;
    }
);

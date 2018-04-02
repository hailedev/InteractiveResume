/**
 * Created with JetBrains WebStorm.
 * User: Hai
 * Date: 12/10/14
 * Time: 7:24 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    'app/entities/sword',
    ['app/entities/entity', 'app/core/loader'],
    function(Entity, Loader){

        // load the assets used by this module
        Loader.manifest.push({src:"assets/ice-block/frostmourne.png", id:"sword"});

        /**
         * Object representing the sword
         *
         * @name Sword
         * @constructor
         *
         * @property {String} slot
         * @property {String} description
         *
         */
        var Sword = function(startX, startY){
            this._startX = startX;
            this._startY = startY;

            var _slot = "mainHand";
            var _description = "<h3>Skills & Certifications Acquired</h3>" +
                "<p>Microsoft Certified Solution Developer</p>" +
                "<ul><li>Web Applications</li></ul>" +
                "<p>Microsoft Certified Technology Specialist</p>" +
                "<ul>" +
                "<li>Web Applications (.Net 2.0)</li>" +
                "<li>Windows Applications (.Net 2.0)</li>" +
                "</ul>" +
                "<p>Microsoft Certified Solution Developer .Net (MCSD)</p>" +
                "<p>Microsoft Certified Application Developer .Net (MCAD)</p>" +
                "<p>Certified Umbraco Developer Level 2</p>" +
                "<p>Certified Umbraco Developer Level 1</p>" +
                "<p>Unity Certified Developer</p>";

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

        Sword.prototype = Object.create(Entity.prototype);

        //region Public Functions
        /**
         * Init
         */
        Sword.prototype.init = function(){
            var data = new createjs.SpriteSheet({
                "images": [Loader.getResult("sword")],
                "frames": {"regX": 0, "height": 133, "count": 1, "regY": 0, "width": 53},
                "animations": {"start": [0, 0, "start"]}
            });

            Entity.apply(this, [this._startX, this._startY, data]);
            Entity.prototype.init.call(this, []);
            this.name = 'sword';
            return this;
        };
        //endregion

        return Sword;
    }
);
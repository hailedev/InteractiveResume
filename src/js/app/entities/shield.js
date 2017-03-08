/**
 * Created with JetBrains WebStorm.
 * User: Hai
 * Date: 12/10/14
 * Time: 2:39 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    'app/entities/shield',
    ['createjs', 'app/entities/entity', 'app/core/loader'],
    function(createjs, Entity, Loader){

        // load the assets used by this module
        Loader.manifest.push({src:"assets/shield.png", id:"shield"});

        /**
         * Object representing the shield
         *
         * @name Shield
         * @constructor
         *
         * @property {String} slot
         * @property {String} description
         *
         */
        var Shield = function(startX, startY){
            this._startX = startX;
            this._startY = startY;

            var _slot = "offHand";
            var _description = "<h3>Professional Experience Acquired</h3>" +
                "<h4>QSR International - Software Developer (2009 - Current)</h4>" +
                "<p>Role as a .NET software developer as part of a Scrum (AGILE) team, developing software for qualitative data analysis.  " +
                "Core responsibilities involved implementing business requirements using various framework technologies including WPF and SQL Server.  " +
                "Tasked with implementing functionality to consume RESTful services, developing web API’s in JavaScript and building installation packages.  " +
                "Additional responsibilities include production support by providing users with remote assistance.</p><p><br/></p>" +
                "<h4>QSR International - Test Analyst (2007 - 2009)</h4>" +
                "<p>Served as a system tester for the development of qualitative data analysis software.  Scope of role involved design and implementation of test cases " +
                "for the functionality, deployment, performance and interoperability of software.  Responsible for the design and development of automated testing scripts " +
                "and the automated testing framework</p><p><br/></p>" +
                "<h4>BMM Testlabs - System Consultant (2005 - 2006)</h4>" +
                "<p>Served as a test engineer ensuring compliance and verification of electronic gaming machines according to national standards</p><p><br/></p>" +
                "<h4>Volunteer Web Developer at World Vision Australia (2015 - 2016)</h4>" +
                "<p>Developed and design a website to collate and showcase information on World Vision Australia's youth livelihoods programs</p>";

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

        Shield.prototype = Object.create(Entity.prototype);

        //region Public Functions
        /**
         * Init
         */
        Shield.prototype.init = function(){
            var data = new createjs.SpriteSheet({
                "images": [Loader.getResult("shield")],
                "frames": {"regX": 0, "height": 93, "count": 1, "regY": 0, "width": 74},
                "animations": {"start": [0, 0, "start"]}
            });

            Entity.apply(this, [this._startX, this._startY, data]);
            Entity.prototype.init.call(this, []);
            this.name = 'shield';
            return this;
        };
        //endregion

        return Shield;
    }
);
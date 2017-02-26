define(
    'app/maps/whimsy',
    ['app/maps/map', 'app/entities/gate', 'app/entities/chest', 'app/entities/helm', 'app/entities/whimsy-exit', 'app/entities/obstruction', 'app/entities/health-orb', 'app/core/loader'],
    function(Map, Gate, Chest, Helm, WhimsyExit, Obstruction, HealthOrb, Loader){

        // load the assets used by this module
        Loader.manifest.push({src:"assets/whimsy.png", id:"whimsy"});
        Loader.manifest.push({src:"assets/clouds.png", id:"clouds"});

        /**
         * Object representing the whimsy stage
         *
         * @name Whimsy
         * @constructor
         *
         * @requires Map
         * @requires Gate
         */
        var Whimsy = function(){
        };

        Whimsy.prototype = Object.create(Map.prototype);

        //region Public Functions
        /**
         * Init
         */
        Whimsy.prototype.init = function(){
            Map.apply(this, ["whimsy", { width: 900, height: 800, x: 0, y: -150 }, { x: 390, y: 520 }, "whimsy", null, null, {x:710, y:290}]);
            var startGate = new Gate(0, 290, Levels.Start, null, new WhimsyExit(130, 200).init()).init().scale(10, 5);
            startGate.regX = 10;
            startGate.regY = 20;
            startGate.rotation = 90;
            startGate.startX = 200;
            this.gates.push(startGate);

            // setup the obstructions
            this.entities.push(new Obstruction(0, 498, 57, 302).init());
            this.entities.push(new Obstruction(55, 585, 23, 215).init());
            this.entities.push(new Obstruction(78, 638, 39, 162).init());
            this.entities.push(new Obstruction(115, 669, 55, 131).init());
            this.entities.push(new Obstruction(172, 689, 71, 111).init());
            this.entities.push(new Obstruction(243, 713, 219, 87).init());
            this.entities.push(new Obstruction(465, 679, 50, 121).init());
            this.entities.push(new Obstruction(517, 645, 175, 155).init());
            this.entities.push(new Obstruction(691, 630, 142, 170).init());
            this.entities.push(new Obstruction(832, 542, 68, 258).init());
            this.entities.push(new Obstruction(750, 400, 84, 74).init());
            this.entities.push(new HealthOrb(311, 230, "Wrote C#, Javascript code to interface with RESTful services using OAuth protocol").init());
            this.entities.push(new HealthOrb(282, 483, "Developed C# and Javascript bindings for Evernote and LinkedIn REST API's").init());
            this.entities.push(new HealthOrb(482, 293, "Developed C#, Javascript bindings for SurveyMonkey and YouTube Data API's").init());
            this.entities.push(new HealthOrb(632, 453, "Member of Golden Key Honour society in recognition of academic excellence").init());
            this.entities.push(new HealthOrb(532, 553, "Developed Facebook and Twitter REST API clients in C# and Javascript").init());

            // setup the loot
            this.entities.push(new Chest(700, 250, new Helm(735, 240).init()).init());

            Map.prototype.init.call(this, []);

            var clouds1 = new createjs.Bitmap(Loader.getResult("clouds"));
            clouds1.x = 20;
            clouds1.y = 713;
            clouds1.tickEnabled = true;
            clouds1.addEventListener("tick", tick.bind(clouds1));

            var clouds2 = new createjs.Bitmap(Loader.getResult("clouds"));
            clouds2.x = -900;
            clouds2.y = 713;
            clouds2.tickEnabled = true;
            clouds2.addEventListener("tick", tick.bind(clouds2));

            this.mainLayer.addChild(clouds1);
            this.mainLayer.addChild(clouds2);

            return this;
        };
        //endregion

        var tick = function(){
            this.x+= 0.3;
            if(this.x >= 835){
                this.x = -900;
            }
        };

        return Whimsy;
    }
);

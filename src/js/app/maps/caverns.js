define(
    'app/maps/caverns',
    ['app/maps/map', 'app/entities/gate', 'app/entities/health-orb', 'app/entities/chest',
        'app/entities/shield', 'app/entities/shield-container', 'app/entities/caverns-exit', 'app/entities/obstruction', 'app/maps/map-entities/layer', 'app/core/loader'],
    function(Map, Gate, HealthOrb, Chest, Shield, ShieldContainer, CavernsExit, Obstruction, Layer, Loader){

        // load the assets used by this module
        Loader.manifest.push({src:"assets/caverns.png", id:"caverns"});
        Loader.manifest.push({src:"assets/caverns-top.png", id:"caverns-top"});

        /**
         * Object representing the caverns stage
         *
         * @name Caverns
         * @constructor
         *
         * @requires Map
         * @requires Gate
         */
        var Caverns = function(){
        };

        Caverns.prototype = Object.create(Map.prototype);

        //region Public Functions
        /**
         * Init
         */
        Caverns.prototype.init = function(){
            var topLayer = new Layer("caverns-top", {x: 0, y: 0}).init();
            Map.apply(this, ["caverns", { width: 1600, height: 650 }, { x: 70, y: 270 }, "caverns", topLayer, null, {x:1255, y:357}]);
            this.gates.push(new Gate(30, 100, Levels.Start, null, new CavernsExit(0, 110).init()).init().scale(11, 4));

            // setup the obstructions
            this.entities.push(new Obstruction(0, 20, 60, 391).init());
            this.entities.push(new Obstruction(61, 536, 131, 114).init());
            this.entities.push(new Obstruction(278, 480, 127, 111).init());
            this.entities.push(new Obstruction(470, 145, 135, 95).init());
            this.entities.push(new Obstruction(764, 419, 184, 188).init());
            this.entities.push(new Obstruction(1043, 130, 187, 146).init());
            this.entities.push(new Obstruction(1324, 258, 185, 77).init());

            // load the loot
            this.entities.push(new ShieldContainer(1135, 353, new Shield(1170, 323).init()).init());
            this.entities.push(new HealthOrb(311, 343, "Implemented designs using LESS and Bootstrap").init());
            this.entities.push(new HealthOrb(532, 453, "Developed C# and Javascript bindings for social media REST API's").init());
            this.entities.push(new HealthOrb(783, 142, "Experience with build pipeline tools include Webpack, Docker and Browserify").init());
            this.entities.push(new HealthOrb(979, 343, "Developed site components using Vue2 and Vuex state management library").init());
            this.entities.push(new HealthOrb(1102, 518, "Worked with React libraries including React Route, DraftJS and React DnD").init());
            this.entities.push(new HealthOrb(318, 151, "Developed payment processing services created with ASP.Net Core").init());
            this.entities.push(new HealthOrb(702, 318, "Developed e-commerce SPA websites using Angular framework ").init());
            return Map.prototype.init.call(this, []);
        };
        //endregion

        return Caverns;
    }
);

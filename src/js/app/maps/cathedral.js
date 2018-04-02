define(
    'app/maps/cathedral',
    ['createjs', 'app/maps/map', 'app/entities/gate', 'app/entities/health-orb', 'app/entities/ice-block',
        'app/entities/sword', 'app/entities/obstruction', 'app/entities/cathedral-exit', 'app/core/loader'],
    function(createjs, Map, Gate, HealthOrb, IceBlock, Sword, Obstruction, CathedralExit, Loader){

        // load the assets used by this module
        Loader.manifest.push({src:"assets/cathedral.png", id:"cathedral"});
        Loader.manifest.push({src:"assets/ice-block/ice-block-overlay.png", id:"ice-block-overlay"});

        /**
         * Object representing the cathedral stage
         *
         * @name Cathedral
         * @constructor
         *
         * @requires Map
         * @requires Gate
         * @requires HealthOrb
         * @requires Obstruction
         * @requires Loader
         */
        var Cathedral = function(){
        };

        Cathedral.prototype = Object.create(Map.prototype);

        //region Public Functions
        /**
         * Init
         */
        Cathedral.prototype.init = function(){
            Map.apply(this, ["cathedral", { width: 900, height: 1100, x: 0, y: 0 }, { x: 400, y: 280 }, "cathedral", null, null, {x:275, y:950}]);
            this.gates.push(new Gate(375, 200, Levels.Start, null, new CathedralExit(375, 122).init()).init().scale(7, 2));

            // setup the obstructions
            this.entities.push(new Obstruction(152, 396, 202, 46).init());
            this.entities.push(new Obstruction(152, 619, 202, 46).init());
            this.entities.push(new Obstruction(152, 837, 202, 46).init());
            this.entities.push(new Obstruction(535, 396, 202, 46).init());
            this.entities.push(new Obstruction(535, 619, 202, 46).init());
            this.entities.push(new Obstruction(535, 838, 202, 46).init());

            // setup the loot
            this.entities.push(new HealthOrb(250, 309, "Experience with Microsoft VSTS and Git").init());
            this.entities.push(new HealthOrb(572, 294, "Languages & frameworks include C#, ES5 & ES6, .NET 2.5-4.5 & Core").init());
            this.entities.push(new HealthOrb(314, 514, "Experience with desktop frameworks WPF and WinForms").init());
            this.entities.push(new HealthOrb(414, 970, "Experience with backend frameworks ASP .NET MVC & Core, ASP .NET Web Forms").init());
            this.entities.push(new HealthOrb(402, 750, "Worked with frontend frameworks Angular, Vue and React").init());
            this.entities.push(new HealthOrb(562, 480, "Experience with content management systems Umbraco and Sitefinity").init());

            // order is specific to setup the opacity
            var frostMourne = new Sword(235, 885).init();
            this.entities.push(new IceBlock(200, 950, frostMourne).init());
            this.entities.push(frostMourne);
            var iceOverlay = new createjs.Bitmap(Loader.getResult("ice-block-overlay"));
            iceOverlay.x= 200;
            iceOverlay.y= 950;
            iceOverlay.alpha = 0.7;
            Map.prototype.init.call(this, []);

            this.mainLayer.addChild(iceOverlay);

            return this;
        };
        //endregion

        return Cathedral;
    }
);

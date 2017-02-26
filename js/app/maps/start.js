define(
    'app/maps/start',
    ['app/maps/map', 'app/entities/gate', 'app/entities/cathedral-entrance', 'app/entities/caverns-entrance', 'app/entities/whimsy-entrance', 'app/entities/heavens-entrance', 'app/core/loader'],
    function(Map, Gate, CathedralEntrance, CavernsEntrance, WhimsyEntrance, HeavensEntrance, Loader){

        // load the assets used by this module
        Loader.manifest.push({src:"assets/start.png", id:"start"});

        /**
         * Object representing the start stage
         *
         * @name Start
         * @constructor
         *
         * @requires Map
         * @requires Gate
         */
        var Start = function(){
        };

        Start.prototype = Object.create(Map.prototype);

        /**
         * Whether the player can open the final portal
         * @param player
         */
        var canOpenHeavensPortal = function(player){
            return player.health >= 100 && player.head && player.mainHand && player.offHand;
        };

        /**
         * Init
         */
        Start.prototype.init = function(){
            Map.apply(this, ["start", { width: 900, height: 650 }, { x: 400, y: 350 }, "start"]);
            var cathedralGate = new Gate(70, 394, Levels.Cathedral, null, new CathedralEntrance(0, 130).init()).init().scale(8, 4);
            var cavernsGate = new Gate(630, 342, Levels.Caverns, null, new CavernsEntrance(680, 300).init()).init().scale(1.5, 2.5);
            var whisyGate = new Gate(0, 540, Levels.Whimsy, null, new WhimsyEntrance(300, 545).init()).init();
            var heavensGate = new Gate(0, 130, Levels.Heavens, canOpenHeavensPortal, new HeavensEntrance(385, 120).init()).init();
            heavensGate.regX = 10;
            heavensGate.regY = 20;
            heavensGate.rotation = 90;
            heavensGate.startX = 450;
            heavensGate.scaleY = 4;
            heavensGate.scaleX = 16;

            whisyGate.regX = 10;
            whisyGate.regY = 20;
            whisyGate.rotation = 90;
            whisyGate.startX = 440;
            whisyGate.scaleY = 4;
            whisyGate.scaleX = 1.5;

            this.gates.push(cathedralGate);
            this.gates.push(cavernsGate);
            this.gates.push(heavensGate);
            this.gates.push(whisyGate);

            return Map.prototype.init.call(this, []);
        };

        /**
         * Unloads the player from the container
         * @param {Number} newLevel The level being unloaded
         */
        Start.prototype.Unload = function(newLevel){
            if(newLevel){
                switch(newLevel){
                    case Levels.Heavens:
                        this.startX = 390;
                        this.startY = 140;
                        break;
                    case Levels.Caverns:
                        this.startX = 530;
                        this.startY = 310;
                        break;
                    case Levels.Whimsy:
                        this.startX = 410;
                        this.startY = 375;
                        break;
                    case Levels.Cathedral:
                        this.startX = 260;
                        this.startY = 370;
                        break;
                }
            }

            Map.prototype.Unload.call(this, []);
        };

        return Start;
    }
);

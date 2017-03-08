define(
    'app/maps/heavens',
    ['app/maps/map', 'app/entities/gate', 'app/entities/tyrael', 'app/core/loader'],
    function(Map, Gate, Tyrael, Loader){

        // load the assets used by this module
        Loader.manifest.push({src:"assets/heavens.png", id:"heavens"});

        /**
         * Object representing the Heavens stage
         *
         * @name Heavens
         * @constructor
         *
         * @requires Map
         * @requires Gate
         */
        var Heavens = function(){
        };

        Heavens.prototype = Object.create(Map.prototype);

        //region Public Functions
        /**
         * Init
         */
        Heavens.prototype.init = function(){
            Map.apply(this, ["heavens", { width: 900, height: 880, x:0, y:-230 }, { x: 390, y: 680 }, "heavens"]);
            this.entities.push(new Tyrael(385, 175).init());

            return Map.prototype.init.call(this, []);
        };
        //endregion

        return Heavens;
    }
);

define(
    'app/core/loader',
    ['createjs'],
    function(createjs){

        /**
         * The loader object
         *
         * @name Loader
         * @constructor
         *
         * @property {Object.<String, String>[]} manifest
         *
         * @requires createjs
         */
        var Loader = function(){

            var _loadQueue = new createjs.LoadQueue(false);
            var _manifest = [];

            //region Public Properties
            /**
             * The items to load
             * @property {Object.<String, String>} manifest
             */
            Object.defineProperty(this, "manifest", {
                get: function(){
                    return _manifest;
                },
                set: function(value){
                    _manifest = value;
                }
            });

            this.loadAssets = function(callback, progress){
                _loadQueue.addEventListener("complete", callback);
                _loadQueue.addEventListener("progress", progress);
                _loadQueue.loadManifest(_manifest);
            };

            this.getResult = function(id){
                return _loadQueue.getResult(id);
            };
        };

        return new Loader();
    }
);

define(
    'app/entities/entity',
    ['createjs'],
    function(createjs){

        /**
         * The function that defines an entity in the game world
         *
         * @name Entity
         * @constructor
         *
         * @property {String} name              The name of the entity
         * @property {String} entitydescription The description of the entity
         * @property {Number} startX            The x axis start position of the entity
         * @property {Number} startY            The y axis start position of the entity
         * @property {Boolean} obstruction      Whether the entity is an obstruction
         *
         * @requires createjs
         */
        var Entity = function(startX, startY, data){
            this._data = data;
            var _name = null;
            var _description = null;
            var _startX = startX;
            var _startY = startY;
            var _obstruction = false;

            //region Public Properties
            /**
             * The name of the entity
             * @property {String} name
             */
            Object.defineProperty(this, "entityname", {
                get: function(){
                    return _name;
                },
                set: function(value){
                    _name = value;
                }
            });

            /**
             * The description of the entity
             * @property {String} description
             */
            Object.defineProperty(this, "entitydescription", {
                get: function(){
                    return _description;
                },
                set: function(value){
                    _description = value;
                }
            });

            /**
             * The x axis start location
             * @property {Number} startX
             */
            Object.defineProperty(this, "startX", {
                get: function(){
                    return _startX;
                },
                set: function(value){
                    _startX = value;
                }
            });

            /**
             * The y axis start location
             * @property {Number} startY
             */
            Object.defineProperty(this, "startY", {
                get: function(){
                    return _startY;
                },
                set: function(value){
                    _startY = value;
                }
            });

            /**
             * Whether the entity is an obstruction
             * @property {Boolean} obstruction
             */
            Object.defineProperty(this, "obstruction", {
                get: function(){
                    return _obstruction;
                },
                set: function(value){
                    _obstruction = value;
                }
            });
            //endregion
        };

        Entity.prototype = Object.create(createjs.Sprite.prototype);

        //region Public Functions
        /**
         * Init
         */
        Entity.prototype.init = function(){
            createjs.Sprite.apply(this, [this._data]);
            this.x = this.startX;
            this.y = this.startY;
            this.tickEnabled = false;
        };
        //endregion

        return Entity;
    }
);

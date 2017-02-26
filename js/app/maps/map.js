define(
    'app/maps/map',
    ['createjs', 'ndgmr', 'app/core/loader'],
    function(createjs, ndgmr, Loader){

        Loader.manifest.push({src:"assets/star.png", id:"star"});

        /**
         * Object representing a stage in the game
         *
         * @name Map
         * @constructor
         *
         * @property {String} name
         * @property {Entity[]} entities
         * @property {Object.<String, Number>} dimensions
         * @property {Number} startX
         * @property {Number} startY
         * @property {Gate[]} gates
         * @property {Container} mainLayer
         * @property {Layer} topLayer
         * @property {Layer} bottomLayer
         * @property {Number} scrollX
         * @property {Number} scrollY
         * @property {Bitmap} itemIndicator
         *
         * @param {String} name
         * @param {Object.<String, Number>} dimensions
         * @param {Object.<String, Number>} startLocation
         * @param {String} backgroundId
         * @param {Layer} topLayer
         * @param {Layer} bottomLayer
         * @param {Object.<String, Number>} itemLocation
         * @param {Boolean} ending
         *
         * @requires createjs
         */
        var Map = function(name, dimensions, startLocation, backgroundId, topLayer, bottomLayer, itemLocation){
            var _name = name;
            var _entities = [];
            var _dimensions = dimensions;
            var _startX = startLocation.x;
            var _startY = startLocation.y;
            var _gates = [];
            var _topLayer = topLayer;
            var _bottomLayer = bottomLayer;
            var _mainLayer = new createjs.Container();

            var _itemIndicator;
            if(itemLocation){
                _itemIndicator = new createjs.Bitmap(Loader.getResult("star"));
                _itemIndicator.set({x: itemLocation.x, y: itemLocation.y, regX: 17.5, regY: 17.5});
            }

            this._background = backgroundId ? new createjs.Bitmap(Loader.getResult(backgroundId)) : new createjs.Bitmap();
            this._canEnterGate = false;

            //region Public Properties
            /**
             * The name of the map
             * @property {String} name
             */
            Object.defineProperty(this, "name", {
                get: function(){
                    return _name;
                },
                set: function(value){
                    _name = value;
                }
            });

            /**
             * The enitites that are contained in the map
             * @property {Entity[]} entities
             */
            Object.defineProperty(this, "entities", {
                get: function(){
                    return _entities;
                },
                set: function(value){
                    _entities = value;
                }
            });

            /**
             * The dimensions of the map
             * @property {Object.<String, Number>} dimensions
             */
            Object.defineProperty(this, "dimensions", {
                get: function(){
                    return _dimensions;
                },
                set: function(value){
                    _dimensions = value;
                }
            });

            /**
             * The x axis start position of the player
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
             * The y axis start position of the player
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
             * The gates for the map
             * @property {Gate[]} gates
             */
            Object.defineProperty(this, "gates", {
                get: function(){
                    return _gates;
                },
                set: function(value){
                    _gates = value;
                }
            });

            /**
             * The main layer of the game
             * @property {Layer} mainLayer
             */
            Object.defineProperty(this, "mainLayer", {
                get: function(){
                    return _mainLayer;
                },
                set: function(value){
                    _mainLayer = value;
                }
            });

            /**
             * The top layer of the map for parallax scrolling
             * @property {Layer} topLayer
             */
            Object.defineProperty(this, "topLayer", {
                get: function(){
                    return _topLayer;
                },
                set: function(value){
                    _topLayer = value;
                }
            });

            /**
             * The bottom layer of the map for parallax scrolling
             * @property {Layer} bottomLayer
             */
            Object.defineProperty(this, "bottomLayer", {
                get: function(){
                    return _bottomLayer;
                },
                set: function(value){
                    _bottomLayer = value;
                }
            });

            /**
             * The x scroll position
             * @property {Number} scrollX
             */
            Object.defineProperty(this, "scrollX", {
                get: function(){
                    return _mainLayer.x;
                },
                set: function(value){
                    _mainLayer.x = value;
                    if(_topLayer){
                        _topLayer.x = value*1.3;
                    }
                    if(_bottomLayer){
                        _bottomLayer.x = value*0.5;
                    }
                }
            });

            /**
             * The y scroll position
             * @property {Number} scrollY
             */
            Object.defineProperty(this, "scrollY", {
                get: function(){
                    return _mainLayer.y;
                },
                set: function(value){
                    _mainLayer.y = value;
                    if(_topLayer){
                        _topLayer.y = value*1.3;
                    }
                    if(_bottomLayer){
                        _bottomLayer.y = value*0.5;
                    }
                }
            });

            /**
             * The item indicator
             * @property {Bitmap} itemIndicator
             */
            Object.defineProperty(this, "itemIndicator", {
                get: function(){
                    return _itemIndicator;
                }
            });
            //endregion
        };

        Map.prototype = Object.create(createjs.Container.prototype);

        /**
         * The tick event handler
         */
        var tick = function(){
            if(!this._player){
                return;
            }

            var gate;
            for(var i=0; i<this.gates.length; i++){
                var collision = ndgmr.checkRectCollision(this._player, this.gates[i]);
                if(collision){
                    gate = this.gates[i];
                }

                if(this.gates[i].portal){
                    this.gates[i].portal.canEnter = collision != undefined;
                }
            }

            var hasGate = (gate != undefined);

            if(hasGate !== this._canEnterGate){
                this._canEnterGate = hasGate;
                this._player.gateCanEnterChanged(gate);
            }
        };

        //region Public Functions
        /**
         * Init
         */
        Map.prototype.init = function(){
            createjs.Container.apply(this, []);
            var x = this.dimensions.x ? this.dimensions.x : 0;
            var y = this.dimensions.y ? this.dimensions.y : 0;

            this.setBounds(0, 0, this.dimensions.width, this.dimensions.height);
            this.mainLayer.x = x;
            this.mainLayer.y = y;

            // add the background
            this.mainLayer.addChild(this._background);

            for(var i=0; i<this.entities.length; i++){
                var entity = this.entities[i];
                entity.x = entity.startX;
                entity.y = entity.startY;

                this.mainLayer.addChild(entity);
            }

            for(i=0; i<this.gates.length; i++){
                var gate = this.gates[i];
                gate.x = gate.startX;
                gate.y = gate.startY;

                this.mainLayer.addChild(gate);
                if(gate.portal){
                    this.mainLayer.addChild(gate.portal);
                    if(gate.portal.isEntity){
                        this.entities.push(gate.portal);
                    }
                }
            }

            this.addChild(this.mainLayer);
            if(this.itemIndicator){
                this.mainLayer.addChild(this.itemIndicator);
                var that = this;
                var loop = function(){
                    createjs.Tween.get(that.itemIndicator)
                        .to({scaleX:0, scaleY:0, rotation:180}, 1000, null)
                        .call(function(){
                            setTimeout(function(){
                                createjs.Tween.get(that.itemIndicator)
                                    .to({scaleX:1.2, scaleY:1.2, rotation:360}, 1000, null)
                                    .call(loop, [], that)
                                    .to({scaleX: 1.2, scaleY: 1.2, rotation:0}, 0, null);
                            }, 700)
                        }, [], that);
                };
                loop();
            }
            if(this.topLayer){
                this.addChild(this.topLayer);
            }
            return this;
        };

        /**
         * Loads the player sprite in the container
         * @param {Hero} player
         */
        Map.prototype.Load = function(player){
            this.mainLayer.x = this.dimensions.x ? this.dimensions.x : 0;
            this.mainLayer.y = this.dimensions.y ? this.dimensions.y : 0;

            if(!this._player){
                this._player = player;
            }

            this._player.x = this.startX;
            this._player.y = this.startY;
            this.mainLayer.addChild(this._player);

            this._player.gateCanEnterChanged(null);
            this.addEventListener("tick", tick.bind(this));
        };

        /**
         * Unloads the player from the container
         */
        Map.prototype.Unload = function(){
            if(this._player){
                this.mainLayer.removeChild(this._player);
            }

            this.removeEventListener("tick", tick.bind(this));

            for(var i=0; i<this.gates.length; i++){
                if(this.gates[i].portal){
                    var portal = this.gates[i].portal;
                    portal.canEnter = false;
                    portal._goto(portal.currentAnimation, 0);
                }
            }
        };

        /**
         * Removes an entity from the container
         * @param {Entity} entity
         */
        Map.prototype.RemoveEntity = function(entity){
            var index = this.entities.indexOf(entity);
            if(index > -1){
                this.entities.splice(index, 1);
                this.mainLayer.removeChild(entity);
            }
        };

        /**
         * Adds an entity to the map
         * @param {Entity} entity
         */
        Map.prototype.AddEntity = function(entity){
            var index = this.entities.indexOf(entity);
            if(index > -1){
                return;
            }
            entity.x = entity.startX;
            entity.y = entity.startY;
            this.mainLayer.addChild(entity);
        };
        //endregion

        return Map;
    }
);

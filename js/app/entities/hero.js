define(
    'app/entities/hero',
    ['jquery', 'createjs', 'app/core/loader', 'module'],
    function($, createjs, Loader, module){

        // load the assets used by this module
        Loader.manifest.push({src:"assets/hero.png", id:"hero"});
        Loader.manifest.push({src:"assets/hero-head.png", id:"hero-head"});
        Loader.manifest.push({src:"assets/hero-offHand.png", id:"hero-offHand"});
        Loader.manifest.push({src:"assets/hero-mainHand.png", id:"hero-mainHand"});
        Loader.manifest.push({src:"assets/hero-head-mainHand.png", id:"hero-head-mainHand"});
        Loader.manifest.push({src:"assets/hero-head-offHand.png", id:"hero-head-offHand"});
        Loader.manifest.push({src:"assets/hero-mainHand-offHand.png", id:"hero-mainHand-offHand"});
        Loader.manifest.push({src:"assets/hero-head-mainHand-offHand.png", id:"hero-head-mainHand-offHand"});
        Loader.manifest.push({src:"assets/heal-overlay.png", id:"heal-overlay"});

        /**
         * Object representing the player and associated actions
         *
         * @name Hero
         * @constructor
         *
         * @property {String} collided
         * @property {Boolean} head
         * @property {Boolean} mainHand
         * @property {Boolean} offHand
         * @property {Number} health
         *
         * @param {Keyboard} keyboard     The keyboard handler
         *
         * @requires createjs
         */
        var Hero = function(keyboard){
            //region Private Members
            this._keyboard = keyboard;
            this._currentState = PlayerStates.Standing;
            this._currentDirection = PlayerDirection.Right;
            this._playerSprite = null;
            this._healOverlaySprite = null;
            this._interactable = null;
            this._gate = null;
            this._handleInteractable = 0;
            this._currentWidth = 0;
            this._message = $("#enter-message");

            var _collided = { };
            var _items = [];
            var _health = 0;

            //endregion

            //region Public Properties
            /**
             * The collided direction of the player
             * @property {String} collided
             */
            Object.defineProperty(this, "collided", {
                get: function(){
                    return _collided;
                },
                set: function(value){
                    _collided = value;
                }
            });

            /**
             * Whether headgear is equipped
             * @property {Boolean} head
             */
            Object.defineProperty(this, "head", {
                get: function(){
                    return _items["head"];
                },
                set: function(value){
                    _items["head"] = value;
                }
            });

            /**
             * Whether a main hand item is equipped
             * @property {Boolean} mainHand
             */
            Object.defineProperty(this, "mainHand", {
                get: function(){
                    return _items["mainHand"];
                },
                set: function(value){
                    _items["mainHand"] = value;
                }
            });

            /**
             * Whether a off hand item is equipped
             * @property {Boolean} offHand
             */
            Object.defineProperty(this, "offHand", {
                get: function(){
                    return _items["offHand"];
                },
                set: function(value){
                    // TODO: update UI
                    _items["offHand"] = value;
                }
            });

            /**
             * The current health of the player
             * @property {Number} health
             */
            Object.defineProperty(this, "health", {
                get: function(){
                    return _health;
                },
                set: function(value){
                    if(_health >= 100){
                        value = 100;
                    }
                    _health = value;
                }
            });
            //endregion
        };

        Hero.prototype = Object.create(createjs.Container.prototype);

        //region Private Functions
        /**
         * The tick event handler for the player sprite
         */
        var tick = function(){
            var that = this;
            // handle collisions
            for(var prop in this.collided){
                if (this.collided.hasOwnProperty(prop)) {
                    handleCollision.call(this, this.collided[prop]);
                }
            }

            if(this._interactable){
                if(this._interactable.name === "chest" && this._interactable.state === "closed"){
                    if(this._message.css("opacity") == 0){
                        this._message.text("Press Space to Interact");
                        this._message.css("opacity", 1);
                    }
                }
            } else if(!this._gate){
                this._message.css("opacity", 0);
            }

            // handle movement
            if(!this._keyboard.down && !this._keyboard.up && !this._keyboard.left && !this._keyboard.right && !this._keyboard.space){
                this.playerStand();
                return;
            }

            if(this._keyboard.down){
                this.moveDown();
            }
            else if(this._keyboard.up){
                this.moveUp();
            }
            else if(this._keyboard.left){
                this.moveLeft();
            }
            else if(this._keyboard.right){
                this.moveRight();
            }

            if(this._keyboard.space && this._handleInteractable <= 0){
                this._handleInteractable++;
                if(this._gate){
                    this.dispatchEvent({ type: "gateEntryEvent", item: this._gate, success: this._gate.canOpen(this) });
                }
                if(this._interactable){
                    if(this._interactable.name === "chest" && this._interactable.state === "closed"){
                        var item = this._interactable.open();
                        this.dispatchEvent({ type: "chestOpenEvent", item: item, sender: this, chest: this._interactable,
                            callback: function(sender){
                                if(sender.hasOwnProperty(item.slot)){
                                    sender[item.slot] = item;
                                }

                                // build the id
                                var id = "hero";
                                if(sender.head !== undefined){
                                    id += "-head";
                                }
                                if(sender.mainHand !== undefined){
                                    id += "-mainHand";
                                }
                                if(sender.offHand !== undefined){
                                    id += "-offHand";
                                }
                                setPlayerSprite.call(that, [id]);
                                that._message.css("opacity", 0);
                            }
                        });
                    }
                }
                setTimeout(function(){
                    that._handleInteractable--;
                }, 200);
            }

            this._interactable = null;
        };

        /**
         * Handles a collision with the player
         * @param {Entity} collision
         */
        var handleCollision = function(collision){
            if(!collision){
                return;
            }

            switch(collision.name){
                case 'health-orb':
                    if(collision.collected){
                        break;
                    }
                    collision.collected = true;
                    this._healOverlaySprite.set({ alpha: 1 });
                    this._healOverlaySprite.gotoAndPlay("heal");
                    this.dispatchEvent({ type: "healEvent", item: collision });
                    break;
                case 'chest':
                    this._interactable = collision;
                    break;
            }
        };

        /**
         * Set the player sprite
         * @param {String} id
         */
        var setPlayerSprite = function(id){
            // setup the player sprite
            if(this._playerSprite){
                this.removeChild(this._playerSprite);
            }
            var that = this;
            var images = Loader.getResult(id);
            if(images === null){
                images = Loader.getResult("hero");
            }

            this._currentWidth = (id[0].indexOf("mainHand") > -1) ? 217 : 167;
            var herodata = new createjs.SpriteSheet({
                "images": [images],
                "frames": {"regX": 0, "height": 321, "count": 20, "regY": 0, "width": this._currentWidth},
                // define two animations, run (loops, 1.5x speed) and jump (returns to run):
                "animations": {"run": [2, 19, "run", 1.5], "stand":[0, 0, "stand"]}
            });

            this._playerSprite = new createjs.Sprite(herodata, "stand");
            this._playerSprite.setTransform(0, 0, 0.45, 0.45);
            this._playerSprite.framerate = 20;
            this._playerSprite.addEventListener("animationend", function(){
                that._currentState = PlayerStates.Standing;
            });
            this._playerSprite.addEventListener("tick", tick.bind(this));
            this.addChild(this._playerSprite);

            // setup the heal overlay
            if(this._healOverlaySprite){
                this.removeChild(this._healOverlaySprite);
            }

            var healdata = new createjs.SpriteSheet({
                "images": [Loader.getResult("heal-overlay")],
                "frames": {"regX": 0, "height": 321, "count": 12, "regY": 0, "width": 167},
                "animations": {"pause": 0, "heal": [0, 11, "pause", 0.4]}
            });

            this._healOverlaySprite = new createjs.Sprite(healdata, "heal");
            this._healOverlaySprite.addEventListener("animationend", function(){
                that._healOverlaySprite.set({ alpha: 0 });
                that._healOverlaySprite.gotoAndStop("pause");
            });
            this._healOverlaySprite.setTransform(0, 0, 0.45, 0.45);
            this._healOverlaySprite.set({ alpha: 0 });
            this._healOverlaySprite.gotoAndStop("pause");
            this.addChild(this._healOverlaySprite);

            if(this._currentDirection === PlayerDirection.Left){
                this._playerSprite.regX = this._currentWidth;
                this._playerSprite.scaleX = -0.45;
                this._currentDirection = PlayerDirection.Left;
            }
        };
        //endregion

        //region Public Functions
        /**
         * Init
         */
        Hero.prototype.init = function(){
            // setup the container
            createjs.Container.apply(this, []);
            setPlayerSprite.call(this, ["hero"]);

            return this;
        };

        /**
         * Sets the position of the player on the screen
         * @param {Number} x
         * @param {Number} y
         */
        Hero.prototype.setPosition = function(x,y){
            this.x = x;
            this.y = y;
        };

        /**
         * Moves the player left
         */
        Hero.prototype.moveLeft = function(){
            if(this._currentState === PlayerStates.Standing){
                this._playerSprite.gotoAndPlay("run");
                this._currentState = PlayerStates.Running;
            }

            if(this.collided && this.collided.left){
                return;
            }

            if(this._currentDirection !== PlayerDirection.Left){
                this._playerSprite.regX = this._currentWidth;
                this._playerSprite.scaleX = -0.45;
                this._currentDirection = PlayerDirection.Left;
            }

            this.x -= module.config().MoveSpeed;
        };

        /**
         * Moves the player right
         */
        Hero.prototype.moveRight = function(){
            if(this._currentState === PlayerStates.Standing){
                this._playerSprite.gotoAndPlay("run");
                this._currentState = PlayerStates.Running;
            }

            if(this.collided && this.collided.right){
                return;
            }

            if(this._currentDirection !== PlayerDirection.Right){
                this._playerSprite.regX = 0;
                this._playerSprite.scaleX = 0.45;
                this._currentDirection = PlayerDirection.Right;
            }

            this.x += module.config().MoveSpeed;
        };

        /**
         * Moves the player up
         */
        Hero.prototype.moveUp = function(){
            if(this._currentState === PlayerStates.Standing){
                this._playerSprite.gotoAndPlay("run");
                this._currentState = PlayerStates.Running;
            }

            if(this.collided && this.collided.top){
                return;
            }

            if(this._currentDirection !== PlayerDirection.Up){
                this._currentDirection = PlayerDirection.Up;
            }

            this.y -= module.config().MoveSpeed;
        };

        /**
         * Moves the player down
         */
        Hero.prototype.moveDown = function(){
            if(this._currentState === PlayerStates.Standing){
                this._playerSprite.gotoAndPlay("run");
                this._currentState = PlayerStates.Running;
            }

            if(this.collided && this.collided.bottom){
                return;
            }

            if(this._currentDirection !== PlayerDirection.Down){
                this._currentDirection = PlayerDirection.Down;
            }

            this.y += module.config().MoveSpeed;
        };

        /**
         * Forces the player to stand
         */
        Hero.prototype.playerStand = function(){
            if(this._currentState !== PlayerStates.Jumping){
                this._playerSprite.gotoAndPlay("stand");
                this._currentState = PlayerStates.Standing;
            }
        };

        /**
         * Play the jump animation for the player
         */
        Hero.prototype.jump = function(){
            if(this._currentState !== PlayerStates.Jumping){
                this._currentState = PlayerStates.Jumping;
                this._playerSprite.gotoAndPlay("jump");
            }
        };

        /**
         * Sets the activable gate
         * @param {Gate} gate
         */
        Hero.prototype.gateCanEnterChanged = function(gate){
            this._gate = gate;
            if(gate){
                this._message.text("Press Space to Enter");
                this._message.css("opacity", 1);
                return;
            }
            this._message.css("opacity", 0);
        };
        //endregion

        return Hero;
    }
);

define(
    'app/game',
    ['jquery', 'createjs', 'ndgmr', 'app/entities/hero', 'app/core/loader',
        'app/maps/start', 'app/maps/heavens', 'app/maps/caverns', 'app/maps/whimsy', 'app/maps/cathedral', 'app/entities/illidan', 'app/strings/questions', 'module', 'simple-modal'],
    function($, createjs, ndgmr, Hero, Loader, Start, Heavens, Caverns, Whimsy, Cathedral, Illidan, Questions, module){

        var loadindMessages = ["Testing in production", "Cleaning Whitespace", "Pasting Code", "Copying Code", "Making Coffee"];
        /**
         * The main game class
         *
         * @name Game
         * @constructor
         *
         * @param {Mouse} [mouse]       The mouse handler
         * @param {Keyboard} [keyboard] The keyboard handler
         *
         * @requires createjs
         * @requires ndgmr
         * @requires Hero
         */
        var Game = function(mouse, keyboard){
            //region Private Members
            this._mouseHandler = mouse;
            this._keyboardHandler = keyboard;
            this._player = null;
            this._mode = GameModes.Starting;
            this._stage = new createjs.Stage("game-canvas");
            this._overlay = new createjs.Stage("overlay-canvas");
            this._hudOverlay = new createjs.Stage("game-hud");
            this._currentLevel = null;
            this._maps = [];

            this._stageHeight = 0;
            this._stageWidth = 0;
            this._playerHeight = 0;
            this._playerWidth = 0;

            this._messages = [];
            this._currentMessageIndex = 0;
            this._lastCollision = { direction: null, xAxisSize: 0, yAxisSize: 0 };
            this._interval = null;
            this._imageId = 0;
            this._portraitMutex = 0;
            this._questionCounter = 0;
            this._progressInterval = null;
            //endregion
        };

        //region Private Functions
        /**
         * The tick event handler for the main game canvas
         */
        var tick = function(){
            switch(this._mode){
                case GameModes.Starting:
                    if(this._keyboardHandler.space){
                        loadAssets.call(this);
                    }
                    break;
                case GameModes.Running:
                    // collision check
                    var currentCollision = {};
                    currentCollision.left = this._player.x <= 0 ? this._currentLevel : null;
                    currentCollision.right = (this._player.x + this._playerWidth) >= this._stageWidth ? this._currentLevel : null;
                    currentCollision.bottom = (this._player.y + this._playerHeight) >= this._stageHeight ? this._currentLevel : null;
                    currentCollision.top = this._player.y <= 120 ? this._currentLevel : null;

                    for(var i=0; i<this._currentLevel.entities.length; i++){
                        var collision = ndgmr.checkRectCollision(this._player, this._currentLevel.entities[i]);
                        if(collision){
                            if(collision.height > collision.width){
                                if(this._lastCollision.xAxisSize >= collision.height){
                                    continue;
                                }
                                this._lastCollision.direction = "y";
                                this._lastCollision.yAxisSize = collision.width;
                                if(collision.x === collision.rect1.x){
                                    // collision occured to left of player
                                    currentCollision.left = this._currentLevel.entities[i];
                                } else if(Math.round(collision.x + collision.width) === Math.round(collision.rect1.x + collision.rect1.width)){
                                    // collision occurred to the right
                                    currentCollision.right = this._currentLevel.entities[i];
                                }
                            } else {
                                if(this._lastCollision.yAxisSize >= collision.width){
                                    continue;
                                }
                                this._lastCollision.direction = "x";
                                this._lastCollision.xAxisSize = collision.height;
                                if(collision.y === collision.rect1.y){
                                    currentCollision.top = this._currentLevel.entities[i];
                                } else if(Math.round(collision.y + collision.height) === Math.round(collision.rect1.y + collision.rect1.height)){
                                    currentCollision.bottom = this._currentLevel.entities[i];
                                }
                            }
                        }
                    }

                    this._player.collided = currentCollision;
                    scrollStage.call(this);
            }

            this._stage.update();
            this._overlay.update();
        };

        /**
         * Scrolls the level container to keep the player centered
         */
        var scrollStage = function(){
            // the player location in respect to the canvas
            var playerCanvasY = ((this._player.y + this._currentLevel.scrollY) + this._playerHeight/2);
            var playerCanvasX = ((this._player.x + this._currentLevel.scrollX) + this._playerWidth/2);
            var maxHeight = this._stageHeight - this._stage.canvas.height;
            var maxWidth = this._stageWidth - this._stage.canvas.width;
            if(this._keyboardHandler.up && !this._player.collided.top && this._currentLevel.scrollY < 0 &&
                (playerCanvasY <= ((this._stage.canvas.height+130)/2))){
                this._currentLevel.scrollY += module.config().MoveSpeed;
            }

            if(this._keyboardHandler.down && !this._player.collided.bottom && this._currentLevel.scrollY > -maxHeight &&
                (playerCanvasY >= ((this._stage.canvas.height+130)/2))){
                this._currentLevel.scrollY -= module.config().MoveSpeed;
            }

            if(this._keyboardHandler.left && !this._player.collided.left && this._currentLevel.scrollX < 0 &&
                (playerCanvasX <= this._stage.canvas.width/2)){
                this._currentLevel.scrollX += module.config().MoveSpeed;
            }

            if(this._keyboardHandler.right && !this._player.collided.right && this._currentLevel.scrollX > -maxWidth &&
                (playerCanvasX >= this._stage.canvas.width/2)){
                this._currentLevel.scrollX -= module.config().MoveSpeed;
            }
        };

        /**
         * Displays the specified game screens
         * @param {String[]} screens
         */
        var showScreens = function(screens){
            $(".game-screen").css("visibility", "hidden");
            for(var i=0; i<screens.length; i++){
                $("#"+screens[i]).css("visibility", "visible");
            }
        };

        /**
         * Loades the assets for the stage
         */
        var loadAssets = function(){
            var randFunc = function randomIntFromInterval(min,max) {
                return Math.floor(Math.random()*(max-min+1)+min);
            };
            $("#progress-message").text(loadindMessages[randFunc(0, loadindMessages.length - 1)]);
            this._progressInterval = setInterval(function(){
                $("#progress-message").text(loadindMessages[randFunc(0, loadindMessages.length - 1)]);
            }, 1500);

            $("#begin-label").css("display", "none");
            $("#loading-screen").css("display", "block");
            this._mode = GameModes.Loading;

            // add the portrait images
            Loader.manifest.push({src:"assets/profiles/profile2.png", id:"profile2"});
            Loader.manifest.push({src:"assets/profiles/profile3.png", id:"profile3"});
            Loader.manifest.push({src:"assets/profiles/profile4.png", id:"profile4"});
            Loader.manifest.push({src:"assets/hud-overlay.png", id:"hud-overlay"});

            Loader.loadAssets(handleComplete.bind(this), handleProgress.bind(this));
        };

        var handleProgress = function(event){
            var meter = $("#progress-meter");
            var width = event.progress*270;
            meter.width(width + "px");
        };

        /**
         * The function to execute when asset loading has completed
         */
        var handleComplete = function(){
            if(this._progressInterval){
                clearInterval(this._progressInterval);
            }
            // setup the levels
            this._maps.push(new Start().init());
            this._maps.push(new Heavens().init());
            this._maps.push(new Caverns().init());
            this._maps.push(new Whimsy().init());
            this._maps.push(new Cathedral().init());

            // setup the player
            this._player = new Hero(this._keyboardHandler).init();
            this._player.addEventListener("gateEntryEvent", handleGateEntry.bind(this));
            this._player.addEventListener("healEvent", handleHeal.bind(this));
            this._player.addEventListener("chestOpenEvent", handleChest.bind(this));
            setHealth.call(this, 30);

            var playerBounds = this._player.getTransformedBounds();

            this._playerHeight = playerBounds.height;
            this._playerWidth = playerBounds.width;

            this._hudOverlay.removeAllChildren();
            this._hudOverlay.addChild(new createjs.Bitmap(Loader.getResult("hud-overlay")));
            this._hudOverlay.update();

            loadLevel.call(this, Levels.Start);
            showScreens(["main-screen"]);
            this._mode = GameModes.Running;

            if(!this._interval){
                var rand = Math.floor(Math.random() * (6 - 4 + 1)) + 4;
                var that = this;
                this.interval = setInterval(function(){
                    if(that._portraitMutex > 0){
                        return;
                    }
                    animatePortrait.call(that, 2);
                }, rand * 1000)
            }
        };

        /**
         * Handles the gate entry event
         * @param {Object} args
         */
        var handleGateEntry = function(args){
            if(args.success){
                loadLevel.call(this, args.item.level);
                if(args.item.level === Levels.Heavens){
                    beginClosingSequence.call(this);
                }
                return;
            }

            $("#overlay-canvas").css("z-index", "5");
            var that = this;
            that._keyboardHandler.disable = true;
            createjs.Tween.get(that._overlay.getChildAt(0)).to({ y:230 , x: 340 }, 700, null)
                    .call(function(){
                        animatePortrait.call(that, 4, true);
                        var dialog = $('#message-dialog');
                        var message = getDeniedMessage.call(that);
                        dialog.html(message);
                        dialog.modal({ position: ['70%'], maxHeight: 100, minHeight: 100, onClose: function(){
                            $.modal.close();
                            createjs.Tween.get(that._overlay.getChildAt(0)).to({ y:-262, x:340}, 700, null)
                                .call(function(){
                                    $("#overlay-canvas").css("z-index", "3");
                                    var that = this;
                                    var overlay = $('#message-overlay-portrait-overlay');
                                    overlay.fadeTo(200, 1, function() {
                                        setTimeout(function(){
                                            overlay.fadeTo(200, 0, function(){
                                                overlay.empty();
                                                that._portraitMutex--;
                                            });
                                        }, 100);
                                    });
                                    that._keyboardHandler.disable = false;
                                }, [], that);
                        }});
                    },[], that);
        };

        var getDeniedMessage = function(){
            var message = "<h3 style=\"text-align:center\">You are not prepared</h3>";
            message += "<p style=\"text-align:center\">Make sure you have collected your gear and accumulated enough XP orbs before facing judgement!</p>";
            return message;
        };

        /**
         * Handles the heal event
         * @param {Object} args
         */
        var handleHeal = function(args){
            this._currentLevel.RemoveEntity(args.item);

            $("#overlay-canvas").css("z-index", "5");
            args.item.x += this._currentLevel.mainLayer.x;
            args.item.y += this._currentLevel.mainLayer.y;
            this._overlay.addChild(args.item);

            createjs.Tween.get(args.item)
                .to({ y: 55, x: 160 }, 100, null)
                .call(addHealth.bind(this, args.item),[], this);
        };

        /**
         * Handles the chest open event
         * @param {Object} args
         */
        var handleChest = function(args){
            if(args.chest.clear){
                this._currentLevel.RemoveEntity(args.chest);
            }
            this._currentLevel.mainLayer.removeChild(this._currentLevel.itemIndicator);
            this._currentLevel.AddEntity(args.item);

            var that = this;
            createjs.Tween.get(args.item)
                .to({ y: args.item.y - 80 }, 1000, null)
                .call(function(){
                    var slot = $('#' + args.item.slot);
                    slot.css('cursor', 'pointer');
                    var dialog = $('#message-dialog');
                    dialog.html(args.item.description);
                    dialog.modal({ position: ['50%'], minHeight: 260, maxHeight: 260, onClose: function(){
                        $.modal.close();
                        slot.toggleClass('enabled');
                        that._keyboardHandler.disable = false;
                        that._currentLevel.mainLayer.removeChild(args.item);
                        args.callback(args.sender);
                    }});
                    that._keyboardHandler.disable = true;
                },[],this);
        };

        var closingSequence = function(){
            $('#message-speech').addClass("message-speech-right");
            $('#bubble-previous').css('cursor', 'default');
            loadQuestion.call(this, true);
            setTimeout(function(){
                $("#message-speech").show();
            }, 600);
        };

        var loadQuestion = function(isQuestion){
            var container = $('#speech-container');
            container.data("current-question", Questions[this._questionCounter]);
            container.data("contains-question", isQuestion);
            var text = isQuestion ? container.data("current-question").question : container.data("current-question").response;
            container.html(text);
        };

        var beginClosingSequence = function(){
            this._keyboardHandler.disable = true;
            var that = this;
            var moveFunc = function(){
                setTimeout(function(){
                    if(that._player.y > 375){
                        that._keyboardHandler.up = true;
                        moveFunc();
                        return;
                    }
                    that._keyboardHandler.up = false;
                    if(that._player.x > 240){
                        that._keyboardHandler.left = true;
                        moveFunc();
                        return;
                    }
                    that._keyboardHandler.left = false;
                    if(that._player.y > 235){
                        that._keyboardHandler.up = true;
                        moveFunc();
                        return;
                    }
                    that._keyboardHandler.up = false;
                    that._player.moveRight();
                    closingSequence.call(that);
                }, 10);
            };

            setTimeout(function(){
                moveFunc();
            }, 800);
        };

        /**
         * Updates the screen when health is obtained
         * @param {HealthOrb} item
         */
        var addHealth = function(item){
            this._overlay.removeChild(item);
            setHealth.call(this, item.healAmount/2);

            // fade the xp bar
            $("#message-overlay-health").animate({boxShadow: '0 0 2px 3px #aa0000'}, 100,
                function(){
                    $("#message-overlay-health").animate({boxShadow: '0 0 0 0 #000'}, 100,
                        function(){});
                });

            var that = this;
            setTimeout(function(){
                setHealth.call(that, item.healAmount/2);
            }, 100);

            $("#overlay-canvas").css("z-index", "3");
            var message = $('#message-overlay-text');
            message.text(item.message);
            this._messages.push(item.message);
            this._currentMessageIndex = this._messages.length - 1;
            animatePortrait.call(this, 3);
            enabledSpinners.call(this);
        };

        /**
         * Enables the spinners
         */
        var enabledSpinners = function(){
            if(this._messages.length <= 1){
                return;
            }

            if(this._currentMessageIndex < this._messages.length - 1){
                $('#arrow-down').css('cursor', 'pointer');
            } else {
                $('#arrow-down').css('cursor', 'default');
            }

            if(this._currentMessageIndex > 0){
                $('#arrow-up').css('cursor', 'pointer');
            } else {
                $('#arrow-up').css('cursor', 'default');
            }
        };

        /**
         * Animate the portrait
         * @param {Number} id
         * @param {Boolean} isStatic
         */
        var animatePortrait = function(id, isStatic){
            var that = this;
            var scheduler = function(){
                if(that._portraitMutex > 0){
                    setTimeout(scheduler, 50);
                } else {
                    that._portraitMutex++;
                    var overlay = $('#message-overlay-portrait-overlay');
                    var image = Loader.getResult('profile' + id);
                    that._imageId++;
                    image.setAttribute('data-id', that._imageId.toString());

                    overlay.append(image);
                    overlay.fadeTo(200, 1, function() {
                        setTimeout(function(){
                            if(isStatic){
                                return;
                            }
                            if(overlay.has('img').length && overlay.children(':first').attr('data-id') == that._imageId){
                                overlay.fadeTo(200, 0, function(){
                                    overlay.empty();
                                    that._portraitMutex--;
                                });
                            }
                        }, 100);
                    });
                }
            };

            scheduler();
        };

        /**
         * Displays the specified game screens
         * @param {Map} level
         */
        var loadLevel = function(level){
            if(this._currentLevel){
                this._stage.removeChild(this._currentLevel);
                this._currentLevel.Unload(level);
            }

            var selectedLevel = this._maps[level];
            this._currentLevel = selectedLevel;
            selectedLevel.Load(this._player);
            this._stage.addChild(selectedLevel);

            var stageBounds = this._stage.getBounds();
            this._stageHeight = stageBounds.height;
            this._stageWidth = stageBounds.width;
            this._stage.update();

            if(this._overlay.getNumChildren() === 0){
                this._overlay.setBounds(0, 0, 900, 650);
                this._overlay.addChildAt((new Illidan(340, -262)).init(), 0);
                this._overlay.update();
            }
        };

        /**
         * The amount to add to the players health
         * @param {Number} amount
         */
        var setHealth = function(amount){
            this._player.health += amount;
            var currentHealth = $('#message-overlay-current-health');
            currentHealth.css("width", this._player.health + '%');

            if(this._player.health >= 100){
                currentHealth.css("border-radius", "20px");
            }
        };

        /**
         * Setup the hud displaying player info
         */
        var setupHud = function(){
            var that = this;
            $('#arrow-up').click(function(){
                if(that._currentMessageIndex > 0){
                    that._currentMessageIndex--;
                    var message = $('#message-overlay-text');
                    message.text(that._messages[that._currentMessageIndex]);
                    enabledSpinners.call(that);
                }
            });

            $('#arrow-down').click(function(){
                if(that._currentMessageIndex < that._messages.length - 1){
                    that._currentMessageIndex++;
                    var message = $('#message-overlay-text');
                    message.text(that._messages[that._currentMessageIndex]);
                    enabledSpinners.call(that);
                }
            });

            $('.slot').click(function(){
                var item = that._player[$(this).attr('id')];
                if(item){
                    var dialog = $('#message-dialog');
                    dialog.html(item.description);
                    dialog.modal({ position: ['50%'], minHeight: 260, maxHeight: 260 });
                }
            });

            $('#bubble-previous').click(function(){
                var container = $("#speech-container");
                var messageBox = $("#message-speech");
                var max = $('#maximize');
                if(!container.data("contains-question")){
                    if(that._questionCounter === Questions.length - 1){
                        that._questionCounter--;
                        loadQuestion.call(that, false);
                        $('#bubble-next').css('cursor', 'pointer');
                        messageBox.removeClass();
                        messageBox.addClass("message-speech-left");
                        max.css("display", "inline");
                        return;
                    }

                    container.html(container.data("current-question").question);
                    max.css("display", "none");
                    container.data("contains-question", true);
                    messageBox.removeClass();
                    messageBox.addClass("message-speech-right");
                    if(that._questionCounter === 0){
                        $('#bubble-previous').css('cursor', 'default');
                    }
                    if(that._questionCounter === Questions.length - 1){
                        $('#bubble-next').css('cursor', 'pointer');
                    }
                    return;
                }

                if(that._questionCounter > 0){
                    that._questionCounter--;
                    loadQuestion.call(that, false);
                    max.css("display", "inline");
                    messageBox.removeClass();
                    messageBox.addClass("message-speech-left");
                }
            });

            $('#bubble-next').click(function(){
                var container = $("#speech-container");
                var messageBox = $("#message-speech");
                var max = $('#maximize');
                if(container.data("contains-question")){
                    container.html(container.data("current-question").response);
                    max.css("display", "inline");
                    container.data("contains-question", false);
                    messageBox.removeClass();
                    messageBox.addClass("message-speech-left");
                    if(that._questionCounter === Questions.length - 1){
                        $('#bubble-next').css('cursor', 'default');
                    }
                    if(that._questionCounter === 0){
                        $('#bubble-previous').css('cursor', 'pointer');
                    }
                    return;
                }

                if(that._questionCounter < Questions.length - 1){
                    that._questionCounter++;
                    if(that._questionCounter === Questions.length - 1){
                        $('#bubble-next').css('cursor', 'default');
                        loadQuestion.call(that, false);
                        $('#maximize').css("display", "none");
                        return;
                    }
                    loadQuestion.call(that, true);
                    max.css("display", "none");
                    messageBox.removeClass();
                    messageBox.addClass("message-speech-right");
                }
            });

            $('#maximize').click(function(){
                var dialog = $('#message-dialog');
                var message = Questions[that._questionCounter].response;
                dialog.html(message);
                dialog.modal({ position: ['30%'], maxHeight: 400, minHeight: 400, maxWidth: 620, minWidth:620});
            });
        };
        //endregion

        //region Public Functions
        /**
         * Starts the game
         */
        Game.prototype.start = function(){
            // show the splash screen
            this._mode = GameModes.Starting;
            showScreens(["start-screen"]);

            // init the canvas
            createjs.Ticker.setFPS(module.config().FPS);
            createjs.Ticker.addEventListener("tick", tick.bind(this));

            setupHud.call(this);
        };
        //endregion

        return Game;
    }
);

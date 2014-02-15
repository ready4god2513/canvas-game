var Game = function(context){

  this.score = 0;
  this.speedModifier = 0.1;
  this.context = context;
  this.monsters = [];
  this.hero = {};
  this.assets = [];

  this.start = function(){
    this.initializeCharacters();
    this.initializeListeners();
  };

  this.initializeCharacters = function(){
    this.hero = new Sprite({
      url: "https://raw.github.com/lostdecade/simple_canvas_game/master/images/hero.png",
      x: 20,
      y: 20,
      speed: 50
    });

    this.monsters.push(new Sprite({
      url: "https://raw.github.com/lostdecade/simple_canvas_game/master/images/monster.png",
      x: 70,
      y: 70
    }));

    this.bg = new Sprite({
      url: "https://raw.github.com/lostdecade/simple_canvas_game/master/images/background.png",
      x: 0,
      y: 0
    });

    this.assets = characters = [
      this.bg,
      this.hero, 
      this.monsters
    ];
  };

  this.initializeListeners = function(){
    // 38 = up
    // 40 = down
    // 37 = left
    // 39 = right
    directions = {
      "38": "up",
      "40": "down",
      "37": "left",
      "39": "right"
    };

    var _this = this;

    addEventListener("keydown", function(e){
      if(e.keyCode in directions)
      {
        _this.moveDirection(directions[e.keyCode]);
      }
    });
  };

  this.changeSpeed = function(newSpeed){
    this.speedModifier = newSpeed;
  };

  this.moveDirection = function(direction){
    var distance = this.hero.speed * this.speedModifier;
    switch(direction){
      case "up":
        this.hero.y -= distance;
        break;
      case "down":
        this.hero.y += distance;
        break;
      case "left":
        this.hero.x -= distance;
        break;
      case "right":
        this.hero.x += distance;
        break;
    }
  };

  this.moveTo = function(x, y){
    this.hero.x = x;
    this.hero.y = y;
  };

  this.incrementScore = function(){
    this.score++;
  };

  this.redraw = function(){
    var flattened = [];
    flattened = flattened.concat.apply(flattened, this.assets);
    this.context.draw(flattened);
  };

  return this;
};

var Sprite = function(args){

  this.ready = false;
  this.img = new Image();
  this.img.src = args.url;
  this.x = args.x;
  this.y = args.y;
  this.speed = 0;

  if("speed" in args){
    this.speed = args.speed;
  }

  var _this = this;
  this.img.addEventListener("load", function(){
    _this.setReady();
  });

  this.setReady = function(){
    this.ready = true;
  };

  return this;
};

var Canvas = function(){

  this.bg = null;

  this.container = document.createElement("canvas");
  this.container.width = 512;
  this.container.height = 480;
  document.body.appendChild(this.container);

  this.context = this.container.getContext("2d");

  this.draw = function(elems){
    for(var i = 0; i < elems.length; i++){
      sprite = elems[i];
      this.context.drawImage(sprite.img, sprite.x, sprite.y);
    }
  };

  return this;
};

var canvas = new Canvas();

game = new Game(canvas);
game.start();
setInterval(function(){
  game.redraw();
}, 1);
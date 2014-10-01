define(["jam", "./proto", "./util"], function(jam, proto, util) {
  var p;

  var player = {};

  // Break out weaons when we get more.
  var sword = function(p){
	jam.Sprite.call(this, -8, -24);

    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    canvas.width = 128;
    canvas.height = 16;

    var o = function(h, t) {
      var o = Math.sin(t) * h;
      return Math.floor(o);
    };

    var a = function(h, t) {
      var a = Math.cos(t) * h;
      return Math.floor(a);
    };

    var c = proto.color(200, 180, 20);
    c = proto.color(255, 0, 0);

    ctx.strokeStyle = c;
    ctx.lineWidth = 2;

    // Frame 0, blank.
    // 0, 15

    // Frame 1.
    // 16, 31
    ctx.beginPath();
    ctx.moveTo(15, 15);
    ctx.lineTo(32, 15);
    ctx.stroke();

    // Frame 2.
    //32, 47
    ctx.beginPath();
    ctx.moveTo(a(16, Math.PI/8) + 32, 16- o(16, Math.PI/8));
    ctx.lineTo(32, 15);
    ctx.stroke();

    // Frame 3.
    // 48, 63
    ctx.beginPath();
    ctx.moveTo(a(16, Math.PI/4) + 48, 16-o(16, Math.PI/4));
    ctx.lineTo(48, 15);
    ctx.stroke();

    // Frame 4.
    // 64, 79
    ctx.beginPath();
    ctx.moveTo(a(16, Math.PI/8 * 3) + 64, 16- o(16, Math.PI/8 * 3));
    ctx.lineTo(64, 15);
    ctx.stroke();

    // Frame 5.
    // 80, 95
    ctx.beginPath();
    ctx.moveTo(81, 0);
    ctx.lineTo(81, 15);
    ctx.stroke();

    this.setImage(canvas.toDataURL(), 16, 16);
    this.idleAnim = new jam.Sprite.Animation([2], 0, 0, 0, function(){
    });
    this.blockAnim = new jam.Sprite.Animation([1], 0, 0, 0, function(){
    });
    // So we can access this in the animation callback.
    var s = this;
    this.swingAnim = new jam.Sprite.Animation([ 2, 3, 4, 5, 4, 3, 2], 12, 0, 0, function(){
      // Animations should have frame by frame callbacks.
      s.swinging = false;
    });

    this.p = p;
    this.swinging = false;

    this.on("update", function(dt) {
      if (this.swinging === true) {
        this.playAnimation(this.swingAnim);
      } else if (this.blocking === true) {
      } else {
        this.playAnimation(this.idleAnim);
      }
    });

  };

  sword.prototype = new jam.Sprite(0, 0);

  player.base = function(x, y) {
	jam.Sprite.call(this, x, y);

    // Make/set image.
    var i = new proto.rect(16, 16, 'rgb(200, 240, 40)');
    this.setImage(i.toDataURL(), 16, 16);

    this.sword = new sword(this);
    this.add(this.sword);
  };

  player.base.prototype = new jam.Sprite(0, 0);

  player.base.prototype.swipe = function() {

  };

  player.remote = function(x, y) {
	player.base.call(this, x, y);

    this.on("update", function(dt) {
      //console.log(this.sword);
    });
  };

  player.remote.prototype = new player.base(0, 0);

  player.p = p;

  player.local = function(x, y) {
	player.base.call(this, x, y);
    p = this;
    this.interactive = true;
    this.speed = 100;
    // Action!
    this.on("update", function(dt) {
	  this.velocity.x = 0;
	  this.velocity.y = 0;
      if (this.interactive === true){
	    if(jam.Input.down("UP")) {
		  this.velocity.y = -this.speed;
	    }
	    if (jam.Input.down("DOWN")) {
		  this.velocity.y = this.speed;
	    }
	    if (jam.Input.down("LEFT")) {
		  this.velocity.x = -this.speed;
	    }
	    if (jam.Input.down("RIGHT")) {
		  this.velocity.x = this.speed;
	    }
 	    if (jam.Input.justPressed("SPACE")) {
		  this.sword.swinging = true;
          cloak.message('swing');
	    }
      }
      // Eliminate redundant calls.
      cloak.message('move', {
        x: this.x,
        y: this.y
      });
    });
  };

  player.local.prototype = new player.base(0, 0);

  return player;
});

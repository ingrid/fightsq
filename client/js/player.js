define(["jam", "./proto", "./util"], function(jam, proto, util) {
  var p;

  var player = function(x, y) {
	jam.Sprite.call(this, x, y);

    // Make/set image.
    var i = new proto.rect(5, 5, 'rgb(200, 240, 40)');
    this.setImage(i.toDataURL(), 5, 5);

    this.interactive = false;

    // Action!
    this.on("update", function(dt) {
      // Some frame and direct update shit.
    });
  };

  player.prototype = new jam.Sprite(0, 0);

  player.prototype.p = p;

  player.prototype.local = function(x, y) {
	player.call(this, x, y);
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
	    if(jam.Input.down("DOWN")) {
		  this.velocity.y = this.speed;
	    }
	    if(jam.Input.down("LEFT")) {
		  this.velocity.x = -this.speed;
	    }
	    if(jam.Input.down("RIGHT")) {
		  this.velocity.x = this.speed;
	    }
      }
    });
  };

  player.prototype.local.prototype = new player(0, 0);

  return player;
});

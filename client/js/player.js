define(["jam", "./proto", "./util"], function(jam, proto, util) {
  var p;

  var player = function(x, y){
	jam.Sprite.call(this, x, y);

    p = this;

    this.speed = 100;
    this.interactive = true;

    this.drag = 250;

    // Action!
    this.on("update", function(dt) {
      this.acceleration.x = 0;
      this.acceleration.y = 0;
      if (this.interactive === true){
	    if(jam.Input.down("UP")) {
		  this.acceleration.y = -100;
	    }
	    if(jam.Input.down("DOWN")) {
		  this.acceleration.y = 100;
	    }
	    if(jam.Input.down("LEFT")) {
		  this.acceleration.x = -100;
	    }
	    if(jam.Input.down("RIGHT")) {
		  this.acceleration.x = 100;
	    }
      }
    });
  };

  player.prototype = new jam.Sprite(0, 0);

  player.prototype.p = p;

  return player;
});

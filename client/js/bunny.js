define(["jam", "./proto", "./util", "./level"], function(jam, proto, util, level) {

  // Possible bunny colors. Maybe tie this to size?
  var colors = [
    [176, 162, 197],
    [167, 201, 204],
    [197, 224, 224],
    [237, 248, 249],
    [255, 239, 239]
  ]

  var bunny = function(x, y){
	jam.Sprite.call(this, x, y);

    this.squish = new jam.Sprite.Animation([1], 0, 0, 0, function(){
    });
    this.hop = new jam.Sprite.Animation([0], 0, 0, 0, function(){
    });

    var l = 5 * 2;

    this.setImage("bunny.png", 17, 17);

    this._renderOffsetX = -8;
    this._renderOffsetY = -8;
    this._collisionOffsetX = -8;
    // TODO: What is this.
    this._collisionOffsetY = -8 + 15;
    this._collisionOffsetHeight = -16;
    this.size = 5;
    this.radius = 8;

    this.hopping = false;
    this.destination = {
      x: this.x,
      y: this.y
    }
    this.setImage("bunny.png", 17, 17);
    this.on("update", function(dt) {
      if (this.curAnim === 'hop'){
        this.playAnimation(this.hop);
        this.hopDt -= dt;
        if (this.hopDt <= 0){
          this.hopping = false;
          this.velocity.x = 0;
          this.velocity.y = 0;
          this.hopDt = 0.25 + (Math.random()/2);
        }
      } else {
        this.playAnimation(this.squish);
        this.hopDt -= dt;
        if (this.hopDt <= 0){
          // Stood still long enough. Hop!
          this.hopping = true;

          var ang = Math.floor(Math.random()*361);
          var vec = {
            x: Math.cos(ang),
            y: Math.sin(ang)
          }
          this.velocity = jam.Vector.mul(vec, 80)
          this.hopDt = 0.5 + (Math.random()/2);
        }
      }
    });
  };

  bunny.prototype = new jam.Sprite(0, 0);

  bunny.prototype.hop = function(x, y){

  };

  return bunny;
});

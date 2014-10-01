var cloak = require('cloak');

exports.conf = {
};

exports.bunny = function(room){
  // Determine inital position.
  this.x = 50;
  this.y = 50;
  this.hopDt = 0;
//  this.dest = {
//    x: 0;
//    y:0;
//  };

  this.hopping = false;
  this.hopDt = 0;
  this.velocity = {
    x: 0,
    y: 0
  };

  setInterval(function() {
    var dt = 0.5;
    if (this.hopping){
      this.hopDt -= dt;
      if (this.hopDt <= 0){
        this.hopping = false;
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.hopDt = 0.25 + (Math.random()/2);
      }
    } else {
      this.hopDt -= dt;
      if (this.hopDt <= 0){
        // Stood still long enough. Hop!
        this.hopping = true;

        var ang = Math.floor(Math.random()*361);
        var vec = {
          x: Math.cos(ang) * 80,
          y: Math.sin(ang) * 80
        }
        this.velocity = vec;
        this.hopDt = 0.5 + (Math.random()/2);
      }
    }
	this.x += this.velocity.x * dt;
	this.y += this.velocity.y * dt;
    cloak.message('updateMob', {
      id: this.id;
      x: this.x;
      y: this.y
    });
  }, 500);

  room.messageMembers('spawned', {
    id: 0
  });
}

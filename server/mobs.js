var cloak = require('cloak');

exports.conf = {
};

exports.bunny = function(room, x, y, id){
  // Determine inital position.
  this.x = x;
  this.y = y;
  this.hopDt = 0;
  this.id = id;

  this.hopping = false;
  this.hopDt = 0;
  this.velocity = {
    x: 0,
    y: 0
  };

  this.currAnim = 'squish';

  setInterval(function() {
    var dt = 0.5;
    if (this.hopping){
      this.hopDt -= dt;
      if (this.hopDt <= 0){
        this.currAnim = 'squish';
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
        this.currAnim = 'hop';
        var ang = Math.floor(Math.random()*361);
        this.velocity = {
          x: Math.cos(ang) * 80,
          y: Math.sin(ang) * 80
        }
        this.hopDt = 0.5 + (Math.random()/2);
      }
    }
	this.x += this.velocity.x * dt;
	this.y += this.velocity.y * dt;

    room.messageMembers('updateMob', {
      id: this.id,
      x: this.x,
      y:this.y,
      currAnim: this.currAnim
    });
  }.bind(this), 100);

  // room.messageMembers('spawned', {
  //   id: 0
  // });
};

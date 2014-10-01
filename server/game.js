var cloak = require('cloak');

var room = require('./room');
var mobs = require('./mobs');

exports.conf = {
  messages: {
    move: function(arg, user) {
      var room = user.getRoom();
      room.messageMembers('moved', {
        // Keep track of player positions.
        id: user.id,
        x: arg.x,
        y: arg.y
      });
    },
    swing: function(arg, user) {
      var room = user.getRoom();
      room.messageMembers('swung', {
        id: user.id,
      });
    }
  },
  room: {
    init: function() {
      this.data.tm = {};
      this.data.buns = {};
      this.data.mid = 0;
      this.spawnBunny = function(x, y) {
        var b = new mobs.bunny(this, x, y, this.data.mid);
        this.data.buns[this.data.mid] = b;
        this.data.mid++;
        this.messageMembers('spawned', {
          id: this.data.mid,
          x: x,
          y: y
        });
      }.bind(this);
      // this.spawnBunny(50, 50);
      var numBuns = 0;
      setInterval(function() {
        // Update mobs?
        if (numBuns <= 5) {
          console.log('Spawn!');
          this.spawnBunny(50, 50);
          numBuns++;
        }
      }.bind(this), 1000);
    },
    pulse: function(){
      // I should test this out.
      // It's fast.
    },
    newMember: function(user) {
    },
    close: function() {
    },
//    shouldAllowuser: function(){
//    }
  }
};

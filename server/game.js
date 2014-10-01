var cloak = require('cloak');

var room = require('./room');

exports.conf = {
  messages: {
    move: function(arg, user) {
      var room = user.getRoom();
      room.messageMembers('moved', {
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
  }
};

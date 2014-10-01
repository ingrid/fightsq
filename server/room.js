var cloak = require('cloak');

// Used to map urls to room ids.
var roomNameMap = Object.create(null);

exports.conf = {
  roomLife: 1000*60*60*3,
  minRoomMembers: 1,
  maxRoomMembers: 4,
  pruneEmptyRooms: 10,
  reconnectWait: 100,
  messages: {
    joinRoom: function(id, user) {
      var room = getRoomForUrl(id);
      var success = room.addMember(user);
      // Message others?
    },
    members: function(arg, user) {
      // Request info of all current members.
      var room = user.getRoom();
      var members = room.getMembers(true);
      for (var m in members) {
        // Strip out self?
      }
      user.message('members', members);
    }
  },
  room: {
    init: function() {
      this.data.tm = {};
      this.data.mobs = {};
      this.data.mid = 0;
      setInterval(function() {
        // Update mobs?
      }, 500);
    },
    pulse: function(){
      // I should test this out.
    },
    newMember: function(user) {
    },
    close: function() {
    },
//    shouldAllowuser: function(){
//    }
  }
};

var getRoomForUrl = function(url) {
  var roomName = url;
  var id = roomNameMap[roomName];
  var room = cloak.getRoom(id);
  if (!room) {
    room = cloak.createRoom(roomName);
    roomNameMap[roomName] = room.id;
  }

  return room;
};

exports.getRoomForUrl = getRoomForUrl;

exports.cleanUpRoomOnClose = function() {
  delete roomNameMap[this.name];
};

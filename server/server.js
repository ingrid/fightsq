var cloak = require('cloak');

var sendLobbyCount = function(arg) {
  this.messageMembers('userCount', this.getMembers().length);
};

cloak.configure({
  port: 8090,

  /**/
  roomLife: 1000*60*60*3,

  autoJoinLobby: true,
  minRoomMembers: 1,
  pruneEmptyRooms: 1000,
  reconnectWait: 3000,
  /**/

  messages: {
    createRoom: function(arg, user) {
      var room = cloak.createRoom(Math.floor(Math.random() * 1000));
      var success = room.addMember(user);
    },
    lobby: {
      newMember: sendLobbyCount,
      memberLeaves: sendLobbyCount
    }
  }
});

cloak.run();

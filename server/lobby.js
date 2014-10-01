var cloak = require('cloak');

exports.conf = {
  messages: {
    joinLobby: function(arg, user) {
      var sucess = cloak.getLobby().addMember(user);
      //user.message('joinedLobby', sucess);
    }
  }
};

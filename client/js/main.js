require.config({
  baseUrl:"jam/",
});

var DEBUG = false;

require(["jam", "../js/state", "../js/states/lobby"], function(jam, state, lobby){
  jam.config({dataDir:"data/"});

  var g = state.g;

  cloak.configure({
    messages: {
    },
    serverEvents: {
      begin: jam.addPreload(),
      joinedRoom: function(arg){
        if (arg.name === 'Lobby'){
          state(lobby);
        }
        else {
          // Whateverrr.
        }
      }
    }
  });

  cloak.run('http://localhost:8090');

  var init = function(){
    if(window.location.pathname !== '/'){
      cloak.message('joinRoom', window.location.pathname);
    } else {
      // If no room.
      cloak.message('joinLobby');
    }
  };


  var preload = function() {
    jam.preload("bunny.png");
	jam.showPreloader(init);
  };

  preload();

  /**/
  window.setTimeout(function(){
    window.console.log = function(){
    };
  }, 8000);
  /**/
});

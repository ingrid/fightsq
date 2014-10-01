require.config({
  baseUrl:"jam/",
});

var DEBUG = false;

require(["jam", "../js/state", "../js/states/lobby", "../js/states/mainstate"], function(jam, state, lobby, mainstate){
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
          // Pass room data?
          console.log('Joined ' + arg.name + '.');
          state(mainstate);
        }
      }
    }
  });

  cloak.run('http://ec2-107-20-18-248.compute-1.amazonaws.com:8090');

  var init = function(){
    console.log('Init! Done loading!');
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

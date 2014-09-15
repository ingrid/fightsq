require.config({
  baseUrl:"jam/",
});

var DEBUG = true;

require(["jam", "../js/state", "../js/states/lobby"], function(jam, state, lobby){
  jam.config({dataDir:"data/"});

  var g = state.g;

  cloak.configure({
    messages: {
    },
    serverEvents: {
      begin: jam.addPreload(),
      joinedRoom: function(arg){
        console.log('?');
        if (arg.name === 'Lobby'){
          state(lobby);
        }
        else {
          // Whateverrr
        }
      }
    }
  });

  cloak.run('http://localhost:8090');

  var init = function(){
    // What do I even do here any more...
    /** /
    if (DEBUG === true){
      state(mainstate);
    } else {
      state(titlestate);
    }
    /**/
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

define(["jam", "../proto", "../state", "../states/mainstate"], function(jam, proto, state, mainstate) {
  cloak.configure({
    messages: {
      lobbyInfo : function(arg) {
        console.log('whatever');

      }
    },
    serverEvents: {
      joinedRoom: function(arg){
        if (arg.name === 'Lobby'){
          console.log('Joined the Lobby twice?')
        } else {
          console.log('Joined ' + arg.name + '.');
          state(mainstate);
        }
      }
    }
  });

  var darkGreen = 'rgb(81, 157, 131)';
  var green = 'rgb(113,169,124)';
  var tan = 'rgb(207,185,128)';
  var cream = 'rgb(234, 228, 206)';
  var red = 'rgb(154, 14, 17)';

  // Pallet.
  var p = [darkGreen, green, tan, cream, red];

  var lobby = function(gamestate){
    var g = gamestate.g;
	var s = g.root.scene;

    g.bgColor = p[1];

    // Border
    s.add(proto.sprite(60, 20, {
      s: 'rect',
      w: 520,
      h: 440,
      c: p[2]
    }));

    // Players
    s.add(proto.sprite(70, 30, {
      s: 'rect',
      w: 245,
      h: 420,
      c: p[3]
    }));

    // Rooms
    s.add(proto.sprite(325, 30, {
      s: 'rect',
      w: 245,
      h: 420,
      c: p[3]
    }));

    var createBttn = new proto.button(331, 401, {
      s: 'rect',
      w: 233,
      h: 43,
      f: p[3],
      b: p[4],
      l: 1,
      t: p[0],
      txt: "Create a New Room",
      oX: 70,
      oY: 25,
      cb: function(e){
        console.log('clicked create room');
        cloak.message('createRoom');
      }
    });

    var randomBttn = new proto.button(76, 401, {
      s: 'rect',
      w: 233,
      h: 43,
      f: p[3],
      b: p[4],
      l: 1,
      t: p[0],
      txt: "Join a Random Room",
      oX: 70,
      oY: 25,
      cb: function(e){
        console.log('clicked on random room button');
      }
    });

    s.add(createBttn);
    s.add(randomBttn);

    g.run();
  }

  return lobby;
});

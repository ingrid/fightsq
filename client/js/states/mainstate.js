define(["jam", "../proto", "../state", "../level", "../player"], function(jam, proto, state, level, player) {
  var mainstate = function(gamestate){
    cloak.configure({
      messages: {
        members: function(arg) {
          // Lists info for all current players in the room.
          console.log('!!!!!!');
          console.log(arg);
        },
        moved: function(arg){
          // Updates the position of one or more players
        }
      }
    });

    cloak.message('members');
    var g = gamestate.g;
	var s = g.root.scene;

    // All OTHER players in the room.
    var players = {};

    var p = [
      'rgb(155,170,106)',
      'rgb(64,116,88)',
      'rgb(174,205,114)',
      'rgb(161,177,78)',
      'rgb(65,95,107)',
    ];

    g.bgColor = p[0];

    // Fix this shit.
    var p = new player.prototype.local(20, 200);
    s.add(p);

    // What does a player object look like objectwise?
    // Base: ID, color/sprite, postion, frame?
    // Universal: ID

    /** /
    var l = new level(g)
    s.add(l);
    /**/
    s.on("update", function(dt) {

    });


    //var l = new level(g, p);

    p.on("update", function(dt) {

    });

	g.run();
  };

  return mainstate;

});

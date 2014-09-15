define(["jam", "../proto", "../state", "../level", "../player"], function(jam, proto, state, level, player) {

  var mainstate = function(gamestate){
    var g = gamestate.g;
	var s = g.root.scene;

    var p = [
      'rgb(155,170,106)',
      'rgb(64,116,88)',
      'rgb(174,205,114)',
      'rgb(161,177,78)',
      'rgb(65,95,107)',
    ];

    g.bgColor = p[0];

    var p = new player(20, 200);
    s.add(p);

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

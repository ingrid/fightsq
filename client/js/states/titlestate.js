define(["jam", "../proto", "../state", "./mainstate"], function(jam, proto, state, mainstate) {
  // Maybe we can have a state object that had set up tear down and update functions?
  var titlestate = function(gamestate){
    var g = gamestate.g;
    var s = g.root.scene;

    g.bgColor = "rgb(167, 219, 216)";

    // var txtBx = new jam.Sprite(260, 220);
    // var txBW = 112;
    // var txBH = 15;
    var txtBx = new jam.Sprite(265, 219);
    var txBW = 110;
    var txBH = 15;
    var txtBxImg = new proto.rect(txBW, txBH, 224, 228, 204);
    txtBx.setImage(txtBxImg.toDataURL(), txBW, txBH);
    s.add(txtBx);

    var startTxt = new proto.text(270, 230, "Press Any Key to Start");
    startTxt.font = "monospace";
    startTxt.color = "rgb(138, 85, 158)";

    /////
    // Controls.
    var ctrlTxt = new proto.text(284, 262, "↑↓←→ to move");
    ctrlTxt.font = "monospace";
    ctrlTxt.color = "rgb(138, 85, 158)";

    var ctrlTxt2 = new proto.text(283, 280, "Z and X to attack");
    ctrlTxt2.font = "monospace";
    ctrlTxt2.color = "rgb(138, 85, 158)";

    s.add(ctrlTxt);
    s.add(ctrlTxt2);
    /////

    var started = false;

    // TODO: Add arrows, add flashing.
    s.add(startTxt);
    // TODO: Maybe add bunnies hopping, and fade out.
    var t = 0.0;
    s.on("update", function(dt) {
      t += dt;
      startTxt.alpha = (Math.abs(Math.sin(t)) * 0.6) + 0.4;
      txtBx.alpha = startTxt.alpha;

      if (started === false){
        // TODO: Make input take an array of key strings so we can avoid this.
	    if (Object.keys(jam.Input._justPressed).length !== 0) {
          // Start game.
          started = true;
          var cb = function(){
            // TODO: Maybe make all fade cbs states and pass in state.
            var cb = function(){
              // Some flag to set interaction
            }
            state(mainstate);
            proto.fade(s, "IN", cb);
          }
          proto.fade(s, "OUT", cb);
        }
      }
    });

    // move run to state function?
    g.run();
  }

  return titlestate;
});

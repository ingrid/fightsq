define(["jam", "../proto", "../state", "../level", "../player", "../bunny"], function(jam, proto, state, level, player, bunny) {
  var mainstate = function(gamestate){
    cloak.configure({
      messages: {
        members: function(members) {
          // Lists info for all current members in the room.
          for (var p in members) {

            var id = members[p].id;
            if (id !== cloak.currentUser()) {
              if (players[id] == undefined) {
                players[id] = {
                  name: members[p].name,
                  position: null,
                  frame: null,
                  animation: null,
                  obj: new player.remote(10, 10)
                };
                s.add(players[id].obj);
              }
            }
          }
        },

        // Pertains to other player's actions.
        moved: function(player) {
          if (player.id !== cloak.currentUser()) {
            var local_player = players[player.id];
            if (local_player !== undefined) {
              local_player.obj.x = player.x;
              local_player.obj.y = player.y;
            } else {
              // Panic.
            }
          }
        },
        swung: function(player) {
          var local_player = players[player.id];
          if (player.id !== cloak.currentUser()) {
            if (local_player !== undefined) {
              var local_player = players[player.id];
              local_player.obj.sword.swinging = true;
            } else {
              // Panic.
              console.log("Unknown player swung.");
            }
          }
        },

        // Mob stuff.
        spawned: function(mob) {
          // Assuming a bunny for now, in future take the type explicitly.
          var b = new bunny(mob.x, mob.y);
          bunnies[mob.id] = b;
          s.add(b);
        },
        updateMob: function(mob) {
          console.log('Update: ' + mob.id);
          // Bunnies for now.
          //var m = mobs[mob.id];
          var m = bunnies[mob.id];
          // Lodash update?
          if (m !== undefined) {
            m.x = mob.x;
            m.y = mob.y;
            m.currAnim = mob.currAnim;
          } else {
            // Panic.
          }
        }
      },
      serverEvents: {
        roomMemberJoined: function(user) {
          var id = user.id;
          if (id !== cloak.currentUser()) {
            if (players[id] == undefined) {
              players[id] = {
                name: user.name,
                position: null,
                frame: null,
                animation: null,
                obj: new player.remote(10, 10)
              };
              s.add(players[id].obj);
            }
          }
        },
        roomMemberLeft: function(user) {
          var id = user.id;
          if (players[id] !== undefined) {
            s.remove(players[id].obj);
            players[id] = undefined;
          }
        }
      }
    });

    cloak.message('members');
    var g = gamestate.g;
	var s = g.root.scene;

    // All OTHER players in the room.
    var players = {};

    var bunnies = {};

    var p = [
      'rgb(155,170,106)',
      'rgb(64,116,88)',
      'rgb(174,205,114)',
      'rgb(161,177,78)',
      'rgb(65,95,107)',
    ];

    g.bgColor = p[0];

    // Fix this shit.
    var p = new player.local(20, 200);
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


    //s.add(new bunny(50, 50));

	g.run();
  };

  return mainstate;

});

var _ = require('lodash');
var cloak = require('cloak');
var express = require('express');
var path = require('path');

var room = require('./room');
var lobby = require('./lobby');
//var game = require('./game');
//var nameGen = require('./util/name_generator');

var app = express();
app.use(express.static('./../client'));
app.get('*', function (req, res) {
  res.sendfile(path.normalize(__dirname + './../client/index.html'));
});

app.listen(8081);

var conf = {
  port: 8090,
  autoJoinLobby: false,
  reconnectWait: 3000
};

// Merge together the various configs.
var confs = [room, lobby];
for (c in confs){
  _.merge(conf, confs[c].conf);
}

cloak.configure(conf);

cloak.run();

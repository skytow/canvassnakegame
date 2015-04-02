"use strict";
var game = require('./game');
var canvas = require('./canvas');
var screen = require('./screen');
var events = require('./events');

events.addListeners();
canvas.scale(screen);
game.loadGame();

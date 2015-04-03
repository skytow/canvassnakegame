var _ = require('underscore');
var snake = require('./snake');
var game = require('./game');
var canvas = require('./canvas');
var screen = require('./screen');

var direction = {
    'up': 'down',
    'down': 'up',
    'left': 'right',
    'right': 'left'

};

var keys = {
    up: [87, 75, 38],
    down: [74, 40, 83],
    left: [65, 72, 37],
    right: [76, 68, 39]
};

_.extend(keys, {
    getKey: function (ko) {
        for (var kvalue in this) {
            if (this[kvalue] instanceof Array && this[kvalue].indexOf(ko) >= 0) {
                return kvalue;
            }
        }
        return null;
    }
});
exports.addListeners = function () {
    addEventListener("keydown", function (e) {
        var key = keys.getKey(e.keyCode);
        if (['left', 'right', 'up', 'down'].indexOf(key) >= 0 && key !== direction[snake.snake.direction]) {
            snake.snake.direction = key;
        }
        //space bar
        if (e.keyCode === 32) {
            game.togglePause();
        }
    }, false);

    screen.canvas.addEventListener('click', function () {
        game.reset(screen);
    });

    screen.small.addEventListener('click', function () {
        screen.changeBoardSize('small');
        canvas.scale(screen);
        game.loadGame();
    });
    screen.medium.addEventListener('click', function () {
        screen.changeBoardSize('medium');
        canvas.scale(screen);
        game.loadGame();
    });
    screen.large.addEventListener('click', function () {
        screen.changeBoardSize('large');
        canvas.scale(screen);
        game.loadGame();
    });

    screen.beginner.addEventListener('click', function () {
        game.settings.difficulty = 1;
        game.setDifficultyLevel();
        game.loadGame();
    });
    screen.novice.addEventListener('click', function () {
        game.settings.difficulty = 2;
        game.setDifficultyLevel();
        game.loadGame();
    });
    screen.advanced.addEventListener('click', function () {
        game.settings.difficulty = 5;
        game.setDifficultyLevel();
        game.loadGame();
    });
};
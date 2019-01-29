+(function (factory) {
  if (typeof exports === 'undefined') {
    factory(window);
  } else {
    module.exports = factory;
  }
}(function (scope) {
  'use strict';

  function searchBoard(options) {
    var keys = Object.keys(options),
      candidate,
      matched;

    scope.boards.some(function (b) {
      matched = !keys.some(function (k) {
        return options[k] !== b._options[k];
      });
      if (matched) {
        candidate = b;
      }
      return matched;
    });

    return candidate;
  }

  scope.getPin = function (board, pinNum) {
    if (board.transport) {
      board = searchBoard(board);
    }
    return board ? board.getPin(pinNum) : undef;
  };

}));
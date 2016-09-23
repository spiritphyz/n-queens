/**           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({'n': n});
  var solution = board.rows();

  var count = 0;

  for (var i = 0; i < n; i++) {
    solution[i][count] = 1;
    count += 1;    
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  var searchRows = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (board.hasAnyRooksConflicts() === false) {
        searchRows(row + 1);
      }
      board.togglePiece(row, i);
    }
  };

  searchRows(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = board.rows();

  var searchRows = function(row) {
    // debugger;
    if (row === n) {
      solution = board.rows().map(function(val) {
        return val.slice();
      });
      console.log('solution is:', solution);
      return solution;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (board.hasAnyQueensConflicts() === false) {
        searchRows(row + 1);
      }
      board.togglePiece(row, i);
    }
  };

  searchRows(0);


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  var searchRows = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (board.hasAnyQueensConflicts() === false) {
        searchRows(row + 1);
      }
      board.togglePiece(row, i);
    }
  };

  searchRows(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

/* possible algorithm

make solutions array
make multiple possibilities array:
  1-possible
  2-possible
  3-posssible
  n-possible

start with 1, go up to n
  - put 1 piece into the helper array
    - have helper array build up "1-possible" array
  - loop through '1-possible' array
    - put each board into the helper and put piece 2 as input
  - when last array is reached (n-possible), count up the inner arrays and return final solution count

helper function:
  input: starting board, # starting pieces on board, piece to test
  output: possible board or no board
  
  uses starting board:
    takes the test piece and moves it through all open slots
      start searching after the slot of the last-placed piece
        if next slot is last slot (> n - 1), then return from loop
      is there conflict in open slot?
        move to next open slot
      if no conflict:
        toggle the piece on the board and add to board
        return board as possibility to array: '#startPiece' + '-possible'
    after all open slots are exhausted, return 'no possibilites'
*/
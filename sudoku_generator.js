const SIZE = 9;
const SUBGRID_SIZE = 3;

function isValid(board, row, col, num) {
  // check row
  if (board[row].includes(num)) return false;
  // check column
  for (let r = 0; r < SIZE; r++) {
    if (board[r][col] === num) return false;
  }
  // check subgrid
  const startRow = row - (row % SUBGRID_SIZE);
  const startCol = col - (col % SUBGRID_SIZE);
  for (let r = startRow; r < startRow + SUBGRID_SIZE; r++) {
    for (let c = startCol; c < startCol + SUBGRID_SIZE; c++) {
      if (board[r][c] === num) return false;
    }
  }
  return true;
}

function findEmpty(board) {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) return [r, c];
    }
  }
  return null;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function solve(board) {
  const empty = findEmpty(board);
  if (!empty) return true;
  const [row, col] = empty;
  const nums = shuffle([...Array(SIZE).keys()].map(i => i + 1));
  for (const num of nums) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num;
      if (solve(board)) return true;
      board[row][col] = 0;
    }
  }
  return false;
}

function generateFullBoard() {
  const board = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  solve(board);
  return board;
}

function removeNumbers(board, holes = 40) {
  const puzzle = board.map(row => row.slice());
  const positions = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      positions.push([r, c]);
    }
  }
  shuffle(positions);
  for (let i = 0; i < Math.min(holes, SIZE * SIZE); i++) {
    const [r, c] = positions[i];
    puzzle[r][c] = 0;
  }
  return puzzle;
}

function printBoard(board) {
  for (let r = 0; r < SIZE; r++) {
    console.log(board[r].map(num => (num === 0 ? '.' : num)).join(' '));
  }
}

function generateSudoku(holes = 40) {
  const fullBoard = generateFullBoard();
  return removeNumbers(fullBoard, holes);
}

if (require.main === module) {
  const puzzle = generateSudoku();
  printBoard(puzzle);
}

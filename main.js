//canvas create & settings
const canvas = document.querySelector('canvas');
const canvas2 = [...document.querySelectorAll('canvas')][1];
const ctx = canvas.getContext('2d');
const ctx2 = canvas2.getContext('2d');
canvas.width = '600';
canvas.height = '900';
canvas2.width = '200';
canvas2.height = '220';
ctx2.scale(50, 50);
ctx.scale(75, 75);
let play = true;

//button
const stopButton = document.querySelector('.main button');
stopButton.addEventListener('click', () => {
  play = !play;
  if (play) {
    stopButton.textContent = 'stop';
  } else {
    stopButton.textContent = 'start';
  }
});

//shapes block
const shapes = [
  [
    [1, 1],
    [1, 1],
  ],

  [[1, 1, 1, 1]],
  [
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [1, 0],
    [1, 1],
    [0, 1],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [1, 1],
    [1, 0],
    [1, 0],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1],
    [1, 1],
    [1, 0],
  ],
  [
    [0, 0, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 0],
  ],
];

//main board
let board = [[], []];

//colors
let boardColor = [[], []];
const colors = ['yellow', 'cyan', 'orange', 'green', 'blue', 'red', 'purple'];

//create Board
class GenerateBoard {
  constructor(height, width) {
    this.width = width;
    this.height = height;
  }
  createBoard(array) {
    this.array = array;
    for (let i = 0; i < this.height; i++) {
      this.array[i] = [];
      for (let j = 0; j < this.width; j++) {
        this.array[i][j] = 0;
      }
    }
  }
}
const createBoard = new GenerateBoard(12, 8);
createBoard.createBoard(board);
createBoard.createBoard(boardColor);

//variables
let score = 0;
let y = -1;
let x = 3;
let lastY = 4;
let blockElement = 11;
let canSet = false;
let clickRotate = 0;
let maxY = false;
let lastX = 0;
let next = 0;
let shape = 0;
let random = 0;
let random1 = 0;
let shape1 = 0;
let rotate = 0;

//Functions
const RandomBlock = function (array) {
  this.array = array;
  let random = 0;
  random = Math.floor(Math.random() * this.array.length);

  random = random % 2 != 0 ? random : random + 1;
  if (random > this.array.length - 1) random -= 2;
  return random;
};

const generateLastX = function (array, can) {
  let arrayX = [];
  this.array = array;
  for (let i = 0; i < this.array.length; i++) {
    if (this.array[i].includes(1)) {
      if (can) arrayX.push(board[i].lastIndexOf(1));
      else arrayX.push(board[i].indexOf(1));
    }
  }
  return arrayX.sort();
};

const generateLastY = function (array) {
  this.array = array;
  for (let i = 0; i < this.array.length; i++) {
    if (this.array[i].includes(1)) lastY = i + 1;

    if (this.array[i].includes(2) && x != 0 && y != 0) blockElement = i;
  }
};

const setBlock = function () {
  shape.forEach((element, index) => {
    element.forEach((element2, index2) => {
      if (element[index2] == 1) board[index + y][x + index2] = 2;
      canSet = false;
    });
  });
  x = 3;
  y = -1;
  lastY = 0;
  random = random1;
  shape = shape1;

  generate.nextBlock();
};
const blockX = function (character) {
  this.character = character;
  let can = true;

  shape.forEach((element, index) => {
    element.forEach((element2, index2) => {
      if (board[index + y][x + index2] != 0) {
        if (this.character == 'plus') {
          if (board[index + y][x + 1 + index2] == 2) {
            can = false;
          }
        } else if (this.character == 'minus') {
          if (board[index + y][x - 1 + index2] == 2) can = false;
        } else if (this.character == 'rotate') {
          if (board[index + y][x + index2] == 2 || lastX == board[0].length)
            can = false;
        }
      }
    });
  });

  return can;
};

class RenderBlock {
  constructor(board) {
    this.board = board;
  }
  render(shape, x, y) {
    this.shape = shape;
    this.y = y;
    this.x = x;
    if (y > -1) {
      this.shape = this.shape.forEach((element, index) => {
        element.forEach((element2, index2) => {
          if (element[index2] == 1) {
            this.board[index + this.y][this.x + index2] = 1;
          }
        });
      });

      for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j < this.board[0].length; j++) {
          if (this.board[i][j] != 2) {
            ctx.clearRect(j, i, 1, 1);
            boardColor[i][j] = '';
          }
        }
      }
      for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j < this.board[0].length; j++) {
          if (this.board[i][j] == 2) {
            ctx.fillStyle = boardColor[i][j];
            ctx.fillRect(j, i, 1, 1);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(j + 0.5, i, 0, 0.02);
            ctx.strokeRect(j, i + 0.5, 0.02, 0);
            ctx.strokeRect(j + 0.5, i + 1, 0, 0.02);
            ctx.strokeRect(j + 1, i + 0.5, 0.02, 0);
          }
        }
      }
      for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j < this.board[0].length; j++) {
          if (this.board[i][j] == 1) {
            boardColor[i][j] = colors[Math.floor(random / 2)];
            ctx.fillStyle = boardColor[i][j];
            ctx.fillRect(j, i, 1, 1);
            ctx.strokeRect(j + 0.5, i, 0, 0.02);
            ctx.strokeRect(j, i + 0.5, 0.02, 0);
            ctx.strokeRect(j + 0.5, i + 1, 0, 0.02);
            ctx.strokeRect(j + 1, i + 0.5, 0.02, 0);
          }
        }
      }
      for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j < this.board[0].length; j++) {
          if (this.board[i][j] == 1) {
            if (this.board[i + (i < 11 ? 1 : 0)][j] == 2) {
              canSet = true;
            }
          }
        }
      }
    }
  }
  reset() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++) {
        if (this.board[i][j] == 1) {
          this.board[i][j] = 0;
        }
      }
    }
  }

  nextBlock() {
    random1 = RandomBlock(shapes);
    shape1 = shapes[random1];

    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 12; j++) {
        ctx2.clearRect(j, i, 1, 1);
      }
    }
    for (let i = 0; i < shape1.length; i++) {
      for (let j = 0; j < shape1[0].length; j++) {
        ctx2.fillStyle = colors[Math.floor(random1 / 2)];
        ctx2.strokeStyle = 'black';

        if (shape1[i][j] != 0) {
          ctx2.fillRect(j, i, 1, 1);
          ctx2.strokeRect(j + 0.5, i, 0, 0.02);
          ctx2.strokeRect(j, i + 0.5, 0.02, 0);
          ctx2.strokeRect(j + 0.5, i + 1, 0, 0.02);
          ctx2.strokeRect(j + 1, i + 0.5, 0.02, 0);
        }
      }
    }
  }
}
const endGame = () => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      board[i][j] = 0;
      boardColor[i][j] = '';
    }
  }
  score = 0;
  x = 3;
  y = 0;
};
const generate = new RenderBlock(board);
generate.nextBlock();

random = RandomBlock(shapes);
shape = shapes[random];

window.addEventListener('keydown', (e) => {
  if (play) {
    if (x == NaN || x == undefined) {
      x = 3;
      y = -1;
    }
    if (board[0].includes(2)) {
      endGame();
    }

    DeleteRow();

    if (canSet) setBlock();

    if (e.keyCode == '40') {
      generateLastY(board);
      if (lastY == board.length) setBlock();
      else y++;
    } else if (e.keyCode == '39') {
      lastX = generateLastX(board, true).reverse()[0] + 1;
      lastX < board[0].length && blockX('plus') ? x++ : generateLastX(board)[0];
    } else if (e.keyCode == '37') {
      lastX = generateLastX(board, false)[0];
      if (shapes[2] != shape) {
        lastX > 0 && blockX('minus')
          ? x--
          : (x = generateLastX(board, false)[0]);
      } else {
        lastX > 0 && blockX('minus')
          ? x--
          : (x = generateLastX(board, false)[0] - 3);
      }
    } else if (e.keyCode == '38') {
      if (blockX('rotate')) {
        clickRotate < 3 ? ++clickRotate : (clickRotate = 0);

        if (clickRotate == 0) {
          shape = shapes[random];
        }
        if (clickRotate == 1) {
          shape = shapes[random + 1];
        }
        if (clickRotate == 2) {
          shape = shapes[random];
          shape = rotateArray(shape);
        }
        if (clickRotate == 3) {
          shape = shapes[random + 1];
          shape = rotateArray(shape);
        }
        if (clickRotate == 2 && x < 0) {
          x = 0;
        }
      }
    }
  }
  generate.reset();
  generate.render(shape, x, y);
});

setInterval(() => {
  if (x == NaN || x == undefined) {
    x = 3;
    y = -1;
  }
  if (board[0].includes(2)) {
    endGame();
  }

  DeleteRow();
  if (play) {
    if (canSet) setBlock();
    generateLastY(board);
    if (lastY == board.length) setBlock();
    else y++;
    generate.reset();
    generate.render(shape, x, y);
  }
}, 1500);

const rotateArray = function (array) {
  this.array = array;

  if (random + 1 != 2) {
    rotate = [[], [], []];
  } else {
    rotate = [[], [], [], []];
  }

  for (let i = 0; i < this.array.length; i++) {
    for (let j = 0; j < this.array.length; j++) {
      rotate[i].push(0);
    }
  }

  for (let i = 0; i < this.array.length; i++) {
    for (let j = 0; j < this.array[0].length; j++) {
      rotate[i][j] = this.array[i][this.array[0].length - 1 - j];
    }
  }

  return rotate.reverse();
};

const DeleteRow = function () {
  let rowArray = [];
  let column = 0;

  for (let i = 0; i < board.length; i++) {
    column = 0;
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] == 2) {
        column++;
      }
      if (column == board[0].length) {
        rowArray.push(i);
      }
    }
  }

  for (let i = 0; i < rowArray.length; i++) {
    score += (i + 1) * 100;
    for (let j = 0; j < board[0].length; j++) {
      board[rowArray[i]][j] = 0;
      boardColor[rowArray[i]][j] = '';
    }
  }

  for (let g = 0; g < 4; g++) {
    if (rowArray.length > 0) {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
          for (let k = 0; k < rowArray.length; k++) {
            if (i < rowArray[k] && board[i][j] == 2 && board[i + 1][j] == 0) {
              board[i < board.length ? i + 1 : (i = i)][j] = board[i][j];
              boardColor[i < board.length ? i + 1 : (i = i)][j] =
                boardColor[i][j];
              board[i][j] = 0;
              boardColor[i][j] = '';
            }
          }
        }
      }
    }
  }
  document.querySelector('.main p span').textContent = score;
};

const loginButton = document.querySelector('.login_button');
const divGame = document.querySelector('.game');
const register = document.querySelector('.register');
const signIn = document.querySelector('.signin');
const spanRegister = document.querySelector('.register p span');
const login = document.querySelector('.login');
const infoRegister = document.querySelector('.register p');
const showLoginPanel = () => {
  divGame.style.display = 'none';
  register.style.display = 'flex';
  play = false;
};

loginButton.addEventListener('click', showLoginPanel);
spanRegister.addEventListener('click', () => {
  infoRegister.style.display = 'none';
  login.style.display = 'none';
  signIn.style.display = 'flex';
});

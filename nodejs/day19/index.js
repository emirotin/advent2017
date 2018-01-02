const { readFileNoTrim } = require("../lib");

const grid = readFileNoTrim("./input")
  .split("\n")
  .slice(0, -1)
  .map(l => l.split(""));

const rows = grid.length;
const cols = grid[0].length;

let res = "";
let steps = 0;

let dx = 1;
let dy = 0;
let x = 0;
let y = 0;

// find the start
for (y = 0; y < cols; y++) {
  if (grid[0][y] !== " ") {
    break;
  }
}

while (true) {
  x += dx;
  y += dy;
  steps++;
  const c = grid[x][y];
  if (c === " ") {
    break;
  } else if (c.match(/[A-Z]/i)) {
    res += c;
    continue;
  } else if (c === "+") {
    if (dy === 0) {
      dx = 0;
      if (grid[x][y - 1] !== " ") {
        dy = -1;
      } else {
        dy = 1;
      }
    } else {
      dy = 0;
      if (grid[x - 1][y] !== " ") {
        dx = -1;
      } else {
        dx = 1;
      }
    }
  }
}

console.log(res);
console.log(steps);

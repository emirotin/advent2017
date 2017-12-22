const { readLines } = require("../lib");

const parse = l => l.split("");

const grid = readLines("./input").map(parse);

let h = grid.length;
let w = grid[0].length;
let x = Math.floor((w + 1) / 2) - 1;
let y = Math.floor((h + 1) / 2) - 1;
let dir = "n";

const buildEmptyRow = () => Array.from({ length: w }, () => ".");

const expandGrid = dir => {
  switch (dir) {
    case "n":
      grid.unshift(buildEmptyRow());
      y++;
      h++;
      break;
    case "s":
      grid.push(buildEmptyRow());
      h++;
      break;
    case "w":
      grid.forEach(r => r.unshift("."));
      x++;
      w++;
      break;
    case "e":
      grid.forEach(r => r.push("."));
      w++;
      break;
  }
};

const nextDirRight = dir => {
  switch (dir) {
    case "n":
      return "e";
    case "e":
      return "s";
    case "s":
      return "w";
    case "w":
      return "n";
  }
};

const nextDirLeft = dir => {
  switch (dir) {
    case "n":
      return "w";
    case "w":
      return "s";
    case "s":
      return "e";
    case "e":
      return "n";
  }
};

const nextDir = (state, dir) => {
  switch (state) {
    case ".":
      return nextDirLeft(dir);
    case "W":
      return dir;
    case "#":
      return nextDirRight(dir);
    case "F":
      return nextDirLeft(nextDirLeft(dir));
  }
};

const nextState = state => {
  switch (state) {
    case ".":
      return "W";
    case "W":
      return "#";
    case "#":
      return "F";
    case "F":
      return ".";
  }
};

const printGrid = () => {
  console.log(grid.map(r => r.join("")).join("\n"));
};

const ITER = 10000000;
let infects = 0;

for (let i = 0; i < ITER; i++) {
  dir = nextDir(grid[y][x], dir);
  grid[y][x] = nextState(grid[y][x]);
  if (grid[y][x] === "#") {
    infects++;
  }

  switch (dir) {
    case "n":
      if (y === 0) {
        expandGrid(dir);
      }
      y--;
      break;
    case "s":
      if (y === h - 1) {
        expandGrid(dir);
      }
      y++;
      break;
    case "w":
      if (x === 0) {
        expandGrid(dir);
      }
      x--;
      break;
    case "e":
      if (x === w - 1) {
        expandGrid(dir);
      }
      x++;
      break;
  }
}

console.log(infects);

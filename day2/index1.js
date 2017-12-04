const fs = require("fs");

const matrixStr = fs.readFileSync("./input", "utf-8").trim();

const matrix = matrixStr
  .split("\n")
  .map(str => str.split("\t").map(n => parseInt(n, 10)));

const sum = a => a.reduce((x, y) => x + y, 0);

const cs = sum(matrix.map(r => Math.max(...r) - Math.min(...r)));

console.log(cs);

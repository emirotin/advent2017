const fs = require("fs");

const matrixStr = fs.readFileSync("./input", "utf-8").trim();

const matrix = matrixStr
  .split("\n")
  .map(str => str.split("\t").map(n => parseInt(n, 10)));

const sum = a => a.reduce((x, y) => x + y, 0);

const isInt = n => n === ~~n;

const findDiv = r => {
  r = r.slice().sort((x, y) => x - y);
  const l = r.length;
  for (let i = 0; i < l - 1; i++) {
    const x = r[i];
    for (let j = i + 1; j < l; j++) {
      const y = r[j];
      const d = y / x;
      if (isInt(d)) {
        return d;
      }
    }
  }
};

const cs = sum(matrix.map(findDiv));

console.log(cs);

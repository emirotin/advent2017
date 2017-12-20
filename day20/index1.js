const { readLines, parseInt } = require("../lib");

const sum = a => a.reduce((x, y) => x + y, 0);

const parse = s => {
  const m = s.match(/^p=<(.*?)>, v=<(.*?)>, a=<(.*?)>$/);

  return [m[3], m[2], m[1]].map(c => sum(c.split(",").map(parseInt)));
};

const lines = readLines("./input")
  .map(parse)
  .map(([a, v, p]) => [a / 2, v + a / 2, p].map(Math.abs))
  .map((el, i) => [...el, i]);

const cmpA = (x, y) => {
  if (x.length !== y.length) {
    return x.length - y.length;
  }
  for (let i = 0; i < x.length; i++) {
    if (x[i] !== y[i]) {
      return x[i] - y[i];
    }
  }
  return 0;
};

lines.sort(cmpA);

console.log(lines.slice(0, 15));

console.log(lines[0][3]);

const { readLines, parseInt, sum, log } = require("../lib");

const parse = s => {
  const m = s.match(/^p=<(.*)>, v=<(.*)>, a=<(.*)>$/);
  if (!m) {
    throw new Error("WTF");
  }
  const [a, v, p] = [m[3], m[2], m[1]].map(c =>
    sum(
      c
        .split(",")
        .map(parseInt)
        .map(Math.abs)
    )
  );
  return [a / 2, v + a / 2, p];
};

const lines = readLines("./input")
  .map(parse)
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

console.log(lines[0][3]);

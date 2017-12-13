const { readLines, parseInt } = require("../lib");

const parse = line => line.split(/\s*:\s*/).map(parseInt);

let maxLayer = 0;

const data = readLines("./input")
  .map(parse)
  .reduce((acc, [l, d]) => {
    acc[l] = d;
    maxLayer = l;
    return acc;
  }, []);

const getPos = (d, t) => {
  const m = 2 * d - 2;
  const i = t % m;
  if (i >= d) {
    return m - i;
  }
  return i;
};

let s = 0;

for (let i = 0; i <= maxLayer; i++) {
  if (data[i] == null) {
    continue;
  }
  if (getPos(data[i], i) === 0) {
    s += i * data[i];
  }
}

console.log(s);

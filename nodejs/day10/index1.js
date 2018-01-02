const { readFile, parseInt } = require("../lib");

const a = Array.from({ length: 256 }, (_, i) => i);
const L = a.length;

const ls = readFile("./input")
  .split(",")
  .map(parseInt);

let i = 0;
let skip = 0;

const read = l => {
  let max = i + l;
  const r = a.slice(i, max);
  if (max < L) {
    return r;
  }
  max -= L;
  return r.concat(a.slice(0, max));
};

const write = b => {
  let k = i;
  for (const el of b) {
    a[k] = el;
    k++;
    if (k >= L) {
      k -= L;
    }
  }
};

const revert = l => {
  write(read(l).reverse());
};

for (const l of ls) {
  revert(l);
  i = (i + l + skip) % L;
  skip++;
}

console.log(a[0] * a[1]);

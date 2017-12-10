const { readFile, parseInt } = require("../lib");

const a = Array.from({ length: 256 }, (_, i) => i);
const L = a.length;

const SUFFIX = [17, 31, 73, 47, 23];

const ls = readFile("./input")
  .split("")
  .map(c => c.charCodeAt(0))
  .concat(SUFFIX);

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

const runRound = () => {
  for (const l of ls) {
    revert(l);
    i = (i + l + skip) % L;
    skip++;
  }
};

for (let j = 0; j < 64; j++) {
  runRound();
}

const sparseHash = a.slice();

const xor = a => a.reduce((x, y) => x ^ y, 0);

const denseHash = new Array(16);
for (let j = 0; j < 16; j++) {
  denseHash[j] = xor(a.slice(j * 16, (j + 1) * 16));
}

const toHex = n => {
  const h = n.toString(16);
  if (h.length < 2) {
    return "0" + h;
  }
  return h;
};

console.log(denseHash.map(toHex).join(""));

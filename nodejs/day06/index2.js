const { readLines, parseInt } = require("../lib");

const data = readLines("./input")[0]
  .split("\t")
  .map(parseInt);

const getMaxIndex = () => {
  const max = Math.max(...data);
  return Math.min(
    ...data.map((el, i) => (el === max ? i : null)).filter(el => el != null)
  );
};

const l = data.length;

const next = i => (i + 1) % l;

const redistribute = () => {
  let i = getMaxIndex(),
    b = data[i];

  data[i] = 0;
  while (b--) {
    i = next(i);
    data[i]++;
  }
};

const key = () => data.join("-");

const count = () => {
  const hash = {};
  let iter = 0;

  hash[key()] = 0;
  while (true) {
    redistribute();
    iter++;
    const k = key();
    if (k in hash) {
      return iter - hash[k];
    }
    hash[k] = iter;
  }
};

console.log(count());

const { readLines, parseInt } = require("../lib");

const data = readLines("./input")[0]
  .split("\t")
  .map(parseInt);

const l = data.length;

const hash = {};
const key = () => data.join("-");

const getMaxIndex = () => {
  const max = Math.max(...data);
  return Math.min(
    ...data.map((el, i) => (el === max ? i : null)).filter(el => el != null)
  );
};

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

let iter = 0;

hash[key()] = true;

while (true) {
  redistribute();
  iter++;
  const k = key();
  if (hash[k]) {
    break;
  }
  hash[k] = true;
}

console.log(iter);

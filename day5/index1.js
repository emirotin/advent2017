const { readLines, parseInt } = require("../lib");

const jumps = readLines("./input").map(parseInt);

const l = jumps.length;
let count = 0;
let i = 0;

while (i >= 0 && i < l) {
  const jump = jumps[i];
  jumps[i]++;
  i += jump;
  count++;
}

console.log(count);

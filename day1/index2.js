const fs = require("fs");

const input = fs
  .readFileSync("./input", "utf-8")
  .trim()
  .split("")
  .map(d => parseInt(d, 10));

const l = input.length;

const next = i => (i + l / 2) % l;

let sum = 0;
for (let i = 0; i < l; i++) {
  if (input[i] === input[next(i)]) {
    sum += input[i];
  }
}

console.log(sum);

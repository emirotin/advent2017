const fs = require("fs");

const input = fs
  .readFileSync("./input", "utf-8")
  .trim()
  .split("")
  .map(d => parseInt(d, 10));

const l = input.length;
input.push(input[0]);

let sum = 0;
for (let i = 0; i < l; i++) {
  if (input[i] === input[i + 1]) {
    sum += input[i];
  }
}

console.log(sum);

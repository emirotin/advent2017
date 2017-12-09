const { readFile } = require("../lib");

const input = readFile("./input");

const clearGarbage = input => {
  const res = [];
  let start = 0;
  let i = 0;
  const l = input.length;
  let inGarbage = false;
  while (i < l) {
    const char = input[i];
    switch (char) {
      case "<":
        if (!inGarbage) {
          res.push(input.substring(start, i));
        }
        inGarbage = true;
        break;
      case "!":
        i++;
        break;
      case ">":
        start = i + 1;
        inGarbage = false;
        break;
    }
    i++;
  }
  res.push(input.substring(start));
  return res.join("");
};

const clearedInput = clearGarbage(input).replace(/[^{}]/g, "");

let total = 0;
let currentWeight = 0;

for (const char of clearedInput) {
  if (char === "{") {
    currentWeight++;
  } else {
    total += currentWeight;
    currentWeight--;
  }
}

console.log(total);

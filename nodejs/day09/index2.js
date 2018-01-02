const { readFile } = require("../lib");

const input = readFile("./input");

// const input = "<random characters>";

let total = 0;

let i = 0;
const l = input.length;
let inGarbage = false;
while (i < l) {
  const char = input[i];
  switch (char) {
    case "<":
      if (inGarbage) {
        total++;
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
    default:
      if (inGarbage) {
        total++;
      }
  }
  i++;
}

console.log(total);

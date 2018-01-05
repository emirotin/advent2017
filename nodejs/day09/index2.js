const { readFile } = require("../lib");

const input = readFile("./input");

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

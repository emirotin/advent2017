const fs = require("fs");

const lines = fs
  .readFileSync("./input", "utf-8")
  .trim()
  .split("\n");

const isValid = line => {
  const hash = {};
  const words = line.split(" ");
  for (const word of words) {
    if (hash[word]) {
      return false;
    }
    hash[word] = true;
  }
  return true;
};

console.log(lines.filter(isValid).length);

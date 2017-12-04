const fs = require("fs");

const lines = fs
  .readFileSync("./input", "utf-8")
  .trim()
  .split("\n");

const normalize = word =>
  word
    .split("")
    .sort()
    .join("");

const isValid = line => {
  const hash = {};
  const words = line.split(" ");
  for (let word of words) {
    word = normalize(word);
    if (hash[word]) {
      return false;
    }
    hash[word] = true;
  }
  return true;
};

console.log(lines.filter(isValid).length);

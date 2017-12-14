const { padStart } = require("lodash");
const hash = require("./hash");

const toBits = s =>
  s
    .split("")
    .map(d => padStart(parseInt(d, 16).toString(2), 4, "0"))
    .join("")
    .split("")
    .map(x => (x === "1" ? 1 : 0));

const sum = a => a.reduce((x, y) => x + y, 0);

const INPUT = "ljoxqyyw";

const count = index => {
  const input = INPUT + "-" + index;
  const bits = toBits(hash(input));
  return sum(bits);
};

const range = Array.from({ length: 128 }, (_, i) => i);

console.log(sum(range.map(count)));

const { readLines, parseInt } = require("../lib");

const parse = line => line.split(" ");

const labelToIndex = [];
const indexToLabel = [];
const instructions = readLines("./input2.3")
  .map(parse)
  .map(l => {
    const i = indexToLabel.length;
    const label = parseInt(l[0]);
    labelToIndex[label] = i;
    indexToLabel[i] = label;
    return l.slice(1);
  }, {});

const regs = { a: 1 };

const get = reg => {
  if (reg.match(/^-?\d+$/)) {
    return parseInt(reg);
  }
  return regs[reg] || 0;
};

let i = 0;
let label = 0;
while (i >= 0 && i < instructions.length) {
  console.log("> ", label);
  label = null;
  const _ = instructions[i];
  switch (_[0]) {
    case "set":
      regs[_[1]] = get(_[2]);
      break;
    case "sub":
      regs[_[1]] = get(_[1]) - get(_[2]);
      break;
    case "mul":
      regs[_[1]] = get(_[1]) * get(_[2]);
      break;
    case "gotonz":
      if (get(_[1]) !== 0) {
        label = get(_[2]);
      }
      break;
    case "exit":
      i = instructions.length;
      break;
  }
  if (label == null) {
    i += 1;
    label = indexToLabel[i];
  } else {
    i = labelToIndex[label];
  }
}

console.log(regs.h);

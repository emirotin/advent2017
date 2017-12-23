const { readLines, parseInt } = require("../lib");

const parse = line => line.split(" ");

const instructions = readLines("./input").map(parse);

const regs = {};

const get = reg => {
  if (reg.match(/^-?\d+$/)) {
    return parseInt(reg);
  }
  return regs[reg] || 0;
};

let mulCount = 0;

let i = 0;
while (i >= 0 && i < instructions.length) {
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
      mulCount++;
      break;
    case "jnz":
      if (get(_[1]) !== 0) {
        i += get(_[2]);
        continue;
      }
      break;
  }
  i += 1;
}

console.log(mulCount);

const { readLines, parseInt } = require("../lib");

const parse = line => line.split(" ").slice(1); // skip line mnumbers

const instructions = readLines("./input2.2").map(parse);

const regs = { a: 1 };

const get = reg => {
  if (reg.match(/^-?\d+$/)) {
    return parseInt(reg);
  }
  return regs[reg] || 0;
};

let i = 0;
while (i >= 0 && i < instructions.length) {
  console.log("> ", i);
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
        i = get(_[2]);
        continue;
      }
      break;
  }
  i += 1;
}

console.log(regs.h);

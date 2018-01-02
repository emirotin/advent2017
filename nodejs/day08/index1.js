const { readLines, parseInt } = require("../lib");

const parse = line => {
  const m = line.match(
    /^(\w+) (inc|dec) (-?\d+) if (\w+) (<|>|<=|>=|==|!=) (-?\d+)$/
  );
  if (!m) {
    throw new Error(`WTF ${line}`);
  }
  return {
    reg: m[1],
    dec: m[2] === "dec",
    val: parseInt(m[3]),
    condReg: m[4],
    cond: m[5],
    condVal: parseInt(m[6])
  };
};

const data = readLines("./input").map(parse);

const reg = {};

const get = name => reg[name] || 0;

const update = (name, dec, val) => {
  reg[name] = get(name) + val * (dec ? -1 : 1);
};

const condHolds = (name, cond, val) => {
  const x = get(name);
  switch (cond) {
    case "<":
      return x < val;
    case "<=":
      return x <= val;
    case ">":
      return x > val;
    case ">=":
      return x >= val;
    case "==":
      return x == val;
    case "!=":
      return x != val;
    default:
      throw new Error(`WTF unknown cond ${cond} for ${name}`);
  }
};

data.forEach(({ reg, dec, val, condReg, cond, condVal }) => {
  if (condHolds(condReg, cond, condVal)) {
    update(reg, dec, val);
  }
});

console.log(Math.max(...Object.values(reg)));

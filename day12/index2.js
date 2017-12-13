const { readLines, parseInt } = require("../lib");

const input = readLines("./input");

const parse = line => {
  const [p, ps] = line.split(/\s*<->\s*/);
  return {
    p: parseInt(p),
    c: ps.split(/\s*,\s*/).map(parseInt)
  };
};

const data = input.map(parse);
const byId = data.reduce((acc, d) => {
  acc[d.p] = d;
  return acc;
}, {});

const findGroup = () => {
  const id = Object.keys(byId)[0];
  if (id == null) {
    return false;
  }

  const group = new Set();
  const next = [];

  let current = byId[id];
  delete byId[id];

  while (true) {
    group.add(current.p);
    current.c.forEach(c => {
      if (!group.has(c)) {
        next.push(c);
      }
    });
    if (!next.length) {
      break;
    }
    const id = next.shift();
    current = byId[id];
    delete byId[id];
  }

  return true;
};

let i = 0;
while (findGroup()) {
  i++;
}

console.log(i);

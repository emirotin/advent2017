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

const group = new Set();
const next = [];

let current = data[0];

while (current) {
  group.add(current.p);
  current.c.forEach(c => {
    if (!group.has(c)) {
      next.push(c);
    }
  });
  const id = next.shift();
  current = id != null && data[id];
}

console.log(group.size);

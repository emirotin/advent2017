const { readLines, parseInt } = require("../lib");

const parseLine = line => {
  const parts = line.split(/\s*->\s*/);
  const children = parts.length > 1 ? parts[1].split(/\s*,\s*/) : [];
  const match = parts[0].match(/(\w+)\s\((\d+)\)/);
  const name = match[1];
  const weight = parseInt(match[2]);

  return { name, weight, children };
};

const programs = readLines("./input").map(parseLine);

const programById = programs.reduce((acc, p) => {
  acc[p.name] = p;
  return acc;
}, {});

programs.forEach(p => {
  p.children = p.children.map(c => {
    c = programById[c];
    c.parent = p;
    return c;
  });
});

let p = programs[0];
while (p.parent) {
  p = p.parent;
}
console.log(p.name);

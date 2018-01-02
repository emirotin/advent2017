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

let root = programs[0];
while (root.parent) {
  root = root.parent;
}

const sum = a => a.reduce((x, y) => x + y, 0);

const updateWeights = p => {
  p.children.forEach(updateWeights);
  p.totalWeight = p.weight + sum(p.children.map(c => c.totalWeight));
};

updateWeights(root);

const collectWeights = p => {
  const weights = {};
  p.children.forEach(c => {
    const key = "" + c.totalWeight;
    weights[key] = (weights[key] || []).concat(c);
  });
  const keys = Object.keys(weights);
  if (keys.length > 2) {
    throw new Error(`Have no idea what's going with ${p.name}`);
  }
  if (keys.length === 1) {
    return {
      good: parseInt(keys[0])
    };
  }

  const [first, second] = keys;

  if (weights[first].length === 1) {
    return {
      good: parseInt(second),
      bad: parseInt(first),
      badProgram: weights[first][0]
    };
  } else {
    return {
      good: parseInt(first),
      bad: parseInt(second),
      badProgram: weights[second][0]
    };
  }
};

const findUnbalanced = p => {
  const { good, bad, badProgram } = collectWeights(p);
  if (!badProgram) return null;
  return findUnbalanced(badProgram) || { good, bad, badProgram };
};

const { badProgram, good, bad } = findUnbalanced(root);
console.log(badProgram.weight - bad + good);

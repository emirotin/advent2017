const { readLines, parseInt } = require("../lib");
const uniq = require("lodash/uniq");

const parse = s => {
  const m = s.match(/^p=<(.*)>, v=<(.*)>, a=<(.*)>$/);
  if (!m) {
    throw new Error("WTF");
  }
  // parse each group
  const [a, v, p] = [m[3], m[2], m[1]].map(c => c.split(",").map(parseInt));

  // split the vectors by coordinates
  return {
    x: [a[0] / 2, v[0] + a[0] / 2, p[0]],
    y: [a[1] / 2, v[1] + a[1] / 2, p[1]],
    z: [a[2] / 2, v[2] + a[2] / 2, p[2]]
  };
};

let lines = readLines("./input").map(parse);

const isInt = x => x === ~~x;

const _collisionTimes = (a, b, c) => {
  // find integer, non-negative zeroes of the quadratic curve
  const D = b * b - 4 * a * c;
  if (D < 0) return;
  const d = Math.sqrt(D);
  const ts = [(-b - d) / (2 * a), (-b + d) / (2 * a)].filter(
    t => t >= 0 && isInt(t)
  );

  return ts.length ? ts : undefined;
};

const _doCollide = (t, coord, l1, l2) => {
  // check if the curves (particle's trajectories) collide in the given dimension
  const a = l1[coord][0] - l2[coord][0];
  const b = l1[coord][1] - l2[coord][1];
  const c = l1[coord][2] - l2[coord][2];

  return a * t * t + b * t + c === 0;
};

const collisionTimes = (l1, l2) => {
  // first find the possible collisions in X dimension
  const a = l1.x[0] - l2.x[0];
  const b = l1.x[1] - l2.x[1];
  const c = l1.x[2] - l2.x[2];

  let ts = _collisionTimes(a, b, c);
  if (ts == null) {
    return [];
  }

  // now check if the curves also cross in Y and Z dimension which means
  // the particles actually collide
  // as we eliminate the particles we only care about the smaller root
  // (that conforms to the condition)
  return Math.min(
    ...ts.filter(t => _doCollide(t, "y", l1, l2) && _doCollide(t, "z", l1, l2))
  );
};

const collisions = [];
const collisionsByTime = [];

for (let i = 0; i < lines.length; i++) {
  for (j = i + 1; j < lines.length; j++) {
    // for each pair if particles {i,j}
    // find if they can ever collide at any given time t
    // and if so record this option
    const t = collisionTimes(lines[i], lines[j]);
    if (!Number.isFinite(t)) continue;
    collisions.push(t);
    collisionsByTime[t] = collisionsByTime[t] || [];
    collisionsByTime[t].push({ i, j });
  }
}

collisions.sort((x, y) => x - y);

const drop = {};

for (const t of collisions) {
  const newDrop = {};
  // for each of the possible collision times
  for (const { i, j } of collisionsByTime[t]) {
    // only care about the particles that haven't been dropped yet
    if (!drop[i] && !drop[j]) {
      // and mark them to be dropped after this frame
      newDrop[i] = true;
      newDrop[j] = true;
    }
  }
  // now drop everything from this run
  Object.assign(drop, newDrop);
}

lines = lines.filter((el, i) => !drop[i]);

console.log(lines.length);

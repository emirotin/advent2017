const { readLines, parseInt } = require("../lib");
const uniq = require("lodash/uniq");

const parse = s => {
  const m = s.match(/^p=<(.*)>, v=<(.*)>, a=<(.*)>$/);
  if (!m) {
    throw new Error("WTF");
  }
  const [a, v, p] = [m[3], m[2], m[1]].map(c => c.split(",").map(parseInt));

  return {
    x: [a[0] / 2, v[0] + a[0] / 2, p[0]],
    y: [a[1] / 2, v[1] + a[1] / 2, p[1]],
    z: [a[2] / 2, v[2] + a[2] / 2, p[2]]
  };
};

let lines = readLines("./input").map(parse);

const isInt = x => x === ~~x;

const _collisionTimes = (a, b, c) => {
  const D = b * b - 4 * a * c;
  if (D < 0) return;
  const d = Math.sqrt(D);
  const ts = [(-b - d) / (2 * a), (-b + d) / (2 * a)].filter(
    t => t >= 0 && isInt(t)
  );

  return ts.length ? ts : undefined;
};

const _doCollide = (t, coord, l1, l2) => {
  const a = l1[coord][0] - l2[coord][0];
  const b = l1[coord][1] - l2[coord][1];
  const c = l1[coord][2] - l2[coord][2];

  return a * t * t + b * t + c === 0;
};

const collisionTimes = (l1, l2) => {
  const a = l1.x[0] - l2.x[0];
  const b = l1.x[1] - l2.x[1];
  const c = l1.x[2] - l2.x[2];

  let ts = _collisionTimes(a, b, c);
  if (ts == null) {
    return null;
  }
  ts = ts.filter(t => _doCollide(t, "y", l1, l2) && _doCollide(t, "z", l1, l2));
  return ts.length ? ts : undefined;
};

let collisions = [];

for (let i = 0; i < lines.length; i++) {
  for (j = i + 1; j < lines.length; j++) {
    const ts = collisionTimes(lines[i], lines[j]);
    if (ts != null) {
      collisions.push(...ts);
    }
  }
}

collisions = uniq(collisions).sort((x, y) => x - y);

const doCollide = (t, l1, l2) =>
  _doCollide(t, "x", l1, l2) &&
  _doCollide(t, "y", l1, l2) &&
  _doCollide(t, "z", l1, l2);

for (const t of collisions) {
  const drop = {};
  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      if (doCollide(t, lines[i], lines[j])) {
        drop[i] = true;
        drop[j] = true;
      }
    }
  }
  lines = lines.filter((el, i) => !drop[i]);
}

console.log(lines.length);

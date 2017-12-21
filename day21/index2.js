const { readLines } = require("../lib");
const range = require("lodash/range");
const flatten = require("lodash/flatten");
const uniq = require("lodash/uniq");

const gridToString = grid => grid.join("/");

const stringToGrid = s => s.split("/");

const logGrid = g => console.log(g.map(r => r.join("")).join("\n"));

const gridVariations = g => {
  g = g.split("/").map(l => l.split(""));
  const c = g.length;

  const fv = g.slice().reverse();
  const fh = g.map(r => r.slice().reverse());
  const rr = range(0, c).map(i => range(0, c).map(j => g[c - 1 - j][i]));
  const rl = range(0, c).map(i => range(0, c).map(j => g[j][c - 1 - i]));
  const d1 = range(0, c).map(i => range(0, c).map(j => g[j][i]));
  const d2 = range(0, c).map(i =>
    range(0, c).map(j => g[c - 1 - j][c - 1 - i])
  );

  return uniq(
    [g, fv, fh, rl, rr, d1, d2].map(g => g.map(r => r.join("")).join("/"))
  );
};

const rules = readLines("./input")
  .map(s => s.split(" => "))
  .reduce((acc, [l, r]) => {
    r = r.split("/");
    for (const l_ of gridVariations(l)) {
      acc[l_] = acc[l_] || r;
    }
    return acc;
  }, {});

const gridToSubgrids = (grid, subgridSize) => {
  const size = grid.length;
  const c = size / subgridSize;
  return range(0, c).map(i =>
    range(0, c).map(j =>
      grid
        .slice(i * subgridSize, (i + 1) * subgridSize)
        .map(row => row.slice(j * subgridSize, (j + 1) * subgridSize))
    )
  );
};

const concatStrings = r => r.reduce((acc, r) => acc + r, "");
const concatArrays = r => r.reduce((acc, r) => acc.concat(r), []);

const subgridsToGrid = ss => {
  const c = ss.length;
  const subgridSize = ss[0][0].length;
  const size = c * subgridSize;
  return concatArrays(
    ss.map(row =>
      range(0, subgridSize).map(i => concatStrings(row.map(cell => cell[i])))
    )
  );
};

const mapSubgrid = g => {
  const res = rules[gridToString(g)];
  if (!res) {
    throw new Error(`No rewrite rule for ${gridToString(g)}`);
  }
  return res;
};

let grid = stringToGrid(".#./..#/###");
const ITER = 18;

for (let i = 0; i < ITER; i++) {
  const size = grid.length;
  const subgridSize = size % 2 ? 3 : 2;
  let ss = gridToSubgrids(grid, subgridSize);
  ss = ss.map(rr => rr.map(mapSubgrid));
  grid = subgridsToGrid(ss);
}

console.log(
  gridToString(grid)
    .split("")
    .filter(c => c === "#").length
);

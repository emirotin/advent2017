const { readLines } = require("../lib");
const range = require("lodash/range");
const flatten = require("lodash/flatten");

const rules = readLines("./input")
  .map(s => s.split(" => "))
  .reduce((acc, [l, r]) => {
    acc[l] = r;
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

const concat = r => r.reduce((acc, r) => acc.concat(r), []);

const subgridsToGrid = ss => {
  const c = ss.length;
  const subgridSize = ss[0][0].length;
  const size = c * subgridSize;
  return range(0, size).map(i =>
    range(0, size).map(j => {
      const x = Math.floor(i / subgridSize);
      const ii = i % subgridSize;
      const y = Math.floor(j / subgridSize);
      const jj = j % subgridSize;
      return ss[x][y][ii][jj];
    })
  );
};

const gridVariations = g => {
  const c = g.length;

  const fv = g.slice().reverse();
  const fh = g.map(r => r.slice().reverse());
  const rr = range(0, c).map(i => range(0, c).map(j => g[c - 1 - j][i]));
  const rl = range(0, c).map(i => range(0, c).map(j => g[j][c - 1 - i]));
  const d1 = range(0, c).map(i => range(0, c).map(j => g[j][i]));
  const d2 = range(0, c).map(i =>
    range(0, c).map(j => g[c - 1 - j][c - 1 - i])
  );

  return [g, fv, fh, rl, rr, d1, d2];
};

const mapSubgrid = g => {
  const ggs = gridVariations(g).map(gridToString);
  for (const gg of ggs) {
    if (rules[gg]) {
      return stringToGrid(rules[gg]);
    }
  }
  throw new Error(`No rewrite rule for ${gridToString(g)}`);
};

const gridToString = grid => grid.map(row => row.join("")).join("/");

const stringToGrid = s => s.split("/").map(l => l.split(""));

const logGrid = g => console.log(g.map(r => r.join("")).join("\n"));

let grid = stringToGrid(".#./..#/###");
const ITER = 5;

for (let i = 0; i < ITER; i++) {
  const size = grid.length;
  const subgridSize = size % 2 ? 3 : 2;
  const ss = gridToSubgrids(grid, subgridSize).map(rr => rr.map(mapSubgrid));
  grid = subgridsToGrid(ss);
}

console.log(
  gridToString(grid)
    .split("")
    .filter(c => c === "#").length
);

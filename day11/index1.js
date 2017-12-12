const { readFile } = require("../lib");

const data = readFile("./input").split(",");

// Kudos https://www.redblobgames.com/grids/hexagons/#coordinates

const mapDir = dir => {
  switch (dir) {
    case "n":
      return { x: 1, y: 0, z: -1 };
    case "ne":
      return { x: 1, y: -1, z: 0 };
    case "nw":
      return { x: 0, y: 1, z: -1 };
    case "sw":
      return { x: -1, y: 1, z: 0 };
    case "s":
      return { x: -1, y: 0, z: 1 };
    case "se":
      return { x: 0, y: -1, z: 1 };
  }
};

const c = data.map(mapDir).reduce(
  ({ x, y, z }, { x: x1, y: y1, z: z1 }) => ({
    x: x + x1,
    y: y + y1,
    z: z + z1
  }),
  { x: 0, y: 0, z: 0 }
);

console.log((Math.abs(c.x) + Math.abs(c.y) + Math.abs(c.z)) / 2);

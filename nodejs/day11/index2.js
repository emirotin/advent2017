const { readFile } = require("../lib");

const data = readFile("./input").split(",");

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

let c = { x: 0, y: 0, z: 0 };
let max = 0;

data.map(mapDir).forEach(({ x, y, z }) => {
  c = {
    x: x + c.x,
    y: y + c.y,
    z: z + c.z
  };
  const d = (Math.abs(c.x) + Math.abs(c.y) + Math.abs(c.z)) / 2;
  max = Math.max(max, d);
});

console.log(max);

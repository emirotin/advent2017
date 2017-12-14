const { padStart } = require("lodash");
const hash = require("./hash");

const toMap = s =>
  s
    .split("")
    .map(d => padStart(parseInt(d, 16).toString(2), 4, "0"))
    .join("")
    .split("")
    .map(x => (x === "1" ? "#" : "."));

const INPUT = "ljoxqyyw";

const buildRow = index => toMap(hash(INPUT + "-" + index));

const SIZE = 128;
const grid = Array.from({ length: SIZE }, (_, i) => buildRow(i));

const readCell = ({ i, j }) => grid[i][j];

const isFilled = c => readCell(c) === "#";

const findStart = () => {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (isFilled({ i, j })) {
        return { i, j };
      }
    }
  }
  return null;
};

let groupNum = 0;
let startCoords;

const fillCell = ({ i, j }) => {
  grid[i][j] = groupNum;
};

const neighbours = ({ i, j }) =>
  [
    { i: i - 1, j },
    { i: i, j: j - 1 },
    { i: i, j: j + 1 },
    { i: i + 1, j }
  ].filter(({ i, j }) => i >= 0 && i < SIZE && j >= 0 && j < SIZE);

const fillGroup = () => {
  const next = [];
  let nextStart = startCoords;
  while (nextStart) {
    if (isFilled(nextStart)) {
      fillCell(nextStart);
      next.push(...neighbours(nextStart).filter(isFilled));
    }
    nextStart = next.shift();
  }
};

while (true) {
  startCoords = findStart();
  if (!startCoords) {
    break;
  }
  groupNum++;
  fillGroup();
}

console.log(groupNum);

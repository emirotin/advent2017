const tape = [0];
let pos = 0;
let state = "A";
const ITER = 12317297;
const instructions = {
  A: {
    0: [1, "r", "B"],
    1: [0, "l", "D"]
  },
  B: {
    0: [1, "r", "C"],
    1: [0, "r", "F"]
  },
  C: {
    0: [1, "l", "C"],
    1: [1, "l", "A"]
  },
  D: {
    0: [0, "l", "E"],
    1: [1, "r", "A"]
  },
  E: {
    0: [1, "l", "A"],
    1: [0, "r", "B"]
  },
  F: {
    0: [0, "r", "C"],
    1: [0, "r", "E"]
  }
};

const expandLeft = () => {
  tape.unshift(0);
  pos++;
};

const expandRight = () => {
  tape.push(0);
};

const epxandIfNeeded = (dir, pos) => {
  if (pos === 0 && dir === "l") {
    expandLeft();
  } else if (pos === tape.length - 1 && dir === "r") {
    expandRight();
  }
};

for (let i = 0; i < ITER; i++) {
  const [write, dir, newState] = instructions[state][tape[pos]];
  tape[pos] = write;
  state = newState;
  epxandIfNeeded(dir, pos);
  if (dir === "l") {
    pos--;
  } else {
    pos++;
  }
}

const sum = a => a.reduce((x, y) => x + y, 0);

console.log(sum(tape));

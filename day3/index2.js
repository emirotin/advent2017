const upSquare = n => Math.ceil(Math.sqrt(n));

const getLayer = n => {
  const m = upSquare(n);
  return Math.ceil((m - 1) / 2);
};

const indexToCoords = n => {
  if (n === 1) return [0, 0];
  const l = getLayer(n);
  n -= (2 * l - 1) ** 2 + 1;
  const layerLen = 2 * l;
  const side = Math.floor(n / layerLen);
  const lower = layerLen * side;
  const upper = lower + layerLen - 1;
  const mid = (lower + upper - 1) / 2;
  switch (side) {
    case 0:
      return [l, n - mid];
    case 2:
      return [-l, mid - n];
    case 1:
      return [mid - n, l];
    case 3:
      return [n - mid, -l];
  }
};

const coordsToIndex = ([x, y]) => {
  if (x === 0 && y === 0) return 1;
  const absX = Math.abs(x);
  const absY = Math.abs(y);

  let i = 0;
  if (absY >= absX) {
    if (y >= 0) {
      i = (absY * 2 + 1) ** 2 - absY * 5;
      return i - x;
    } else {
      i = (absY * 2 + 1) ** 2 - absY;
      return i + x;
    }
  } else {
    if (x >= 0) {
      i = (absX * 2 - 1) ** 2 + absX;
      return i + y;
    } else {
      i = (absX * 2 + 1) ** 2 - absX * 3;
      return i - y;
    }
  }
};

const N = 277678;

const indices = i => {
  let [x, y] = indexToCoords(i);
  let adjs = [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1]
  ];
  return adjs.map(coordsToIndex).filter(j => j < i);
};

const sum = a => a.reduce((x, y) => x + y, 0);

const a = [null, 1];
let max = 1;
let i = 1;
while (max <= N) {
  i++;
  a[i] = max = sum(indices(i).map(j => a[j]));
}

console.log(max);

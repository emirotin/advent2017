const upSquare = n => Math.ceil(Math.sqrt(n));

const getLayer = n => {
  const m = upSquare(n);
  return Math.ceil((m - 1) / 2);
};

const N = 277678;

const dist = n => {
  if (n === 1) return 0;
  const l = getLayer(n);
  n -= (2 * l - 1) ** 2 + 1;
  const layerLen = 2 * l;
  const lower = layerLen * Math.floor(n / layerLen);
  const upper = lower + layerLen - 1;
  const mid = (lower + upper - 1) / 2;
  return l + Math.abs(n - mid);
};

console.log(dist(N));

// 1 8 16 24

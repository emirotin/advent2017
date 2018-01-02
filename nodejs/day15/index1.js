const Generator = (seed, factor, modulo) => {
  let prev = seed;

  return () => (prev = (prev * factor) % modulo);
};

const ITERS = 4e7;
const FACTOR_A = 16807;
const FACTOR_B = 48271;
const MODULO = 2147483647;
const COMP_BITS = 16;

const START_A = 634;
const START_B = 301;

const a = Generator(START_A, FACTOR_A, MODULO);
const b = Generator(START_B, FACTOR_B, MODULO);

const m = 2 ** COMP_BITS;
let res = 0;
for (let i = 0; i < ITERS; i++) {
  if (!((a() - b()) % m)) {
    res++;
  }
}

console.log(res);

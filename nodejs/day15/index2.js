const Generator = (seed, factor, modulo, d) => {
  let prev = seed;

  return () => {
    do {
      prev = (prev * factor) % modulo;
    } while (prev % d);
    return prev;
  };
};

const ITERS = 5e6;
const FACTOR_A = 16807;
const FACTOR_B = 48271;
const D_A = 4;
const D_B = 8;
const MODULO = 2147483647;
const COMP_BITS = 16;

const START_A = 634;
const START_B = 301;

const a = Generator(START_A, FACTOR_A, MODULO, D_A);
const b = Generator(START_B, FACTOR_B, MODULO, D_B);

const m = 2 ** COMP_BITS;
let res = 0;
for (let i = 0; i < ITERS; i++) {
  if (!((a() - b()) % m)) {
    res++;
  }
}

console.log(res);

const { readLines, parseInt } = require("../lib");

const parse = line => line.split(" ");

const instructions = readLines("./input").map(parse);

const Program = (instructions, pid, { send, receive }) => {
  const regs = { p: pid };

  const get = reg => {
    if (reg.match(/^-?\d+$/)) {
      return parseInt(reg);
    }
    return regs[reg] || 0;
  };

  const run = async () => {
    let i = 0;
    while (i >= 0 && i < instructions.length) {
      const _ = instructions[i];
      switch (_[0]) {
        case "set":
          regs[_[1]] = get(_[2]);
          break;
        case "add":
          regs[_[1]] = get(_[1]) + get(_[2]);
          break;
        case "mul":
          regs[_[1]] = get(_[1]) * get(_[2]);
          break;
        case "mod":
          regs[_[1]] = get(_[1]) % get(_[2]);
          break;
        case "jgz":
          if (get(_[1]) > 0) {
            i += get(_[2]);
            continue;
          }
          break;
        case "snd":
          await send(get(_[1]));
          break;
        case "rcv":
          regs[_[1]] = await receive();
          break;
      }
      i += 1;
    }
  };

  return { run };
};

const System = () => {
  const Q = {};
  const P = {};
  const L = [];

  let ans = 0;

  const send = toPid => value => {
    if (toPid === 0) {
      ans++;
    }

    const p = P[toPid];
    if (p) {
      L[toPid] = false;
      p(value);
    } else {
      const q = Q[toPid] || (Q[toPid] = []);
      q.push(value);
    }
  };

  const receive = toPid => () => {
    const q = Q[toPid] || (Q[toPid] = []);
    if (q.length) {
      return q.shift();
    }

    L[toPid] = true;
    if (L[0] && L[1]) {
      console.log(ans);
      process.exit();
    }

    return new Promise(resolve => {
      P[toPid] = resolve;
    });
  };

  return {
    run: async () => {
      const ps = [
        Program(instructions, 0, {
          send: send(1),
          receive: receive(0)
        }),
        Program(instructions, 1, {
          send: send(0),
          receive: receive(1)
        })
      ];

      Promise.all(ps.map(p => p.run()));
    }
  };
};

const s = System();
s.run();

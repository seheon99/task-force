export const generatePRNG = (seed: number) => {
  const m = 0x80000000;
  const a = 1103515245;
  const c = 12345;

  let state = seed % m;
  return () => {
    state = (a * state + c) % m;
    return state / m;
  };
};

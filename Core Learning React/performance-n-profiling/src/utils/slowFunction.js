export function slowFunction(ms = 5) {
  const start = performance.now();
  while (performance.now() - start < ms) {};
};
export default (a: Record<string, unknown>, b: Record<string, unknown>) =>
  Object.entries(a).every(([key, value]) => value === b[key])

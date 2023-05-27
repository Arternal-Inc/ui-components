// only allows alphanumeric tokens, ideal for building full names or addresses
export default (input: unknown[] = [], separator = ' ') =>
  input
    .filter(
      (token) =>
        typeof token === 'string' ||
        (typeof token === 'number' && Number.isFinite(token))
    )
    .map((token) => `${token}`.trim())
    .filter(Boolean)
    .join(separator)

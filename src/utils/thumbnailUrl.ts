// expects:
//   s3:  https://s3.amazonaws.com/www.inventory.gallery/585/abcdefg/image.jpg
//   cdn: https://inventorytest.arternal.com/3/abcdefg/image.jpg
//   no host: 3/abcdefg/image.jpg
// returns:
//   lambda: https://inventorytest.arternal.com/fit-in/150x150/3/abcdefg/image.jpg
//   raw (did not match): http://example.com/whatever.jpg

const regex = new RegExp(
  /^.*?(arternal\.com(\/fit-in\/\d+x\d+)?|(www\.inventory\.gallery(\/fit-in\/\d+x\d+)?))/i
)

export default (
  input: string,
  baseUrl: string,
  width = 256,
  height = 256
): string => {
  // strip any trailing slash
  const base = baseUrl.replace(/\/+$/, '')
  const prefix = `${base}/${width}x${height}`

  return input.startsWith('http') || input.startsWith('/images')
    ? input.replace(regex, prefix)
    : `${prefix}/${input}`
}

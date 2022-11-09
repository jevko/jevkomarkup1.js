export const convert = (jevko, {tag = 'document'} = {}) => node(prep(jevko), tag)

const prep = jevko => {
  const {subjevkos, suffix} = jevko

  const subs = []
  for (const {prefix, jevko} of subjevkos) {
    const trimmed = prefix.trim()
    if (trimmed === '--') continue
    subs.push({prefix: trimmed, jevko: prep(jevko)})
  }
  return {subjevkos: subs, suffix}
}

const string = (jevko) => {
  const {subjevkos, suffix} = jevko
  if (subjevkos.length === 0) return suffix
  throw Error('Text node or attribute value cannot have children.')
}

const node = (jevko, tag) => {
  const {subjevkos, suffix} = jevko
  const attributes = Object.create(null)
  if (subjevkos.length === 0) return {
    tag,
    attributes,
    children: [suffix],
  }
  if (suffix.trim() !== '') {
    throw Error(`Unwrapped text node '${suffix}' at the end of ${tag}. Remove it or wrap in [] to fix.`)
  }
  const children = []

  for (const {prefix, jevko} of subjevkos) {
    if (prefix.endsWith('=')) {
      const key = prefix.slice(0, -1).trim()
      if (key in attributes) throw Error(`Duplicate attribute '${key}' in ${tag}.`)
      attributes[key] = string(jevko)
    } else if (prefix === '') {
      children.push(string(jevko))
    } else {
      children.push(node(jevko, prefix))
    }
  }

  return {
    tag,
    attributes,
    children,
  }
}
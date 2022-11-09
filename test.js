import {parseJevko} from "https://cdn.jsdelivr.net/gh/jevko/parsejevko.js@v0.1.6/mod.js"

import {convert} from './mod.js'

const ret = convert(parseJevko(`
h1 [title]
p [
  class=[pretty]
  [list:]
]
ul [
  li [style=[color: red][Foo]]
  li [Bar]
  li [Baz]
]
[text node]
`))

console.log(JSON.stringify(ret, null, 2))
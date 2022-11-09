NOTE: this is a sketch

# jevkomarkup1.js

Codename Jevko Markup 1.

A Jevko format for markup that decodes this:

```
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
```

into this:

```json
{
  "tag": "document",
  "children": [
    {
      "tag": "h1",
      "attributes": {},
      "children": [
        "title"
      ]
    },
    {
      "tag": "p",
      "children": [
        "list:"
      ],
      "attributes": {
        "class": "pretty"
      }
    },
    {
      "tag": "ul",
      "children": [
        {
          "tag": "li",
          "children": [
            "Foo"
          ],
          "attributes": {
            "style": "color: red"
          }
        },
        {
          "tag": "li",
          "attributes": {},
          "children": [
            "Bar"
          ]
        },
        {
          "tag": "li",
          "attributes": {},
          "children": [
            "Baz"
          ]
        }
      ],
      "attributes": {}
    },
    "text node"
  ],
  "attributes": {}
}
```


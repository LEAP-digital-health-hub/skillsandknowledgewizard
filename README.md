# Skills and Knowledge Wizard

A small, static site that helps academics, healthcare professionals, and private
sector teams discover curated learning resources tailored to their role and
interests.

## Features

- Guided wizard that captures the visitor's background and learning focus.
- Curated catalogue covering online courses, in-person workshops, podcasts, and
  video series.
- Smart filtering based on both audience and keywords so that recommendations
  stay relevant.
- Lightweight HTML, CSS, and vanilla JavaScript—no build tooling required.

## Getting started

Open `index.html` in your preferred browser to use the wizard locally. All
styling and behaviour is delivered client-side, so no server setup is needed.

```bash
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

## Customising the resource catalogue

The catalogue of learning experiences lives in `script.js` as the `RESOURCES`
array. Each entry includes:

- `category`: One of the four groupings shown on the results page.
- `audience`: Which audiences the item is most relevant for.
- `tags` and `description`: Used for keyword matching when visitors enter a
  topic or focus area.

Adjust, remove, or add entries to tailor the wizard to your organisation's
offerings.

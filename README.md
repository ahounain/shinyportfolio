# Ali Hounain — Hugo portfolio

A static Hugo site preserving the portfolio's typography, red/cream palette, responsive layout, opening A animation, résumé download, and expandable employment history. No Node, React, npm, or external theme is required.

## Run locally

Install Hugo (tested with standard edition 0.168.0), then run:

```sh
hugo server
```

Open the local URL Hugo prints. To create production files:

```sh
hugo --minify --baseURL "https://your-domain.example/"
```

Upload the generated **public/** directory to any static host. Set the final base URL in hugo.toml or pass --baseURL at build time. Repository subpaths work too, for example https://username.github.io/shinyportfolio/.

## Hosting

- Cloudflare Pages: build command **hugo --minify**, output directory **public**, HUGO_VERSION **0.168.0**. Change any existing Next.js build preset/command in the dashboard.
- Other static hosts: run the same build and publish public/. No server runtime is required.
- GitHub Pages is not enabled automatically by this conversion.

## Edit the site

- **layouts/\_partials/**: home sections, navigation, opening, and footer.
- **assets/css/site.css**: design and responsive rules.
- **assets/js/site.js**: intro/replay/skip behavior; native HTML details handles expandable history.
- **static/aliresume.pdf**: downloadable résumé.
- **static/fonts/**: self-hosted font files.
- **content/**: miscellaneous page and legacy About/Projects redirects; résumé viewer.

Hugo fingerprints CSS and JavaScript for cache-safe updates. The opening is skipped for reduced-motion preferences and deep links, and can be dismissed with Escape. All core content is available without JavaScript. Do not edit or commit generated public/ files.

## Code formatting

The repository includes `.editorconfig` and `.prettierrc.json` for consistent indentation and line wrapping. For optional format-on-save support, configure your editor's Prettier integration with `prettier-plugin-go-template`. The font-generation Python source uses Black formatting. These tools are not needed to run or build the Hugo site.

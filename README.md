# Condensate

[![MIT License](https://img.shields.io/github/license/jamesejr/hugo-theme-condensate)](https://github.com/jamesejr/hugo-theme-condensate/blob/main/LICENSE)

> **condensate** /kŏn′dən-sāt″/ (*noun*)
>
> 1. A liquid obtained by the condensation of a gas or vapor, often referring to light liquid hydrocarbons.

## Overview

A minimal, typography-first Hugo theme inspired by [Vapor](https://github.com/sethlilly/Vapor), a Ghost theme by Seth Lilly. Condensate is a Hugo implementation of the same idea with light and dark modes.

| Light | Dark |
| --- | --- |
| ![Condensate in light mode](https://raw.githubusercontent.com/jamesejr/hugo-theme-condensate/main/images/screenshot.png) | ![Condensate in dark mode](https://raw.githubusercontent.com/jamesejr/hugo-theme-condensate/main/images/screenshot-dark.png) |

## Features

- **Typography first.** Clean, minimal and elegant, with slab-serif headings, a comfortable serif body and generous spacing. Fonts are bundled.
- **Light and dark modes.** Follows the reader's system setting, with a toggle that remembers their choice. Override either palette with `[params.light]` and `[params.dark]`.
- **Private by default.** No analytics and no third-party requests. YouTube, Vimeo and GitHub Gist embeds load only after the reader clicks, inside a sandboxed iframe.
- **Syntax highlighting.** Highlighted at build time with no JavaScript, colors that follow light and dark mode, and a copy button on every code block.
- **Configurable feed.** Set how many posts appear per page and how many lines of each post's preview are shown.
- **Made for technical writing.** Optional table of contents, reading time, tags, and styled tables, task lists and blockquotes.
- **Accessible and light.** Skip link, visible focus styles, reduced-motion and print styles, and a few KB of vanilla JavaScript with no frameworks.
- **Standards friendly.** RSS, Open Graph tags and translatable strings out of the box.

## Installation

Follow Hugo's [quick start](https://gohugo.io/getting-started/quick-start/) guide to create an empty website and clone **Condensate** into the themes directory as a submodule:

```sh
git submodule add https://github.com/jamesejr/hugo-theme-condensate themes/hugo-theme-condensate
```

Update your Hugo configuration file to enable the theme:

```toml
# hugo.toml
theme = "hugo-theme-condensate"
```

Try the example site:

```sh
git clone https://github.com/jamesejr/hugo-theme-condensate
cd hugo-theme-condensate/exampleSite
hugo server --themesDir ../..
```

## Configuration

Posts per page uses Hugo's standard setting. Hugo's default is 10, so set it in your `hugo.toml`:

```toml
[pagination]
  pagerSize = 5
```

Other options go under `[params]`. All are optional:

```toml
[params]
  tagline = "A line shown under your name on the home page"
  homeTitle = "Jane Doe"            # defaults to the site title
  description = "Meta description"  # for pages without their own; falls back to tagline, then site title
  avatar = "images/me.jpg"          # file under assets/ or static/, roughly square
  favicon = "favicon.svg"           # file in your static/ folder
  colorScheme = "system"            # or "light" / "dark"
  showThemeToggle = true            # sun/moon button
  showReadingTime = true
  dateFormat = "Monday, January 2, 2006"
  mainSections = ["posts"]          # which sections appear in the home feed
  summaryLines = 4                  # preview lines in the feed, 0 shows the full summary
```

Add `[[menus.main]]` entries for the top menu, as in `exampleSite/hugo.toml`. If your site has an `about` page, the avatar links to it. In a post's front matter, `toc: true` adds a table of contents. The avatar can also be tuned with `avatarAlt`, `avatarScale` and `avatarFocus`.

### Light and dark colors

Override either palette under `[params.light]` and `[params.dark]`. Every key is optional, and each palette only applies in its own mode:

```toml
[params.light]
  background = "#faf6ee"
  text = "#3b3a36"
  accent = "#9a4a1a"

[params.dark]
  background = "#1e1e2e"
  text = "#cdd6f4"
  heading = "#f5f5ff"
  muted = "#9399b2"
  accent = "hsl(265 80% 75%)"
```

The keys are `background`, `text`, `heading`, `muted` and `accent`. Values can be hex (`#1e1e2e`, `#fff`), `rgb()` or `hsl()`. Anything else fails the build.

Setting `background` also adjusts the borders and code block backgrounds to match, and setting `accent` adjusts the link hover and underline colors, so you usually only need these two. Check that your text still has enough contrast against the new background (4.5:1 for body text is the usual target). Syntax highlighting colors are not affected.

## Embeds

The theme makes no third-party requests by default: fonts are bundled and there is no analytics. The `youtube`, `vimeo` and `gist` shortcodes keep it that way by being **click-to-load**. Readers see a card, nothing is requested from the provider until they click it, and the embed then runs in a sandboxed iframe. Without JavaScript the card is a plain link to the provider.

```
{{< youtube w7Ft2ymGmfc >}}
{{< youtube id="w7Ft2ymGmfc" start="30" title="A talk" >}}
{{< vimeo 146022717 >}}
{{< gist spf13 7896402 >}}
{{< gist user="spf13" id="7896402" file="gist.go" >}}
```

- YouTube uses the privacy-enhanced `youtube-nocookie.com` domain, and Vimeo is loaded with do-not-track on.
- A gist runs in an iframe with an opaque origin, so its script cannot read this page, its cookies or its storage.
- Video IDs, gist users and file names are validated at build time. Anything unexpected fails the build instead of producing markup.
- Hugo removed its built-in `gist` shortcode in v0.156, so this theme provides one.

Hugo's other embed shortcodes, such as `x` and `instagram`, are not click-to-load. By default they use third-party JavaScript. Setting `simple = true` under `[privacy.x]` or `[privacy.instagram]` in your site config removes the JavaScript, but readers' browsers may still contact those services to show the content.

For `figure`, use the `caption` parameter for a short caption. `title` renders a heading inside the caption.

## Credits

Typography is based on Vapor by Seth Lilly (MIT). Fonts are bundled under the SIL Open Font License.


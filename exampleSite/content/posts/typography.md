---
title: "Typography"
date: 2026-10-25T19:00:00
tags: ["Features"]
toc: true
---
A reference for every text element Condensate styles, from headings to tables. Use it to check how a change to the theme looks across the whole page.

<!--more-->

Body text is set in a comfortable serif at a generous line height, so long paragraphs stay easy to follow. The quick brown fox jumps over the lazy dog, and the five boxing wizards jump quickly. Pack my box with five dozen liquor jugs, then read this sentence again with "smart quotes", an em dash — like this — and an ellipsis...

# Heading 1

Headings introduce a section and set its place in the outline. A post's title is already the top-level heading, so most writing starts at level two.

## Heading 2

Second-level headings use the slab face and mark the main sections of a post.

### Heading 3

Third-level headings break a section into parts.

#### Heading 4

Fourth-level headings are for the finer details.

##### Heading 5

Fifth-level headings are rarely needed, but they are supported.

###### Heading 6

Sixth-level headings are the smallest step in the outline.

## Inline text

This is a paragraph with **bold text**, *italic text*, ***bold and italic together***, and ~~struck-through text~~. Here is [an inline link](https://gohugo.io/ "Hugo documentation"), and here is `inline code` inside a sentence. A long unbroken string such as `Get-ChildItem -Recurse -Filter *.log | Select-String "failed"` should wrap or scroll without breaking the layout.

A second paragraph follows, to show the spacing between blocks. Paragraphs are separated by a blank line and carry no first-line indent, which keeps the column clean.

## Code

Inline code sits within text, as in `print("hello")`. A block indented by four spaces renders as plain preformatted text:

    print('this is a pre tag')

A fenced block with a language tag gets syntax colors that follow the light and dark setting:

```go
func getCookie(name string, r *http.Request) (*http.Cookie, error) {
	cookie, err := r.Cookie(name)
	if err != nil {
		return nil, err
	}
	return cookie, nil
}
```

```bash
#!/bin/bash
set -euo pipefail

for f in "$@"; do
  sha256sum "$f" # hash each argument
done
```

## Blockquotes

> I want to do with you what spring does with the cherry trees.
>
> — Pablo Neruda

Quotes can run longer and carry *emphasis* or a [link](https://gohugo.io/). Et harum quidem rerum facilis est et expeditasi distinctio, nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.

> A quote can hold another quote.
>
> > Nested quotes indent one more level.

## Lists

An unordered list:

- Red
- Green
- Blue

An ordered list:

1. Collect the sample
2. Hash it
3. Detonate it in a sandbox

A nested list:

- Triage
  - Identify the host
  - Preserve volatile data
- Analysis
  1. Static properties
  2. Behavior in a sandbox
- Reporting

A task list:

- [x] Write the detection rule
- [x] Test it against known-good data
- [ ] Tune the false positives

## Table

| Technique | Tactic | Data source |
|-----------|--------|-------------|
| T1059.001 PowerShell | Execution | Process creation |
| T1547.001 Run keys | Persistence | Registry |
| T1003.001 LSASS memory | Credential access | Process access |

Columns can be aligned too:

| Left | Center | Right |
|:-----|:------:|------:|
| a | b | c |
| longer text | centered | 1,024 |

## Horizontal rule

Content above the rule.

---

Content below the rule.

## Closing thoughts

If something here looks wrong in light or dark mode, this is the page to check first.

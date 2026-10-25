---
title: "A sample technical post with code"
date: 2026-10-12
tags: ["Detection engineering", "Malware analysis"]
toc: true
---
Technical posts are the point of this theme, so code blocks get a copy button and syntax colors that follow the light and dark setting.

<!--more-->

## Decoding a string

```python
import base64

def decode(blob: str) -> bytes:
    """Decode a base64 payload, tolerating missing padding."""
    blob += "=" * (-len(blob) % 4)
    return base64.b64decode(blob)

print(decode("SGVsbG8sIHdvcmxk"))  # b'Hello, world'
```

## A detection rule

```yaml
title: Suspicious PowerShell encoded command
logsource:
  product: windows
  category: process_creation
detection:
  selection:
    Image|endswith: '\powershell.exe'
    CommandLine|contains: ' -enc '
  condition: selection
level: medium
```

## Closing thoughts

Add a `toc: true` line to a post's front matter to show a table of contents above it.


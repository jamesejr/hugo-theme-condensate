---
title: "Syntax Highlighters"
date: 2026-10-25T18:00:00
tags: ["Features", "Code"]
toc: true
---
Code blocks are highlighted at build time, so there is no script to load and no flash of unstyled text. Colors follow the light and dark setting.

<!--more-->

Each block below is tagged with its language. Use the name after the opening backticks, such as `python` or `nasm`, and the theme does the rest.

## Python

```python
import base64
import re
from pathlib import Path

PATTERN = re.compile(
    r"powershell.*-enc\s+(?P<blob>[A-Za-z0-9+/=]+)",
    re.IGNORECASE,
)


class Finding(Exception):
    """Raised when an encoded command is found."""

    def __init__(self, path: Path, command: str) -> None:
        super().__init__(f"{path}: {command[:40]}")
        self.command = command


def decode(blob: str) -> str:
    blob += "=" * (-len(blob) % 4)  # tolerate missing padding
    return base64.b64decode(blob).decode("utf-16-le")


def scan(path: Path) -> list[str]:
    hits = []
    for line in path.read_text(errors="ignore").splitlines():
        if (m := PATTERN.search(line)) and len(line) > 0:
            hits.append(decode(m["blob"]))
    return hits


if __name__ == "__main__":
    for hit in scan(Path("events.log")):
        print(hit)
```

## JavaScript

```javascript
const ENDPOINT = "https://example.com/api/iocs";

class IocClient {
  #cache = new Map();

  constructor(token, { timeout = 5000 } = {}) {
    this.token = token;
    this.timeout = timeout;
  }

  async lookup(hash) {
    if (this.#cache.has(hash)) return this.#cache.get(hash);

    const res = await fetch(`${ENDPOINT}/${hash}`, {
      headers: { Authorization: `Bearer ${this.token}` },
      signal: AbortSignal.timeout(this.timeout),
    });
    if (!res.ok) throw new Error(`lookup failed: ${res.status}`);

    const data = await res.json();
    this.#cache.set(hash, data);
    return data;
  }
}

const client = new IocClient(process.env.API_TOKEN);
const hashes = ["d41d8cd98f00b204e9800998ecf8427e", "0cc175b9c0f1b6a831c399e269772661"];

Promise.all(hashes.map((h) => client.lookup(h)))
  .then((rows) => rows.filter(({ malicious }) => malicious === true))
  .then(console.table) // print only the bad ones
  .catch(console.error);
```

## Go

```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

const marker = "-enc"

type Event struct {
	Host    string
	Command string
}

func (e Event) Suspicious() bool {
	return strings.Contains(strings.ToLower(e.Command), marker)
}

func readEvents(path string) ([]Event, error) {
	f, err := os.Open(path)
	if err != nil {
		return nil, fmt.Errorf("open %s: %w", path, err)
	}
	defer f.Close()

	var events []Event
	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		host, cmd, ok := strings.Cut(scanner.Text(), "\t")
		if !ok {
			continue
		}
		events = append(events, Event{Host: host, Command: cmd})
	}
	return events, scanner.Err()
}

func main() {
	events, err := readEvents("events.tsv")
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}

	hits := make(chan Event)
	go func() {
		defer close(hits)
		for _, e := range events {
			if e.Suspicious() {
				hits <- e // send to the printer
			}
		}
	}()

	for e := range hits {
		fmt.Printf("%-12s %s\n", e.Host, e.Command)
	}
}
```

## Rust

```rust
use std::collections::HashMap;
use std::fs;
use std::io;

const MARKER: &str = "-enc";

#[derive(Debug, Clone)]
struct Event<'a> {
    host: &'a str,
    command: &'a str,
}

impl<'a> Event<'a> {
    fn parse(line: &'a str) -> Option<Self> {
        let (host, command) = line.split_once('\t')?;
        Some(Self { host, command })
    }

    fn is_suspicious(&self) -> bool {
        self.command.to_lowercase().contains(MARKER)
    }
}

fn main() -> Result<(), io::Error> {
    let text = fs::read_to_string("events.tsv")?;
    let mut per_host: HashMap<&str, u32> = HashMap::new();

    for event in text.lines().filter_map(Event::parse) {
        if event.is_suspicious() {
            *per_host.entry(event.host).or_insert(0) += 1;
        }
    }

    let mut rows: Vec<_> = per_host.into_iter().collect();
    rows.sort_by(|a, b| b.1.cmp(&a.1)); // busiest host first

    for (host, count) in rows {
        println!("{host:<12} {count:>4} hits");
    }
    Ok(())
}
```

## Assembly

```nasm
; Linux x86-64: write a message, then exit
section .data
    msg     db "Hello, Condensate", 0x0a
    msg_len equ $ - msg

section .text
    global _start

_start:
    mov     rax, 1              ; sys_write
    mov     rdi, 1              ; file descriptor: stdout
    lea     rsi, [rel msg]      ; buffer
    mov     rdx, msg_len        ; length
    syscall

    xor     rdi, rdi            ; exit code 0
    mov     rax, 60             ; sys_exit
    syscall
```

## Plain text

A block with no language, or an unknown one, stays unhighlighted:

```text
$ nasm -f elf64 hello.asm -o hello.o
$ ld hello.o -o hello
$ ./hello
Hello, Condensate
```

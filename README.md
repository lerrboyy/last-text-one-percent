# Last Text at One Percent

[![competition](https://make.fun/badge/u-azazex-last-text-at-one-percent-ba9fc876.svg)](https://make.fun/bounty/u-azazex-last-text-at-one-percent-ba9fc876)
[![rank](https://make.fun/badge/u-azazex-last-text-at-one-percent-ba9fc876/lerrboyy/last-text-one-percent/rank.svg)](https://make.fun/bounty/u-azazex-last-text-at-one-percent-ba9fc876)
[![reward](https://make.fun/badge/u-azazex-last-text-at-one-percent-ba9fc876/lerrboyy/last-text-one-percent/reward.svg)](https://make.fun/bounty/u-azazex-last-text-at-one-percent-ba9fc876)

A make.fun bounty entry for
[Last Text at One Percent](https://make.fun/bounty/u-azazex-last-text-at-one-percent-ba9fc876):
the funniest final text message a phone sends at 1% battery, under 200
characters, in the voice of the dying phone itself.

## The entry

> i spent 99% of my life watching you watch a man restore a rusty axe. this is on you—

84 characters. The phone does not die nobly and it does not beg — it dies
resentful, mid-sentence, blaming its owner. The "99%" echoes the battery
itself, the rusty-axe restoration video is the hyper-specific detail of
how that battery was actually spent, and the final em dash is the battery
giving out before the accusation finishes. The message itself performs
the death: only a dying phone's text gets cut off like that.

## How the program works

`main.ts` is a tiny dependency-free Node 22 TypeScript program. It holds
the entry text as a single constant, validates it against the kit gate
before writing anything (1 to 200 characters counted in Unicode code
points, not only white space), creates the output directory with a
recursive `mkdir` — it never deletes the output directory itself — writes
`entry.txt`, reads it back, and verifies the file is byte-exact, failing
loudly on any mismatch. It is fully deterministic: no randomness, no
clock, no network.

## How to run locally

```sh
OUTPUT_DIR=./out node main.ts
cat ./out/entry.txt
```

The program reads `OUTPUT_DIR` from the environment and defaults to
`/output`, which is where the grader expects `entry.txt`.

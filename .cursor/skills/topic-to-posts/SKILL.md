---
name: topic-to-posts
description: >-
  Converts course notes or a topic into mobile-friendly HTML reel posts for the
  course-reels static app. Use when the user asks to turn a lecture, markdown
  notes, or a topic into posts, reels, or scrollable one-concept screens, or
  when adding a new topic under public/content.
---

# Topic → Course Reels Posts

Turn a source topic (markdown notes, lecture outline, HTML draft) into
**one-screen, one-concept HTML posts** that plug into `course-reels`.

## When to use

- User says: convert notes / topic / lecture into posts or reels
- User asks to add a new topic or more posts under an existing topic
- Working inside `course-reels/public/content/`

## Output contract

1. **HTML fragments only** (not full documents). No `<html>`, `<head>`, or `<body>`.
2. **One concept per post.** Fit a phone viewport with light scrolling inside the card if needed.
3. Prefer these classes (already styled in the app):

| Class | Use |
|-------|-----|
| `.kicker` | Short uppercase label |
| `h3` | Post headline (concept title) |
| `.callout` | One key takeaway |
| `.chip` / `.chip-row` | Compact tags |
| `.compare` / `.compare-card` | Side-by-side tradeoffs |
| `.stack` | Vertical grouping |
| `pre` / `code` | Short snippets |
| `img` | Diagrams (paths under `public/`) |

4. Keep copy tight: ~40–120 words per post. Use lists over paragraphs.
5. Fix typos from source notes; do not invent facts beyond the source.

## File layout

```
public/content/
  topics.json                          # registry (required)
  topics/<topic-id>/
    posts/
      01-<slug>.html
      02-<slug>.html
      ...
```

- `topic-id`: kebab-case, stable (`p2l5-thread-performance`)
- Post files: zero-padded order prefix + slug (`01-why-threads.html`)
- Post `id` in JSON matches the filename stem without `.html`

## Workflow

Copy this checklist and complete it:

```
Progress:
- [ ] 1. Read source topic
- [ ] 2. Outline 1 concept = 1 post
- [ ] 3. Write HTML posts
- [ ] 4. Register in topics.json
- [ ] 5. Spot-check mobile density
```

### 1. Read the source

Extract a linear teaching sequence. Drop filler. Keep definitions, tradeoffs, architectures, and exam-worthy facts.

### 2. Outline posts

Aim for **8–20 posts** per lecture-sized topic. Split when a screen would need more than ~3 short bullets + one callout.

Title pattern: short noun phrase (`Event-driven pitfalls`, not `In this section we discuss…`).

### 3. Write each HTML file

Template:

```html
<span class="kicker">Label</span>
<h3>One clear concept</h3>
<p>One or two short sentences of context.</p>
<ul>
  <li><strong>Point</strong> — brief detail</li>
  <li><strong>Point</strong> — brief detail</li>
</ul>
<div class="callout">
  <strong>Key:</strong> single memorable takeaway.
</div>
```

For tradeoffs, prefer `.compare` cards. For APIs/pipelines, prefer a short `<pre>` block.

### 4. Register in `topics.json`

**New topic** — append an object:

```json
{
  "id": "p2l4-synchronization",
  "title": "Synchronization",
  "subtitle": "P2L4 · CS-6200",
  "description": "One sentence for the landing card.",
  "accent": "#3d7ea6",
  "posts": [
    {
      "id": "01-mutex-basics",
      "title": "Mutex basics",
      "file": "content/topics/p2l4-synchronization/posts/01-mutex-basics.html"
    }
  ]
}
```

**Existing topic** — append to that topic’s `posts` array and keep `id` / `file` / order in sync.

`file` is relative to `public/` (do not include a leading slash).

Accent: pick a distinct hex per topic (teal, blue, amber, coral — avoid purple-on-white clichés).

### 5. Mobile density check

Reject a post if it has:

- Long paragraphs (> ~3 lines on a phone)
- More than one dense code block
- Multiple unrelated concepts

Split instead of cramming.

## Adding images

1. Put assets in `public/content/topics/<topic-id>/assets/`
2. Reference with `__BASE__` (rewritten to the Vite base at runtime):

```html
<img src="__BASE__content/topics/<topic-id>/assets/diagram.png" alt="Short description" />
```

`/course-reels/...` paths also work and are rewritten for local preview.

## Do not

- Copy entire markdown files into one post
- Emit React/TSX for content (HTML fragments only)
- Change app routing unless the user asks
- Leave orphan HTML files out of `topics.json`

## Example (good vs bad)

**Good:** “Why threads exist” → 3 reasons + one callout about I/O latency.

**Bad:** Entire P2L5 lecture in a single scrollable HTML file.

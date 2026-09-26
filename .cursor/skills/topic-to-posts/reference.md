# Post HTML reference

## Allowed structure

Posts are HTML **fragments** injected into `.post-content`.

```html
<span class="kicker">…</span>
<h3>…</h3>
<p>…</p>
<ul>…</ul>
<ol>…</ol>
<div class="callout">…</div>
<div class="chip-row"><span class="chip">…</span></div>
<div class="compare">
  <div class="compare-card"><h4>…</h4><p>…</p></div>
</div>
<pre>…</pre>
<img src="…" alt="…" />
```

## topics.json schema

```ts
type TopicsIndex = {
  topics: {
    id: string
    title: string
    subtitle: string
    description: string
    accent: string // CSS color
    posts: {
      id: string
      title: string
      file: string // path under public/
    }[]
  }[]
}
```

## Local preview

```bash
npm run dev
```

Open the topic and swipe/scroll through new posts before deploying.

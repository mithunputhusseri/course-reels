# Course Reels

Mobile-friendly React app that turns course topics into TikTok/Instagram-style scrollable posts. Hosted as a **GitHub Pages** static site.

**Live URL (after setup):** https://mithunputhusseri.github.io/course-reels/

## Quick start (local)

```bash
cd course-reels
npm install
npm run dev
```

Open http://localhost:5173/ — pick a topic, swipe/scroll through posts, toggle light/dark.

## Project layout

```
course-reels/
├── public/content/
│   ├── topics.json                 # topic + post registry
│   └── topics/<topic-id>/posts/    # HTML post fragments
├── src/                            # React app
├── .cursor/skills/topic-to-posts/  # Cursor skill: notes → posts
└── .github/workflows/deploy.yml    # builds → pushes gh-pages branch
```

---

## 1. Configure the project

1. Install **Node.js 20+** (LTS) if needed: https://nodejs.org/
2. From this folder:

   ```bash
   npm install
   ```

3. Confirm `vite.config.ts` uses base `/course-reels/` on build (already set for repo name `course-reels`).
4. If you rename the GitHub repo, update:
   - `base` in `vite.config.ts`
   - Image `src` paths in posts (they include `/course-reels/…`)
   - This README’s URLs

---

## 2. Initialize git (already done if you cloned this)

If starting fresh on your machine:

```bash
cd course-reels
git init
git add .
git commit -m "Initial course-reels app with P2L5 sample posts"
git branch -M main
```

---

## 3. Connect to GitHub over SSH

### A. Create an SSH key (once per machine)

```bash
ssh-keygen -t ed25519 -C "your-email@example.com"
```

Press Enter for the default path. Optionally set a passphrase.

Start the agent and add the key (Windows PowerShell):

```powershell
Get-Service ssh-agent | Set-Service -StartupType Manual
Start-Service ssh-agent
ssh-add $env:USERPROFILE\.ssh\id_ed25519
```

Copy the **public** key:

```powershell
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub | Set-Clipboard
```

### B. Add the key on GitHub

1. GitHub → **Settings** → **SSH and GPG keys** → **New SSH key**
2. Paste the public key → Save
3. Test:

   ```bash
   ssh -T git@github.com
   ```

   You should see a greeting for `mithunputhusseri`.

### C. Create the remote repo

1. GitHub → **New repository**
2. Name: `course-reels`
3. Owner: `mithunputhusseri`
4. **Public** (required for free GitHub Pages on user/org sites, or use a private repo with Pages if your plan allows)
5. Do **not** add a README/license (this folder already has content)
6. Create repository

### D. Push over SSH

```bash
cd course-reels
git remote add origin git@github.com:mithunputhusseri/course-reels.git
git push -u origin main
```

---

## 4. GitHub Pages (deploy from a branch)

Same pattern as a `gh-pages` site: build output is published to a **`gh-pages`** branch, and Pages serves that branch.

### One-time Pages settings

1. Repo → **Settings** → **Pages**
2. **Build and deployment** → Source: **Deploy from a branch**
3. Branch: **`gh-pages`** / folder: **`/` (root)** → Save

### How deploys happen

**Automatic (preferred):** push to `main`. The workflow in `.github/workflows/deploy.yml` builds with Vite and force-pushes `dist/` to the `gh-pages` branch.

**Manual (like refinedental’s `npm run deploy`):**

```bash
npm run deploy
```

That runs `predeploy` (build) then `gh-pages -d dist`, which creates/updates the `gh-pages` branch on GitHub.

Then open: https://mithunputhusseri.github.io/course-reels/

If the site 404s:

- Confirm Pages source is **Deploy from a branch** → `gh-pages` / `/ (root)`
- Confirm the `gh-pages` branch exists and has an `index.html`
- Hard-refresh; DNS/CDN can take a minute on first publish

---

## 5. Add a new topic and posts (standard workflow)

### Option A — Ask Cursor (recommended)

In the `course-reels` project, ask:

> Using the **topic-to-posts** skill, convert `../P2L4-class-notes.md` into a new topic with mobile reel posts.

The skill lives at `.cursor/skills/topic-to-posts/SKILL.md`.

### Option B — Manual

1. Create folder:

   ```text
   public/content/topics/<topic-id>/posts/
   ```

2. Add ordered HTML fragments:

   ```text
   01-some-concept.html
   02-next-concept.html
   ```

3. Register everything in `public/content/topics.json`:

   ```json
   {
     "id": "p2l4-synchronization",
     "title": "Synchronization",
     "subtitle": "P2L4 · CS-6200",
     "description": "One-line summary for the landing page.",
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

4. Preview locally (`npm run dev`), then commit and push — the workflow redeploys the `gh-pages` branch.

### Post HTML tip

Posts are **fragments** (no full HTML document). Example:

```html
<span class="kicker">Big idea</span>
<h3>One concept title</h3>
<ul>
  <li><strong>Point</strong> — short detail</li>
</ul>
<div class="callout">
  <strong>Key:</strong> memorable takeaway.
</div>
```

---

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local mobile-friendly preview |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run deploy` | Build and push `dist/` to the `gh-pages` branch |

## Sample content

Topic **Thread Performance (P2L5)** includes 17 one-concept posts adapted from your course notes — browse them from the landing page after `npm run dev`.

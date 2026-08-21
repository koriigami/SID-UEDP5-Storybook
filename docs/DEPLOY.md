# Deploy this Storybook

A step-by-step walkthrough students can follow verbatim to get from the
GitHub repo to a live URL on Vercel with GA4 tracking. Everything below is
free-tier friendly.

---

## 1 · Prerequisites

- A GitHub account (the repo lives at `github.com/<you>/SID-UEDP5-Storybook`).
- A Vercel account. Sign in at [vercel.com](https://vercel.com) with your
  GitHub login — same identity means Vercel can request repo access in one
  click.
- A Google account for Analytics (free).

---

## 2 · Connect GitHub to Vercel (one time)

Only do this once per Vercel account.

1. In Vercel, open your avatar → **Account Settings** → **Login Connections**.
2. If GitHub is not connected, click **Connect** → **Authorize Vercel**.
3. On the GitHub authorization screen, either grant access to **All
   repositories** or pick just this one (`SID-UEDP5-Storybook`). Either
   works — narrower is safer.

You can also install the *Vercel* GitHub App directly from
`github.com/apps/vercel` if that's easier.

---

## 3 · Import the repo as a Vercel Project

1. In the Vercel dashboard, click **Add New… → Project**.
2. In the **Import Git Repository** list, find `SID-UEDP5-Storybook` and
   click **Import**. If it doesn't show up, use the **Adjust GitHub App
   Permissions** link and add it.
3. On the **Configure Project** screen:
   - **Framework Preset**: `Other` — the `vercel.json` in the repo already
     tells Vercel how to build. Do NOT pick "Vite" — Storybook has its own
     build step.
   - **Build & Output settings**: leave the fields empty. Vercel reads
     `buildCommand: "npm run build-storybook"` and
     `outputDirectory: "storybook-static"` from `vercel.json`.
   - **Environment Variables**: click **Add**, name `VITE_GA4_ID`, value
     `G-XXXXXXXXXX` (replace with the real ID from step 4 — you can also
     do this later and redeploy). Apply to **Production, Preview,
     Development**.
4. Click **Deploy**. First build takes ~90 seconds.
5. When it finishes, Vercel prints a URL like
   `sid-uedp5-storybook-<hash>.vercel.app`. That's your live Storybook.

Every push to the tracked branch triggers a new deploy automatically.

---

## 4 · Set up Google Analytics 4

1. Go to [analytics.google.com](https://analytics.google.com), click **Admin**
   in the bottom-left.
2. **Create → Property**. Name it `SID-UEDP5-Storybook`, set your timezone
   and currency, click **Next**, fill the business info, click **Create**.
3. Pick **Web** as the platform.
4. **Website URL**: paste the Vercel URL from step 3. **Stream name**:
   anything. Click **Create stream**.
5. Copy the **Measurement ID** — it looks like `G-XXXXXXXXXX`.

Now put that ID into Vercel:

1. Vercel → your project → **Settings → Environment Variables**.
2. Edit `VITE_GA4_ID` → paste the real `G-XXXXXXXXXX` → save.
3. Trigger a redeploy: **Deployments** tab → the latest one → **…** menu
   → **Redeploy**. Uncheck "Use existing Build Cache" so the new env var
   makes it into the bundle.

To confirm it works: open the live URL in an incognito window, then in GA4
open **Reports → Realtime**. You should see one active user within ~30
seconds.

---

## 5 · Share GA4 access (for the assignment)

Your instructor asked for view-only dashboard access:

1. GA4 → **Admin** → **Account Access Management** (top-left panel).
2. Click the **+** → **Add users**.
3. Email: the instructor's Google address. **Direct roles: Viewer**. Leave
   *Notify by email* on. Click **Add**.

The instructor now sees the property in their GA4 without any edit rights.

---

## 6 · Push a change and watch it deploy

```bash
git switch main
git pull
# make an edit
git add -A
git commit -m "tweak"
git push
```

Vercel picks it up automatically. You'll get an email/notification with
the new URL when the deploy finishes.

---

## Troubleshooting

- **Build failed on Vercel** — open the deploy log, scroll to the first
  red line. 90% of the time it's a Node version mismatch (repo pins Node
  20 in `package.json` `engines`) or a missing env var. Set
  `NODE_VERSION=20` in Environment Variables if the default is older.
- **GA4 shows no data** — check that `VITE_GA4_ID` is applied to
  Production, that you redeployed *without* build cache, and that your
  ad-blocker isn't blocking `googletagmanager.com`. The site should show
  a network request to `google-analytics.com/g/collect` on load.
- **Wrong theme on first paint** — the no-flash script in
  `.storybook/preview-head.html` reads `localStorage.getItem("sb-theme")`.
  If it's still flashing, hard-refresh once so the correct value is set.

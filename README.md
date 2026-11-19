# Ogbanje Abraham — Portfolio

Built with **Next.js** (static export), **Motion** for animation and **Lenis** for smooth scrolling.
`npm run build` produces a plain static site in `out/`, so it still hosts free on GitHub Pages, Netlify or Cloudflare Pages.

```
lib/content.ts        ALL the wording on the site (edit text, links, email, projects, skills here)
lib/motion.ts         animation curves and the card entrance styles
app/globals.css       design (colors and fonts are tokens at the top; glass header is section 4)
app/layout.tsx        page title, SEO tags, fonts
app/page.tsx          section order
components/           one file per section (Hero, About, Projects, Skills, CV, Contact...)
public/photo.jpg      profile photo (replace with another square image of the same name)
public/Ogbanje_Abraham_CV.pdf   your CV (replace with a new PDF of the SAME NAME)
public/robots.txt, public/_headers   search-engine and security-header files
.github/workflows/deploy.yml   builds and publishes to GitHub Pages on every push to main
```

## Run it locally

Needs Node.js 20 or newer.

```
npm install
npm run dev        # live preview at http://localhost:3000
npm run build      # production build into out/
npm start          # preview the built site
```

## Before you publish: checklist

1. **Test the CV buttons** — run `npm run dev`, click **View CV** (opens the PDF in a new tab) and **Download** (saves `Ogbanje_Abraham_CV.pdf`). After publishing, click both again on the live site.
2. **Test the WhatsApp and email links** — click each once to confirm they open the right chat and address. Check the email spelling: it is `creativeuivison@gmail.com`.
3. **Project links** — "ASCII Art Web" and "CampusFlow Next" point at your GitHub profile. Change each to its repository URL in `lib/content.ts`: `https://github.com/abrahamogbanje/REPO-NAME`. The PropBrain AI card links to the sample report because that repository is private; add a source link only if it becomes public (the commented line in `lib/content.ts` shows how).
4. **Live demos** — if a project is hosted, add a "Live demo" link (the comment above the projects list in `lib/content.ts` shows the exact line).
5. **Check every claim** — read the About, Skills and Projects text once and edit anything that is not true to you.

## Updating your CV without breaking the link

The CV is hosted inside this project as `public/Ogbanje_Abraham_CV.pdf`, and both CV buttons point at that file name.

To update it: export your new CV as a PDF, **name it exactly `Ogbanje_Abraham_CV.pdf`**, replace the old file in the `public/` folder and commit. The links on the site, and the one you share (`https://YOUR-SITE-ADDRESS/Ogbanje_Abraham_CV.pdf`), keep working. If you still see the old version, hard-refresh (Ctrl+Shift+R); GitHub Pages can cache files for a few minutes.

Never rename the file or add dates or version numbers to its name, because that would break the links. Your CV already contains a clickable "Portfolio" link; after the site is live, make sure that link matches your real site address, then re-export the PDF and replace the file as above.

If you later buy a custom domain, GitHub Pages redirects the old `github.io` address to it, so CVs you already sent keep working.

## Hosting option A (recommended): GitHub Pages — free

Good fit for a developer portfolio: it shows your GitHub activity, updates with a `git push`, and has free HTTPS.

1. Push this project to the **public** repository `abrahamogbanje.github.io`.
2. Go to **Settings → Pages**. Under "Build and deployment", set **Source** to **GitHub Actions** (not "Deploy from a branch").
3. Every push to `main` now runs `.github/workflows/deploy.yml`, which builds the site and publishes it. Watch progress in the **Actions** tab.
4. After a minute or two the site is live at **https://abrahamogbanje.github.io**.
5. Tick **Enforce HTTPS** on the Pages settings page if it is not already on.

## Hosting option B: Netlify, Vercel or Cloudflare Pages — free

Connect the GitHub repo. Build command: `npm run build`. Publish / output directory: `out`. Netlify and Cloudflare also apply the `_headers` file for you.

## Make it look professional: custom domain

A name like `ogbanjeabraham.com` (or `.dev`) reads better on a CV than a `github.io` address.

1. Buy the domain from a registrar such as Namecheap, Porkbun or Cloudflare. Typical cost is a modest yearly fee.
2. **GitHub Pages:** in Settings → Pages, enter the domain under "Custom domain". At your registrar's DNS settings, add:
   - four `A` records for the root domain (`@`): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - a `CNAME` record for `www` pointing to `abrahamogbanje.github.io`
   (Confirm these values against GitHub's current "Managing a custom domain for your GitHub Pages site" docs before saving.)
3. Wait for DNS to update (minutes to a few hours), then tick **Enforce HTTPS**.
4. Optional: create a matching email such as `hello@yourdomain.com` and use it as the address on the site.

## After it is live

- Set `url` near the top of `lib/content.ts` to your real address (e.g. `https://abrahamogbanje.github.io`). This fills in the `og:url`, `og:image` and canonical tags so link previews on WhatsApp and LinkedIn look right.
- Paste the URL into your GitHub profile, your CV and your LinkedIn.
- Run **Lighthouse** (Chrome DevTools → Lighthouse) on the live site and aim for green scores in Performance, Accessibility and SEO.
- Add the site to **Google Search Console** so Google indexes it.
- Open it on your phone and in both light and dark mode.

## Glass header and animations

The floating frosted header lives in section 4 of `app/globals.css`. Change the `--glass-bg` token (transparency) and the `blur(22px)` value on `.pill` (frost strength); `--orb-a` / `--orb-b` set the soft colors drifting behind the glass. Browsers without `backdrop-filter`, and people who turn on "reduce transparency", automatically get a solid header.

Every project card and skill group has its own entrance (3D rise, iris, sweep, focus, hinge, wipe, drop). They are defined in `lib/motion.ts`; the order is picked by `CARD_ENTRANCES` in `components/Projects.tsx` and `GROUP_ENTRANCES` in `components/Skills.tsx`. People who turn on "reduce motion" in their system settings get a calm version with no intro, smooth scrolling or movement.

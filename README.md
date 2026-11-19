# Ogbanje Abraham — Portfolio

Plain HTML, CSS and JavaScript. No build step, no dependencies.

```
index.html   page content
styles.css   design (colors and fonts are variables at the top; glass effect is section 8)
script.js    menu, theme toggle, small animations
photo.jpg    profile photo (replace with another square image of the same name)
Ogbanje_Abraham_CV.pdf   your CV, linked from the CV section (replace with a new PDF of the SAME NAME)
404.html     "page not found" page
robots.txt   tells search engines they may index the site
_headers     security headers (used by Netlify and Cloudflare Pages; ignored by GitHub Pages)
```

Preview locally: double-click `index.html`, or run `python3 -m http.server 8000` in this folder and open http://localhost:8000.

## Before you publish: checklist

1. **Test the CV buttons** — open `index.html`, click **View CV** (opens the PDF in a new tab) and **Download** (saves `Ogbanje_Abraham_CV.pdf`). After publishing, click both again on the live site.
2. **Test the WhatsApp and email links** — click each once to confirm they open the right chat and address. Check the email spelling: it is `creativeuivison@gmail.com`.
3. **Project links** — "ASCII Art Web" and "CampusFlow Next" point at your GitHub profile. Change each to its repository URL: `https://github.com/abrahamogbanje/REPO-NAME`. The PropBrain AI card links to the sample report because that repository is private; add a source link only if it becomes public (the commented line in the card shows how).
4. **Live demos** — if a project is hosted, add a "Live demo" link (the comment above the first card shows the exact line).
5. **Check every claim** — read the About, Skills and Projects text once and edit anything that is not true to you.

## Updating your CV without breaking the link

The CV is hosted inside this project as `Ogbanje_Abraham_CV.pdf`, and both CV buttons point at that file name.

To update it: export your new CV as a PDF, **name it exactly `Ogbanje_Abraham_CV.pdf`**, replace the old file in the repository and commit. The links on the site, and the one you share (`https://YOUR-SITE-ADDRESS/Ogbanje_Abraham_CV.pdf`), keep working. If you still see the old version, hard-refresh (Ctrl+Shift+R); GitHub Pages can cache files for a few minutes.

Never rename the file or add dates or version numbers to its name, because that would break the links. Your CV already contains a clickable "Portfolio" link; after the site is live, make sure that link matches your real site address, then re-export the PDF and replace the file as above.

If you later buy a custom domain, GitHub Pages redirects the old `github.io` address to it, so CVs you already sent keep working.

## Hosting option A (recommended): GitHub Pages — free

Good fit for a developer portfolio: it shows your GitHub activity, updates with a `git push`, and has free HTTPS.

1. On GitHub, create a **public** repository named exactly `abrahamogbanje.github.io` (your username + `.github.io`).
2. Upload everything in this folder to it (drag and drop in the browser works, or use `git push`).
3. Go to **Settings → Pages**. Under "Build and deployment", choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then Save.
4. After a minute or two the site is live at **https://abrahamogbanje.github.io**.
5. Tick **Enforce HTTPS** on the same page if it is not already on.

Updating later: edit a file, commit, push. The site refreshes in about a minute.

## Hosting option B: Netlify or Cloudflare Pages — free

Both also give free HTTPS and apply the `_headers` file for you. Create an account, choose "Add new site" / "Create a project", and either drag this folder in or connect the GitHub repo. No build command is needed, and the publish directory is the project root.

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

- Uncomment and fill in the `og:url`, `og:image` and `canonical` lines in the `<head>` of `index.html` with your real URL (the image must be a full `https://` address such as `https://YOUR-DOMAIN/photo.jpg`). This makes link previews on WhatsApp and LinkedIn look right.
- Paste the URL into your GitHub profile, your CV and your LinkedIn.
- Run **Lighthouse** (Chrome DevTools → Lighthouse) on the live site and aim for green scores in Performance, Accessibility and SEO.
- Add the site to **Google Search Console** so Google indexes it.
- Open it on your phone and in both light and dark mode.

## Glass effect

The frosted-glass look lives in section 8 at the bottom of `styles.css`. Change `--glass-blur` (frost strength) and `--glass-bg` (transparency) to tune it, and the `--glow-*` / `--orb-*` variables to change the colors behind the glass. Browsers without `backdrop-filter`, and people who enable "reduce transparency", automatically get near-opaque panels.

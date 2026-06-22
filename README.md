<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/astronaut-181e3a?style=for-the-badge&logo=astro&logoColor=white">
    <img src="https://img.shields.io/badge/astronaut-181e3a?style=for-the-badge&logo=astro&logoColor=white">
  </picture>
</p>

<h1 align="center">Shiro's Gallery</h1>

<p align="center">
  A dark, responsive image gallery — built with <a href="https://astro.build">Astro</a>,
  <a href="https://react.dev">React</a>,
  <a href="https://tailwindcss.com">Tailwind CSS v4</a>, and
  <a href="https://ui.shadcn.com">shadcn/ui</a>.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-adding-images">Adding Images</a> •
  <a href="#-customization">Customization</a> •
  <a href="#-deploy-to-github-pages">Deploy</a> •
  <a href="#-tech-stack">Tech Stack</a>
</p>

<div align="center">
  <img src="previews/1.png" alt="Gallery overview" width="310" style="border-radius: 10px; margin: 0 6px;">
  <img src="previews/2.png" alt="Grid view" width="310" style="border-radius: 10px; margin: 0 6px;">
  <img src="previews/3.png" alt="Carousel view" width="310" style="border-radius: 10px; margin: 0 6px;">
</div>

<br>

## ✨ Features

- **5-column responsive grid** with pagination
- **Full-screen carousel** — click any image to browse
- **HEIC → WebP** auto-conversion on build (iPhone photos)
- **Dark blue pastel** palette with subtle noise grain + grid line overlays
- **Double-Bezel** card architecture
- **One-click deploy** to GitHub Pages

<br>

## 🚀 Quick Start

```sh
git clone https://github.com/shiro-devv/shiros-gallery
cd shiros-gallery
npm install
npm run dev
```

Open [localhost:4321](http://localhost:4321) in your browser.

<br>

## 🖼️ Adding Images

Drop your images into `src/assets/`. Supported formats: `jpg`, `jpeg`, `png`, `webp`, `avif`, `heic`, `heif`.

> **HEIC/HEIF** (iPhone photos) auto-convert to WebP when you run `npm run build`.

Preview changes live with `npm run dev`.

<br>

## 🎨 Customization

| What | Where |
|---|---|
| Title & heading | `src/components/GalleryApp.tsx` — search for `Shiro's Gallery` |
| Images per page | `src/components/GalleryApp.tsx` — change `PER_PAGE` |
| Colors | `src/styles/global.css` — edit CSS variables at `:root` |
| Grid columns | `src/components/GalleryApp.tsx` — change `md:grid-cols-5` |
| Noise/grid overlays | `src/styles/global.css` — adjust `.noise-overlay::before` / `::after` opacities |

<br>

## 📦 Deploy to GitHub Pages

Choose the guide that fits your situation.

### I already have a `<username>.github.io` page

Creates the gallery as a separate project hosted at a subpath.

1. Create a new repo on GitHub (e.g. `gallery`, `shiros-gallery`, etc.)
2. Update `base` in [`astro.config.mjs`](astro.config.mjs) to match your repo name:
   ```js
   base: '/your-repo-name/',   // e.g. '/gallery/' or '/shiros-gallery/'
   ```
3. Push to `main`
4. Go to **Settings → Pages → Source**, select **GitHub Actions**
5. The gallery will be live at `https://your-username.github.io/your-repo-name/`

### I'm starting fresh — no GitHub Page yet

Creates the gallery at the root of your personal site.

1. Create a repo named `<your-username>.github.io`
2. Set `base: '/'` in [`astro.config.mjs`](astro.config.mjs) (already the default)
3. Push to `main`
4. Go to **Settings → Pages → Source**, select **GitHub Actions**
5. The gallery will be live at `https://your-username.github.io/`

<br>

## 🧰 Tech Stack

| Tool | Docs |
|---|---|
| [Astro 7](https://astro.build) | [docs.astro.build](https://docs.astro.build) |
| [React 19](https://react.dev) | [react.dev](https://react.dev) |
| [Tailwind CSS v4](https://tailwindcss.com) | [tailwindcss.com](https://tailwindcss.com) |
| [shadcn/ui](https://ui.shadcn.com) | [ui.shadcn.com](https://ui.shadcn.com) |
| [GitHub Pages](https://pages.github.com) | [pages.github.com](https://pages.github.com) |

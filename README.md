# Nazimuddin Alam Thepo — Personal Portfolio

A premium, modern personal portfolio website built with **React + Vite**, **Tailwind CSS**, and **Framer Motion**.

---

## ✨ Features

- ⚡ Vite + React 18 for fast builds
- 🎨 Tailwind CSS with custom design system
- 🎞️ Framer Motion animations throughout
- 🌙 Dark / Light mode toggle (persists in localStorage)
- 📊 Scroll progress indicator
- 🔝 Back-to-top button
- 📬 Contact form via FormSubmit (no account needed)
- 📱 Fully responsive — mobile-first
- 🔍 SEO meta tags

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Opens at **http://localhost:5173**

### 3. Build for production

```bash
npm run build
```

Output goes to the `dist/` folder.

---

## ✏️ Editing Content

All portfolio content lives in one file:

```
src/data/portfolioData.js
```

Edit the exported objects there to update:

- `personal` — name, email, bio, socials
- `skills` — frontend, backend, ML, tools, certifications
- `projects` — all project cards
- `education` — timeline entries
- `mlResearch` — research focus cards
- `softSkills` — soft skill items
- `languages` — language proficiency bars

---

## 📧 Contact Form Setup

The form uses **FormSubmit.co** by default — no account needed.

It sends to the email in `personal.email` in `portfolioData.js`.

On first submission, FormSubmit will send a **confirmation email** to activate the endpoint. Just click the link in that email.

### Optional: Switch to EmailJS

1. Create account at [emailjs.com](https://emailjs.com)
2. Add your service, template, and public key to `src/components/Contact.jsx`
3. Uncomment the EmailJS block and comment out the FormSubmit block

---

## 🚀 Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Or push to GitHub and import in [vercel.com](https://vercel.com).

### Netlify

```bash
npm run build
# drag & drop the dist/ folder to netlify.com/drop
```

Or connect your GitHub repo in Netlify dashboard.

---

## 📁 Project Structure

```
src/
├── components/       # All UI components
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Education.jsx
│   ├── MLResearch.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── ScrollProgress.jsx
│   └── BackToTop.jsx
├── data/
│   └── portfolioData.js   ← EDIT THIS to update content
├── hooks/
│   ├── useTheme.js
│   └── useScrollProgress.js
├── styles/
│   └── index.css
├── App.jsx
└── main.jsx
```

---

## 🎨 Customization

- **Colors** — edit `tailwind.config.js` → `theme.extend.colors`
- **Fonts** — swap Google Fonts in `index.html` and update `tailwind.config.js`
- **Sections** — add/remove sections in `App.jsx`

---

Built by Md. Nazimuddin Alam Thepo · [GitHub](https://github.com/NazimUddinAlamThepo)

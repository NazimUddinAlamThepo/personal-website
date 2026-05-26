# Nazimuddin Alam Thepo — Personal Portfolio

A modern, responsive, and performance-focused personal portfolio website built with React, Vite, Tailwind CSS, and Framer Motion. The portfolio showcases projects, technical skills, research interests, education, and professional achievements in an elegant and interactive interface.

### Live Demo

🔗 https://personal-portfolio-snowy-gamma-73.vercel.app

---

## Overview

This portfolio serves as a central hub for my academic work, software development projects, machine learning research, and professional journey. The website is designed with a clean user experience, smooth animations, and a fully responsive layout to ensure accessibility across all devices.

---

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion

### Additional Tools
- FormSubmit (Contact Form)
- Local Storage (Theme Persistence)
- React Hooks
- Responsive Design Principles

---

## Features

### User Experience
- Responsive design for desktop, tablet, and mobile devices
- Smooth page transitions and scroll animations
- Interactive project showcase
- Scroll progress indicator
- Back-to-top navigation button

### Appearance
- Dark and Light mode support
- Theme preference persistence using localStorage
- Modern glassmorphism-inspired UI elements
- Consistent design system with custom color palette

### Portfolio Sections
- Hero Section
- About Me
- Technical Skills
- Featured Projects
- Education Timeline
- Machine Learning & Research Interests
- Certifications
- Languages
- Contact Section

### Performance & SEO
- Fast loading with Vite
- Optimized component structure
- SEO-friendly meta tags
- Clean and maintainable codebase

---

## Project Structure

```text
src/
├── components/
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
│
├── data/
│   └── portfolioData.js
│
├── hooks/
│   ├── useTheme.js
│   └── useScrollProgress.js
│
├── styles/
│   └── index.css
│
├── App.jsx
└── main.jsx
```

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/NazimUddinAlamThepo/personal-website.git
cd personal-website
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The production-ready files will be generated inside the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## Content Management

All portfolio content is managed from a single source:

```text
src/data/portfolioData.js
```

Update this file to modify:

- Personal Information
- Social Links
- Skills & Technologies
- Certifications
- Projects
- Education History
- Research Interests
- Languages
- Professional Details

This approach makes the portfolio easy to maintain and scale.

---

## Contact Form Configuration

The contact form currently uses **FormSubmit**, allowing visitors to send messages without requiring a backend server.

### Activation

On the first form submission:

1. FormSubmit sends a verification email.
2. Open the email.
3. Click the activation link.
4. The form becomes fully operational.

### Alternative: EmailJS

If preferred, the form can be migrated to EmailJS:

1. Create an account on EmailJS.
2. Create a service and template.
3. Add your credentials to `Contact.jsx`.
4. Replace the FormSubmit implementation with EmailJS.

---

## Customization

### Colors

Modify:

```text
tailwind.config.js
```

```js
theme.extend.colors
```

### Fonts

Update:

```text
index.html
```

and

```text
tailwind.config.js
```

### Sections

Add or remove components directly from:

```text
src/App.jsx
```

---

## Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

Or connect the GitHub repository directly through Vercel.

### Netlify

```bash
npm run build
```

Upload the generated `dist/` folder manually or connect the repository through Netlify.

---

## Future Improvements

- Blog Integration
- Project Filtering System
- Project Search Functionality
- Downloadable Resume
- Multi-language Support
- CMS-based Content Management
- Analytics Dashboard

---

## Author

**Md. Nazimuddin Alam Thepo**

Student, Rajshahi University of Engineering & Technology (RUET)

- GitHub: https://github.com/NazimUddinAlamThepo
- Portfolio: https://personal-portfolio-snowy-gamma-73.vercel.app

---

## License

This project is open-source and available under the MIT License.
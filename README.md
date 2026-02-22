# 🏎️ T V L Bharathwaj — Portfolio

> **Live Site:** [bharathwaj-portfolio.vercel.app](https://bharathwaj-portfolio.vercel.app)

An interactive 3D portfolio built with a Formula 1 theme — featuring a live 3D F1 car, animated backgrounds, and smooth scroll sections.

---

## ✨ Features

- **3D F1 Car** — Interactive Three.js model that fades on scroll
- **Animated Particle Background** — Persistent network of particles across all sections
- **Typewriter Effect** — Cycling roles on the hero section
- **EmailJS Contact Form** — Client-side email sending, no backend required
- **Dynamic Page Titles** — Browser tab updates per section
- **Custom F1 Favicon** — Red F1 car SVG icon
- **Fully Responsive** — Works on all screen sizes

---

## 🛠️ Tech Stack

| Category | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| 3D Rendering | Three.js, React Three Fiber, Drei |
| Animations | Framer Motion |
| Form Validation | Zod |
| Email | EmailJS |
| Styling | Tailwind CSS |
| Deployment | Vercel |

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/Bharathwaj7/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Add environment variables
cp .env.example .env.local
# Fill in your EmailJS keys in .env.local

# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🔑 Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Get these from [emailjs.com](https://emailjs.com).

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout + metadata + favicon
│   └── page.tsx          # Main page + dynamic titles
└── components/
    ├── F1Scene.tsx        # Three.js 3D scene
    ├── F1Car.tsx          # F1 car 3D model
    ├── AnimatedBackground # Particle network canvas
    ├── Navigation.tsx     # Sticky nav
    ├── AboutSection.tsx   # Hero + about
    ├── ProjectsSection.tsx
    ├── ExperienceSection.tsx
    ├── SkillsSection.tsx
    └── ContactSection.tsx # EmailJS form
```

---

## 📬 Contact

**T V L Bharathwaj** — [tvlbharathwaj@gmail.com](mailto:tvlbharathwaj@gmail.com)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tvl-bharathwaj-12a463270/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/Bharathwaj7)
# 🌌 Universe of Me

An interactive 3D portfolio experience where visitors can explore different aspects of your skills and personality through an immersive cosmic journey. Each planet represents a different category (skills, projects, etc.) that users can interact with.

![Preview](https://img.shields.io/badge/Status-Development-yellow) ![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Features

- **3D Interactive Galaxy**: Explore a beautiful 3D space with interactive planets
- **Planet System**: Each planet represents a different category (Frontend, AI, Projects, etc.)
- **Responsive Design**: Works on desktop and mobile devices
- **Modern Tech Stack**: Built with React, Three.js, and TailwindCSS
- **Smooth Animations**: Powered by Framer Motion
- **Dark Mode**: Eye-friendly dark theme with vibrant accents

### New Enhancements
- Cinematic landing page with starfield and glowing CTA
- HUD mini‑map with clickable planets and keyboard navigation (←/→, Enter, Esc)
- Immersive visuals: nebula backdrop, comets, asteroid belt, atmospheric planet glow
- Content modal with tabs (About, Skills, Projects, Contact) and rich media
- Theme modes: Galaxy, Neon Grid, Minimal (toggle in galaxy navbar)
- Adaptive performance: dynamic DPR/events, code‑splitting, vendor chunking
- SEO/OG meta tags and improved ARIA labels

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **3D Graphics**: Three.js + React Three Fiber
- **Styling**: TailwindCSS + Framer Motion
- **Routing**: React Router
- **State Management**: React Context API
- **Icons**: React Icons
- **Linting**: ESLint + Prettier

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/universe-of-me.git
   cd universe-of-me
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_AI_ENDPOINT=https://your-ai-endpoint.example.com  # optional
   VITE_AI_API_KEY=your_ai_api_key                        # optional
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at `http://localhost:3000`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to a GitHub repository
2. Import the repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!
   SPA rewrites are included via `public/vercel.json`.

### Netlify
1. Push your code to a Git repository
2. Create a new site in Netlify and import your repository
3. Set the build command to `npm run build` and publish directory to `dist`
4. Add your environment variables and deploy

## 🪐 Project Structure

```
universe-of-me/
├── public/              # Static files
│   ├── planets/         # Planet textures
│   └── models/          # 3D models
├── src/
│   ├── assets/          # Images, SVGs, etc.
│   ├── components/      # Reusable components
│   ├── pages/           # Page components
│   ├── scenes/          # 3D scenes
│   ├── services/        # API and services
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Entry point
├── .env.example         # Environment variables example
├── index.html           # Main HTML file
├── package.json         # Project dependencies
├── tailwind.config.js   # TailwindCSS config
└── vite.config.ts       # Vite config
```

## 🎨 Customization

1. **Planets**
   - Add/remove planets in `src/pages/Galaxy.tsx`
   - Customize planet data in `src/pages/Planet.tsx`

2. **Styling**
   - Update colors in `tailwind.config.js`
   - Customize global styles in `src/index.css`

3. **Content**
   - Update planet content in `src/pages/Planet.tsx`
   - Add new components in `src/components/`

## ⌨️ Keyboard Controls
- Arrow Left/Right: cycle planets
- Enter: open selected planet
- Escape: close planet/modal

## 🎛 Theming
- Toggle between Galaxy, Neon Grid, and Minimal in the galaxy navbar.
- Root classes applied: `theme-galaxy` (default), `theme-neon`, `theme-minimal`.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Three.js](https://threejs.org/) - 3D library
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) - React renderer for Three.js
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework

---

Made with ❤️ and ☕ by ARTAS YASKAR

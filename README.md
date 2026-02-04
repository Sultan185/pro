# Mohamed Ashraf Sultan - Portfolio

A modern, high-end portfolio website built with Next.js, React, Tailwind CSS, and Framer Motion.

## Features

- 🎨 Modern glassmorphism design with terminal-style aesthetics
- ⚡ Built with Next.js 14 and React 18
- 🎭 Smooth animations with Framer Motion
- 💅 Styled with Tailwind CSS
- 📱 Fully responsive design
- 🌟 Custom glow effects and hover animations
- 🎯 TypeScript for type safety

## Tech Stack

- **Framework:** Next.js 14
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Outfit, JetBrains Mono

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
portfolio/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── tailwind.config.js
├── next.config.js
├── tsconfig.json
└── package.json
```

## Customization

### Colors

Edit the colors in `tailwind.config.js`:

```js
colors: {
  primary: '#ff6b00',    // Orange
  dark: '#0a0a0a',       // Deep dark background
  'dark-light': '#1a1a1a', // Slightly lighter dark
}
```

### Content

Edit your personal information in `app/page.tsx`:

- Name and title in the Hero section
- Projects in the `projects` array
- Experience badges in the `experiences` array
- Tech stack in the Tech Stack terminal
- Social media links in the footer

## Performance

- Server-side rendering with Next.js
- Optimized animations with Framer Motion
- Tree-shaking with ES modules
- Automatic code splitting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this for your own portfolio!

## Author

**Mohamed Ashraf Sultan**

- Backend Architect | Laravel Expert

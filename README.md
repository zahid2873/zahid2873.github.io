# My Portfolio

Built with **React + Vite + Tailwind CSS + Motion (Framer Motion)**.

## Run it

```bash
cd D:\portfolio
npm install      # only the first time
npm run dev      # opens at http://localhost:5173 and reloads on every save
```

## Edit your content

**Everything is in `src/data.js`**: name, roles, about text, stats, skills, projects, experience, contact.
You don't need to touch the components to update the content.

- Photo, CV and project screenshots go in the `public/` folder (e.g. `public/profile.jpg`,
  `public/resume.pdf`). Then set `photo: "profile.jpg"` in `data.js`.
- Main colors: `--color-accent` and `--color-accent-2` in `src/index.css`.
- The old plain-HTML version is kept in `old-static/`.

## Adding animations (Motion cheat sheet)

Change any tag to its `motion.` version and give it props:

```jsx
import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0, y: 50 }}        // starting state
  animate={{ opacity: 1, y: 0 }}          // animate on page load
  whileInView={{ opacity: 1, y: 0 }}      // ...or when scrolled into view
  whileHover={{ scale: 1.1, rotate: 3 }}  // on mouse hover
  whileTap={{ scale: 0.9 }}               // on click
  transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
/>
```

The simplest option: wrap anything in `<Reveal>` (from `src/components/Reveal.jsx`) to make it fade in when scrolled into view.

```jsx
<Reveal delay={0.2}>
  <p>I appear smoothly!</p>
</Reveal>
```

Docs and examples: https://motion.dev/docs/react

### Animations already in the site
| Where | Effect |
|---|---|
| Top of page | Scroll progress bar |
| Navbar | Slides in, underline glides between links, animated mobile menu |
| Hero | Staggered text entrance, rotating role words, floating blobs, morphing photo |
| About | Numbers count up |
| Skills | Cards rise in, tags pop in one by one |
| Projects | 3D tilt on mouse move, sliding filter pill, smooth re-layout when filtering |
| Experience | Timeline line draws as you scroll |
| Contact | Fade-ins, button press, success message |

## Contact form (optional)

By default the form opens the visitor's email app. To receive messages straight to your inbox,
create a free form at https://formspree.io and post the form data to its URL inside `onSubmit` in
`src/components/Contact.jsx`.

## Put it online for free

```bash
npm run build    # creates the "dist" folder
```

- **Netlify (simplest):** drag the `dist` folder onto https://app.netlify.com/drop
- **Vercel:** import your GitHub repo at https://vercel.com (it detects Vite automatically)
- **GitHub Pages:** upload the contents of `dist` to a repo named `your-username.github.io`

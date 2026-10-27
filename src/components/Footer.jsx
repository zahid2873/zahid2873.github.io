import { profile } from "../data.js";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-7 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4">
        <p>
          © {new Date().getFullYear()} {profile.name}. Crafted like an app with React & Motion.
        </p>
        <div className="flex gap-5">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener" className="hover:text-accent">
              {s.label}
            </a>
          ))}
          <a href="#home" className="hover:text-accent">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}

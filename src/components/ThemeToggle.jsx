import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg border border-primary-black/10 dark:border-primary-white/10 hover:bg-primary-black/5 dark:hover:bg-primary-white/5 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="size-5 md:size-6.5 text-primary-orange" />
      ) : (
        <Moon className="size-5 md:size-6.5 text-primary-black" />
      )}
    </button>
  );
}

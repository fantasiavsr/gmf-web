import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-primary-white dark:bg-primary-dark-bg text-primary-black dark:text-primary-white font-sans selection:bg-primary-orange selection:text-primary-white transition-colors flex flex-col">
      <Navbar
        title="Error"
        links={[{ key: "home", label: "Home", path: "/" }]}
      />

      <div className="pt-28 flex-1 flex items-center justify-center px-8">
        <div className="text-center md:max-w-2xl">
          {/* Error Code */}
          <div className="mb-8">
            <p className="text-8xl md:text-9xl font-bold text-primary-orange mb-4">
              404
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50">
              Page Not Found
            </p>
          </div>

          {/* Message */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-primary-black dark:text-primary-white">
            Oops, we couldn't find that page.
          </h1>
          <p className="text-lg md:text-xl text-primary-black/60 dark:text-primary-white/60 mb-12 font-light leading-relaxed">
            The page you're looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-orange text-primary-white hover:bg-primary-black dark:hover:bg-primary-white dark:hover:text-primary-black transition-all duration-700 font-medium"
            >
              <Home size={18} />
              Go Home
            </button>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-primary-black/20 dark:border-primary-white/20 text-primary-black dark:text-primary-white hover:border-primary-black dark:hover:border-primary-white transition-all duration-700 font-medium"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>

          {/* Decorative element */}
          <div className="mt-20 py-12 border-t border-primary-black/10 dark:border-primary-white/10">
            <p className="text-sm text-primary-black/40 dark:text-primary-white/40">
              Error Code: 404 | Not Found
            </p>
          </div>
        </div>
      </div>

      <Footer page="error" />
    </main>
  );
}

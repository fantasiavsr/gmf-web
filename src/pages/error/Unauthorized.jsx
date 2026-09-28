import { ShieldOff, Lock, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Unauthorized() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-primary-white dark:bg-primary-dark-bg text-primary-black dark:text-primary-white font-sans selection:bg-primary-orange selection:text-primary-white transition-colors flex flex-col">
      <Navbar
        title="Error"
        links={[{ key: "home", label: "Home", path: "/" }]}
      />

      <div className="pt-28 flex-1 flex items-center justify-center px-8">
        <div className="text-center md:max-w-2xl">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-black/5 dark:bg-primary-white/5 mb-6">
              <ShieldOff size={48} className="text-primary-orange" />
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50">
              Access Denied
            </p>
          </div>

          {/* Message */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-primary-black dark:text-primary-white">
            You're not authorized to view this.
          </h1>
          <p className="text-lg md:text-xl text-primary-black/60 dark:text-primary-white/60 mb-12 font-light leading-relaxed">
            It looks like you don't have permission to access this page. You may
            need to sign in or contact an administrator for access.
          </p>

          {/* Locked badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-black/10 dark:border-primary-white/10 mb-10">
            <Lock
              size={16}
              className="text-primary-black/40 dark:text-primary-white/40"
            />
            <span className="text-sm text-primary-black/50 dark:text-primary-white/50">
              Restricted Content
            </span>
          </div>

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
              Error Code: 403 | Unauthorized
            </p>
          </div>
        </div>
      </div>

      <Footer page="error" />
    </main>
  );
}

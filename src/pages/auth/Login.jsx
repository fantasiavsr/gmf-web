import { useState } from "react";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { login as loginApi } from "../../services/api/auth";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await loginApi({ email, password });
      login(response.token, response.user);
      navigate("/dashboard");
    } catch (err) {
      const validation = Object.values(err.errors || {})
        .flat()
        .join(" ");
      setError(validation || err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="pt-20 min-h-screen bg-primary-white dark:bg-primary-dark-bg text-primary-black dark:text-primary-white font-sans selection:bg-primary-orange selection:text-primary-white transition-colors flex flex-col">
      <Navbar
        title="Login"
        links={[{ key: "home", label: "Home", path: "/" }]}
      />

      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-primary-black dark:text-primary-white">
              Welcome back.
            </h1>
            <p className="text-lg text-primary-black/60 dark:text-primary-white/60">
              Sign in to your account to continue.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300">
              {error}
              <button onClick={() => setError("")} className="ml-3 underline">
                Dismiss
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-primary-black dark:text-primary-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-black/40 dark:text-primary-white/40"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card text-primary-black dark:text-primary-white placeholder:text-primary-black/30 dark:placeholder:text-primary-white/30 focus:outline-none focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/20 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-primary-black dark:text-primary-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-black/40 dark:text-primary-white/40"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-lg border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card text-primary-black dark:text-primary-white placeholder:text-primary-black/30 dark:placeholder:text-primary-white/30 focus:outline-none focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/20 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary-black/40 dark:text-primary-white/40 hover:text-primary-orange transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-primary-orange hover:text-primary-black dark:hover:text-primary-white transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary-orange text-primary-white font-medium hover:bg-primary-black dark:hover:bg-primary-white dark:hover:text-primary-black transition-all duration-700  disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-primary-black/10 dark:bg-primary-white/10"></div>
            <span className="text-sm text-primary-black/40 dark:text-primary-white/40">
              or
            </span>
            <div className="flex-1 h-px bg-primary-black/10 dark:bg-primary-white/10"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-primary-black/60 dark:text-primary-white/60">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-primary-orange hover:text-primary-black dark:hover:text-primary-white font-medium transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>

      <Footer page="auth" />
    </main>
  );
}

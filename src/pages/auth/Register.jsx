import { useState } from "react";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { register as registerApi } from "../../services/api/auth";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const response = await registerApi({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });
      login(response.token, response.user);
      navigate("/dashboard");
    } catch (err) {
      const validation = Object.values(err.errors || {})
        .flat()
        .join(" ");
      setError(validation || err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="pt-20 min-h-screen bg-primary-white dark:bg-primary-dark-bg text-primary-black dark:text-primary-white font-sans selection:bg-primary-orange selection:text-primary-white transition-colors flex flex-col">
      <Navbar
        title="Sign Up"
        links={[{ key: "home", label: "Home", path: "/" }]}
      />

      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-primary-black dark:text-primary-white">
              Create account.
            </h1>
            <p className="text-lg text-primary-black/60 dark:text-primary-white/60">
              Join us and start your journey today.
            </p>
          </div>

          {/* Form */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Input */}
            <div>
              <label className="block text-sm font-medium text-primary-black dark:text-primary-white mb-2">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-black/40 dark:text-primary-white/40"
                />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card text-primary-black dark:text-primary-white placeholder:text-primary-black/30 dark:placeholder:text-primary-white/30 focus:outline-none focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/20 transition-all"
                  required
                />
              </div>
            </div>

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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium text-primary-black dark:text-primary-white mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-black/40 dark:text-primary-white/40"
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-lg border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card text-primary-black dark:text-primary-white placeholder:text-primary-black/30 dark:placeholder:text-primary-white/30 focus:outline-none focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/20 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary-black/40 dark:text-primary-white/40 hover:text-primary-orange transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-primary-black/20 dark:border-primary-white/20 text-primary-orange focus:ring-2 focus:ring-primary-orange/20 cursor-pointer"
                required
              />
              <label
                htmlFor="terms"
                className="text-sm text-primary-black/60 dark:text-primary-white/60 cursor-pointer"
              >
                I agree to the{" "}
                <button
                  type="button"
                  className="text-primary-orange hover:text-primary-black dark:hover:text-primary-white transition-colors"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  className="text-primary-orange hover:text-primary-black dark:hover:text-primary-white transition-colors"
                >
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !agreeToTerms}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary-orange text-primary-white font-medium hover:bg-primary-black dark:hover:bg-primary-white dark:hover:text-primary-black transition-all duration-700  disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating account..." : "Create Account"}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-8 text-center text-sm text-primary-black/60 dark:text-primary-white/60">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary-orange hover:text-primary-black dark:hover:text-primary-white font-medium transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>

      <Footer page="auth" />
    </main>
  );
}

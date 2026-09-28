import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <main className="pt-20 min-h-screen bg-primary-white dark:bg-primary-dark-bg text-primary-black dark:text-primary-white font-sans selection:bg-primary-orange selection:text-primary-white transition-colors flex flex-col">
      <Navbar
        title="Reset Password"
        links={[{ key: "home", label: "Home", path: "/" }]}
      />

      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-3 text-primary-black dark:text-primary-white">
                  Reset your password.
                </h1>
                <p className="text-lg text-primary-black/60 dark:text-primary-white/60">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary-orange text-primary-white font-medium hover:bg-primary-black dark:hover:bg-primary-white dark:hover:text-primary-black transition-all duration-700 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending link..." : "Send Reset Link"}
                  {!isLoading && <ArrowRight size={18} />}
                </button>
              </form>

              {/* Back to Sign In */}
              <button
                onClick={() => navigate("/login")}
                className="mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-primary-black/20 dark:border-primary-white/20 text-primary-black dark:text-primary-white font-medium hover:border-primary-orange hover:text-primary-orange transition-all"
              >
                <ArrowLeft size={18} />
                Back to Sign In
              </button>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center">
                <div className="mb-8 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary-orange/20 flex items-center justify-center">
                    <CheckCircle2 size={48} className="text-primary-orange" />
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-black dark:text-primary-white">
                  Check your email.
                </h2>

                <p className="text-lg text-primary-black/60 dark:text-primary-white/60 mb-8">
                  We've sent a password reset link to{" "}
                  <span className="font-medium text-primary-orange">
                    {email}
                  </span>
                  . Click the link to reset your password.
                </p>

                <div className="p-4 rounded-lg bg-primary-black/5 dark:bg-primary-white/5 border border-primary-black/10 dark:border-primary-white/10 mb-8">
                  <p className="text-sm text-primary-black/60 dark:text-primary-white/60">
                    Didn't receive the email? Check your spam folder or{" "}
                    <button
                      onClick={() => {
                        setEmail("");
                        setIsSubmitted(false);
                      }}
                      className="text-primary-orange hover:text-primary-black dark:hover:text-primary-white transition-colors"
                    >
                      try again
                    </button>
                  </p>
                </div>

                {/* Back to Sign In */}
                <button
                  onClick={() => navigate("/login")}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary-orange text-primary-white font-medium hover:bg-primary-black dark:hover:bg-primary-white dark:hover:text-primary-black transition-all duration-700 hover:scale-105"
                >
                  <ArrowLeft size={18} />
                  Back to Sign In
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer page="auth" />
    </main>
  );
}

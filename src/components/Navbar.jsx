import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ title, links }) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isDark = theme === "dark";
  const [show, setShow] = useState(true);
  const disableHide =
    location.pathname === "/dashboard" ||
    location.pathname.startsWith("/dashboard/") ||
    location.pathname === "/dashboard2" ||
    location.pathname.startsWith("/dashboard2/");
  const [lastY, setLastY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(null);

  const isAuthPage = ["/login", "/register", "/forgot-password"].includes(
    location.pathname,
  );

  const { isAuthenticated, logout: logoutUser } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  useEffect(() => {
    if (disableHide) return;
    const onScroll = () => {
      const y = window.scrollY;
      setShow(window.innerWidth >= 768 ? y < lastY || y < 80 : true);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY, disableHide]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-16 py-4 md:py-2 bg-primary-white/95 dark:bg-primary-dark-bg/95 backdrop-blur-sm border-b border-primary-black/10 dark:border-primary-white/10 transition-all duration-500 ease-out ${disableHide || show ? "translate-y-0" : "-translate-y-full"}`}
    >
      <button
        onClick={() => navigate("/")}
        className="navbar-logo-button hidden items-center gap-2 text-xs md:text-sm font-medium tracking-tight text-primary-black dark:text-primary-white hover:text-primary-orange transition-smooth"
      >
        <img
          src={isDark ? "/gmf dark.svg" : "/gmf light.svg"}
          alt="gmf logo"
          className="h-10 md:h-14 w-auto object-contain"
        />
      </button>
      <div className="flex items-center gap-3 md:gap-6">
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="hidden md:flex gap-4 md:gap-6 text-sm md:text-base text-primary-black/70 dark:text-primary-white/70">
          {links.map((l) => {
            const linkPath = l.path || `/${l.key}`;
            const isActive = location.pathname === linkPath;
            const hasSubLinks = l.subLinks && l.subLinks.length > 0;

            return (
              <div
                key={l.key}
                className="relative"
                onMouseEnter={() => setOpenDropdown(l.key)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => navigate(linkPath)}
                  className={`transition-smooth text-left flex items-center gap-1 ${
                    isActive
                      ? "text-primary-orange font-medium"
                      : "hover:text-primary-orange"
                  }`}
                >
                  {l.label}
                  {hasSubLinks && (
                    <ChevronDown
                      size={12}
                      className={`transition-transform ${
                        openDropdown === l.key ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Dropdown below this nav item */}
                {hasSubLinks && openDropdown === l.key && (
                  <div
                    className="absolute left-0 top-full pt-2 bg-primary-white dark:bg-primary-dark-card rounded-lg border border-primary-black/10 dark:border-primary-white/10 shadow-xl z-40 min-w-56"
                    onMouseEnter={() => setOpenDropdown(l.key)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {l.subLinks.map((sub, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          navigate(sub.path);
                          setOpenDropdown(null);
                        }}
                        className="block w-full text-left px-4 py-2.5 text-sm text-primary-black dark:text-primary-white hover:text-primary-orange hover:bg-primary-black/5 dark:hover:bg-primary-white/5 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {!isAuthPage && (
          <>
            <button
              onClick={() => navigate("/dashboard")}
              className="hidden md:inline-flex px-4 py-2 rounded-lg border border-primary-black/10 dark:border-primary-white/10 hover:bg-primary-black/5 dark:hover:bg-primary-white/5 text-sm md:text-base font-medium text-primary-black dark:text-primary-white transition-colors"
            >
              Dashboard
            </button>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="hidden md:inline-flex px-4 py-2 rounded-lg border border-primary-orange/75 dark:border-primary-white/50 hover:bg-primary-black/5 dark:hover:bg-primary-white/5 text-sm md:text-base font-medium text-primary-black dark:text-primary-white transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="hidden md:inline-flex px-4 py-2 rounded-lg border border-primary-orange/75 dark:border-primary-white/50 hover:bg-primary-black/5 dark:hover:bg-primary-white/5 text-sm md:text-base font-medium text-primary-black dark:text-primary-white transition-colors"
              >
                Login
              </button>
            )}
          </>
        )}
        <ThemeToggle />
        {mobileOpen && (
          <div
            className="absolute top-full left-0 right-0 bg-primary-white dark:bg-primary-dark-card border-b border-primary-white/10 px-6 py-6 flex flex-col gap-4 md:hidden z-50 shadow-2xl backdrop-blur-xl"
            style={{ animation: "curtainReveal 0.35s ease-out" }}
          >
            {links.map((l, i) => {
              const linkPath = l.path || `/${l.key}`;
              const isActive = location.pathname === linkPath;
              return (
                <button
                  key={l.key}
                  onClick={() => {
                    navigate(linkPath);
                    setMobileOpen(false);
                  }}
                  className={`text-lg font-medium transition-smooth text-left py-1 ${
                    isActive
                      ? "text-primary-orange font-bold"
                      : "text-primary-black dark:text-primary-white hover:text-primary-orange"
                  }`}
                  style={{
                    animation: "staggerReveal 0.3s ease-out forwards",
                    animationDelay: `${i * 0.05}s`,
                    opacity: 0,
                  }}
                >
                  {l.label}
                </button>
              );
            })}
            <button
              onClick={() => {
                navigate("/dashboard");
                setMobileOpen(false);
              }}
              className="text-lg font-medium text-primary-black dark:text-primary-white hover:text-primary-orange transition-smooth text-left py-1"
              style={{
                animation: "staggerReveal 0.3s ease-out forwards",
                animationDelay: `${links.length * 0.05}s`,
                opacity: 0,
              }}
            >
              Dashboard
            </button>
            {!isAuthPage &&
              (isAuthenticated ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="text-lg font-medium text-primary-black dark:text-primary-white hover:text-primary-orange transition-smooth text-left py-1"
                  style={{
                    animation: "staggerReveal 0.3s ease-out forwards",
                    animationDelay: `${links.length * 0.05}s`,
                    opacity: 0,
                  }}
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                    setMobileOpen(false);
                  }}
                  className="text-lg font-medium text-primary-black dark:text-primary-white hover:text-primary-orange transition-smooth text-left py-1"
                  style={{
                    animation: "staggerReveal 0.3s ease-out forwards",
                    animationDelay: `${links.length * 0.05}s`,
                    opacity: 0,
                  }}
                >
                  Login
                </button>
              ))}
          </div>
        )}
      </div>
    </nav>
  );
}

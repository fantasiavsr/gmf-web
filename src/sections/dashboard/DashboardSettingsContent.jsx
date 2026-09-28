import { useState } from "react";
import { Download, Languages, Mail, Settings } from "lucide-react";
import ThemeToggle from "../../components/ThemeToggle";

export default function DashboardSettingsContent() {
  const [language, setLanguage] = useState("English");
  const [exportFormat, setExportFormat] = useState("CSV");
  const [includeDescriptions, setIncludeDescriptions] = useState(true);
  const [saveMessage, setSaveMessage] = useState("");

  const handleSavePreferences = () => {
    setSaveMessage("Preferences saved for this session");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary-black dark:text-primary-white">
              Settings
            </h1>
            <p className="text-sm text-primary-black/60 dark:text-primary-white/60 mt-2">
              Adjust your account and application preferences
            </p>
          </div>
          <Settings
            size={28}
            strokeWidth={1.5}
            className="text-primary-orange"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-primary-white dark:bg-primary-dark-card rounded-xl border border-primary-black/10 dark:border-primary-white/10 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary-black/5 dark:bg-primary-white/5">
                <Settings
                  size={20}
                  strokeWidth={1.5}
                  className="text-primary-black dark:text-primary-white"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary-black dark:text-primary-white">
                  Appearance & Language
                </h2>
                <p className="text-xs text-primary-black/50 dark:text-primary-white/50 mt-1">
                  Customize how the dashboard looks and reads.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4 py-3 border-b border-primary-black/5 dark:border-primary-white/5">
                <div>
                  <p className="text-sm font-medium text-primary-black dark:text-primary-white">
                    Theme
                  </p>
                  <p className="text-xs text-primary-black/50 dark:text-primary-white/50 mt-1">
                    Switch between light and dark mode.
                  </p>
                </div>
                <ThemeToggle />
              </div>

              <div>
                <label className="block text-xs font-medium text-primary-black/60 dark:text-primary-white/60 mb-1.5 uppercase tracking-wider">
                  Language
                </label>
                <div className="relative">
                  <Languages
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-black/40 dark:text-primary-white/40"
                  />
                  <select
                    value={language}
                    onChange={(event) => setLanguage(event.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card text-primary-black dark:text-primary-white text-sm focus:outline-none focus:border-primary-orange focus:ring-1 focus:ring-primary-orange/20 transition-all"
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
                <p className="text-xs text-primary-black/40 dark:text-primary-white/40 mt-2">
                  Language preferences will be applied across the dashboard
                  later.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <section className="bg-primary-white dark:bg-primary-dark-card rounded-xl border border-primary-black/10 dark:border-primary-white/10 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary-sage/30 dark:bg-primary-sage/20">
                <Download
                  size={20}
                  strokeWidth={1.5}
                  className="text-primary-sage-strong"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary-black dark:text-primary-white">
                  Data Export
                </h2>
                <p className="text-xs text-primary-black/50 dark:text-primary-white/50 mt-1">
                  Choose your preferred export options.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-primary-black/60 dark:text-primary-white/60 mb-1.5">
                  Export format
                </label>
                <select
                  value={exportFormat}
                  onChange={(event) => setExportFormat(event.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card text-primary-black dark:text-primary-white text-sm focus:outline-none focus:border-primary-orange focus:ring-1 focus:ring-primary-orange/20 transition-all"
                >
                  <option>CSV</option>
                  <option>JSON</option>
                  <option>PDF</option>
                </select>
              </div>
              <label className="flex items-start gap-3 text-sm text-primary-black dark:text-primary-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeDescriptions}
                  onChange={(event) =>
                    setIncludeDescriptions(event.target.checked)
                  }
                  className="mt-0.5 h-4 w-4 accent-primary-orange"
                />
                <span>
                  <span className="font-medium">Include descriptions</span>
                  <span className="block text-xs text-primary-black/50 dark:text-primary-white/50 mt-1">
                    Include longer descriptions in exported records.
                  </span>
                </span>
              </label>
              <button
                onClick={handleSavePreferences}
                className="w-full px-4 py-2 rounded-lg bg-primary-orange text-primary-white font-medium hover:bg-primary-orange-strong transition-colors flex items-center justify-center gap-2"
              >
                <Download size={16} /> Save Export Preferences
              </button>
            </div>
          </section>

          <section className="bg-primary-white dark:bg-primary-dark-card rounded-xl border border-primary-black/10 dark:border-primary-white/10 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary-orange/10 dark:bg-primary-orange/20">
                <Mail
                  size={20}
                  strokeWidth={1.5}
                  className="text-primary-orange-strong"
                />
              </div>
              <h2 className="text-xl font-bold text-primary-black dark:text-primary-white">
                Contact Admin
              </h2>
            </div>
            <p className="text-sm text-primary-black/60 dark:text-primary-white/60 mb-5">
              Need help with your dashboard or account? Contact the Atelier
              support team.
            </p>
            <a
              href="mailto:abc@atelier.com"
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg border border-primary-orange/50 text-primary-orange-strong font-medium hover:bg-primary-orange/10 transition-colors"
            >
              <Mail size={16} /> Contact Support
            </a>
          </section>
        </div>
      </div>

      {saveMessage && (
        <div className="mt-6 p-3 rounded-lg text-sm font-medium bg-primary-sage-strong/20 text-primary-sage-strong">
          {saveMessage}
        </div>
      )}
    </div>
  );
}

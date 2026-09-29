import React, { useState } from "react";
import {
  Search,
  CheckCircle,
  AlertCircle,
  Lock,
  AlertTriangle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { certificateDataSource } from "../../services/data";
import { NavLinks } from "../../data/exampleData";

if (typeof window !== "undefined") {
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  }
}

function formatCertificateLabel(value) {
  return String(value)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function formatCertificateValue(value) {
  if (value === null || value === undefined || value === "") {
    return "Not provided";
  }
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  return String(value);
}

function renderCertificateRows(value, path = "certificate") {
  const entries = Array.isArray(value)
    ? value.map((entry, index) => [`entry-${index + 1}`, entry])
    : Object.entries(value ?? {});

  if (entries.length === 0) {
    return (
      <tr key={path}>
        <td
          colSpan={2}
          className="px-4 py-3 text-sm text-primary-black/50 dark:text-primary-white/50"
        >
          No values recorded
        </td>
      </tr>
    );
  }

  return entries.flatMap(([key, entry], index) => {
    const label = Array.isArray(value)
      ? `Entry ${index + 1}`
      : formatCertificateLabel(key);
    const rowPath = `${path}.${key}`;

    if (entry !== null && typeof entry === "object") {
      return [
        <tr key={`${rowPath}-heading`}>
          <th
            colSpan={2}
            className="bg-primary-black/5 px-4 py-3 text-left font-semibold text-primary-black dark:bg-primary-white/5 dark:text-primary-white"
          >
            {label}
          </th>
        </tr>,
        ...renderCertificateRows(entry, rowPath),
      ];
    }

    return (
      <tr key={rowPath}>
        <th
          scope="row"
          className="w-1/3 px-4 py-3 text-left align-top font-medium text-primary-black/70 dark:text-primary-white/70"
        >
          {label}
        </th>
        <td className="whitespace-pre-wrap wrap-break-word px-4 py-3 text-primary-black dark:text-primary-white">
          {formatCertificateValue(entry)}
        </td>
      </tr>
    );
  });
}

export default function CertificateVerificationPage() {
  const { user, isAuthenticated } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [usingMockData, setUsingMockData] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) {
      setError(
        "Please enter a certificate number or welder identification number",
      );
      return;
    }

    setLoading(true);
    setError(null);
    setCertificates([]);
    setSelectedCertificate(null);
    setShowDetails(false);
    setUsingMockData(false);

    try {
      const isCertificateNo = searchInput.includes("/");
      let matches;

      if (isCertificateNo) {
        const result = await certificateDataSource.getPreview(
          searchInput.trim(),
        );
        matches = result.certificate ? [result.certificate] : [];
        setUsingMockData(Boolean(result.isMockData));
      } else {
        const result = await certificateDataSource.getByWelderId(
          searchInput.trim(),
        );
        matches = result.certificates;
        setUsingMockData(Boolean(result.isMockData));
      }

      if (matches.length === 0) {
        setError("No certificates found for this search");
      } else {
        setCertificates(matches);
        setSelectedCertificate({ ...matches[0], isPreview: true });
      }
    } catch (err) {
      console.error("❌ Error searching for certificate:", err);
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (cert) => {
    if (!isAuthenticated) {
      setError("You must be logged in to view full certificate details");
      return;
    }

    if (!cert.certificate_no) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await certificateDataSource.getDetail(
        cert.certificate_no,
      );

      if (response.certificate) {
        if (
          response.isMockData &&
          user?.role !== "admin" &&
          String(response.certificate.user_id) !== String(user?.id)
        ) {
          setSelectedCertificate((prev) => ({
            ...prev,
            accessDenied: true,
          }));
          setError(
            "You do not have access to view this certificate. Please contact your administrator.",
          );
          return;
        }

        setUsingMockData((current) => current || Boolean(response.isMockData));
        setSelectedCertificate({
          ...response.certificate,
          isPreview: false,
          isOwner:
            response.certificate.user_id === user?.id || user?.role === "admin",
        });
        setShowDetails(true);
      } else {
        setError("Unable to retrieve full certificate details");
      }
    } catch (err) {
      if (err.status === 403) {
        setSelectedCertificate((prev) => ({
          ...prev,
          accessDenied: true,
        }));
        setError(
          "You do not have access to view this certificate. Please contact your administrator.",
        );
      } else {
        setError("Error retrieving certificate details");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-primary-white dark:bg-primary-dark-bg text-primary-black dark:text-primary-white font-sans selection:bg-primary-orange selection:text-primary-white transition-colors">
      <Navbar title="GMF Training Center" links={NavLinks} />

      {/* Header Section */}
      <section className="pt-36 pb-10 px-8 md:px-16 md:max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary-black dark:text-primary-white">
              Check Certificate
            </h1>
            <p className="text-sm text-primary-black/60 dark:text-primary-white/60 mt-2">
              Verify welder qualification certificates and view test records
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="pt-0 pb-20 px-8 md:px-16 md:max-w-7xl mx-auto">
        {usingMockData && (
          <div className="mb-8 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
            <AlertTriangle
              className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
              size={20}
            />
            <p className="text-sm text-amber-800 dark:text-amber-300">
              The backend is unavailable. Showing local sample certificate data.
            </p>
          </div>
        )}

        {/* Search Form */}
        <div className="bg-primary-white dark:bg-primary-dark-card rounded-lg shadow-sm p-8 mb-12">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-black dark:text-primary-white mb-3">
                Search by Certificate Number or Welder ID
              </label>
              <div className="flex gap-2 flex-col sm:flex-row">
                <input
                  type="text"
                  placeholder="e.g., GMF/WQT/AWS/0612 or GMF-533"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="flex-1 px-4 py-3 border border-primary-black/20 dark:border-primary-white/20 rounded-lg bg-primary-white dark:bg-primary-dark-bg text-primary-black dark:text-primary-white placeholder-primary-black/40 dark:placeholder-primary-white/40 focus:outline-none focus:ring-2 focus:ring-primary-orange"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-primary-orange text-primary-white rounded-lg hover:bg-primary-orange/90 disabled:bg-primary-orange/50 transition-colors flex items-center justify-center gap-2 font-medium whitespace-nowrap"
                >
                  <Search size={18} />
                  Search
                </button>
              </div>
              <p className="text-xs text-primary-black/50 dark:text-primary-white/50 mt-3">
                Certificate Format: GMF/WQT/AWS/0612 | Welder ID Format: GMF-533
              </p>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8 flex gap-3">
            <AlertCircle
              className="text-red-600 dark:text-red-400 shrink-0 mt-0.5"
              size={20}
            />
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-primary-white dark:bg-primary-dark-card rounded-lg shadow-sm p-12 text-center">
            <div className="inline-block">
              <div className="animate-spin">
                <div className="h-8 w-8 border-4 border-primary-orange border-t-transparent rounded-full"></div>
              </div>
            </div>
            <p className="mt-4 text-primary-black/60 dark:text-primary-white/60">
              Searching for certificate...
            </p>
          </div>
        )}

        {/* Search Results List */}
        {certificates.length > 1 && !showDetails && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary-black dark:text-primary-white mb-6">
              Found {certificates.length} Certificates
            </h2>
            <div className="space-y-3">
              {certificates.map((cert) => (
                <button
                  key={cert.certificate_no}
                  onClick={() => {
                    setSelectedCertificate({
                      ...cert,
                      isPreview: true,
                    });
                  }}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedCertificate?.certificate_no === cert.certificate_no
                      ? "border-primary-orange bg-primary-orange/5"
                      : "border-primary-black/10 dark:border-primary-white/10 hover:border-primary-orange"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle
                      className="text-green-600 dark:text-green-400 shrink-0 mt-1"
                      size={20}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-primary-black dark:text-primary-white">
                        {cert.certificate_no}
                      </p>
                      <p className="text-sm text-primary-black/60 dark:text-primary-white/60">
                        {cert.welder_name} •{" "}
                        {new Date(cert.test_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Certificate Preview */}
        {selectedCertificate && !showDetails && (
          <div className="mb-12">
            <div className="bg-primary-white dark:bg-primary-dark-card rounded-lg shadow-sm p-8">
              <div className="flex items-start gap-4 mb-8">
                <CheckCircle
                  className="text-green-600 dark:text-green-400 shrink-0 mt-1"
                  size={24}
                />
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-primary-black dark:text-primary-white mb-2">
                    Certificate Found
                  </h2>
                  <p className="text-primary-black/60 dark:text-primary-white/60">
                    This certificate has been verified in our system
                  </p>
                </div>
              </div>

              {/* Certificate Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="text-xs font-medium text-primary-black/60 dark:text-primary-white/60 uppercase tracking-wider mb-2 block">
                    Certificate Number
                  </label>
                  <p className="text-lg font-semibold text-primary-black dark:text-primary-white">
                    {selectedCertificate.certificate_no}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-primary-black/60 dark:text-primary-white/60 uppercase tracking-wider mb-2 block">
                    Welder Name
                  </label>
                  <p className="text-lg font-semibold text-primary-black dark:text-primary-white">
                    {selectedCertificate.welder_name}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-primary-black/60 dark:text-primary-white/60 uppercase tracking-wider mb-2 block">
                    Welder ID
                  </label>
                  <p className="text-lg font-semibold text-primary-black dark:text-primary-white">
                    {selectedCertificate.welder_identification_no}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-primary-black/60 dark:text-primary-white/60 uppercase tracking-wider mb-2 block">
                    Certificate Type
                  </label>
                  <p className="text-lg font-semibold text-primary-black dark:text-primary-white">
                    {selectedCertificate.type}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-primary-black/60 dark:text-primary-white/60 uppercase tracking-wider mb-2 block">
                    Test Date
                  </label>
                  <p className="text-lg font-semibold text-primary-black dark:text-primary-white">
                    {new Date(
                      selectedCertificate.test_date,
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-primary-black/60 dark:text-primary-white/60 uppercase tracking-wider mb-2 block">
                    Status
                  </label>
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {selectedCertificate.status.charAt(0).toUpperCase() +
                      selectedCertificate.status.slice(1)}
                  </p>
                </div>
              </div>

              {/* Access Info */}
              {isAuthenticated ? (
                <button
                  onClick={() => handleViewDetails(selectedCertificate)}
                  disabled={loading || selectedCertificate.accessDenied}
                  className="w-full px-6 py-3 bg-primary-orange text-primary-white rounded-lg hover:bg-primary-orange/90 disabled:bg-primary-orange/50 transition-colors font-medium"
                >
                  {selectedCertificate.accessDenied
                    ? "Access Denied"
                    : "View Full Details"}
                </button>
              ) : (
                <div className="bg-primary-orange/10 border border-primary-orange/30 rounded-lg p-6 flex gap-4">
                  <Lock
                    className="text-primary-orange shrink-0 mt-1"
                    size={20}
                  />
                  <div>
                    <p className="font-medium text-primary-orange mb-3">
                      Log in to view full certificate details
                    </p>
                    <a
                      href="/login"
                      className="inline-block px-4 py-2 bg-primary-orange text-primary-white rounded hover:bg-primary-orange/90 transition-colors text-sm font-medium"
                    >
                      Log In
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Full Certificate Details */}
        {selectedCertificate && showDetails && (
          <div className="mb-12">
            <div className="bg-primary-white dark:bg-primary-dark-card rounded-lg shadow-sm p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-primary-black dark:text-primary-white mb-2">
                  Certificate Details
                </h2>
                <p className="text-primary-black/60 dark:text-primary-white/60">
                  Welder Qualification Test Record (WQT)
                </p>
              </div>

              {/* Basic Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-primary-black dark:text-primary-white mb-4">
                    Complete Certificate Record
                  </h3>
                  <div className="overflow-x-auto border-y border-primary-black/10 dark:border-primary-white/10">
                    <table className="w-full min-w-120 border-collapse text-sm">
                      <tbody className="divide-y divide-primary-black/10 dark:divide-primary-white/10">
                        {renderCertificateRows(
                          Object.fromEntries(
                            Object.entries(selectedCertificate).filter(
                              ([key]) =>
                                ![
                                  "isPreview",
                                  "isOwner",
                                  "accessDenied",
                                ].includes(key),
                            ),
                          ),
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Back Button */}
                <div className="pt-4 border-t border-primary-black/10 dark:border-primary-white/10">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="w-full px-6 py-3 bg-primary-black/10 dark:bg-primary-white/10 text-primary-black dark:text-primary-white rounded-lg hover:bg-primary-black/20 dark:hover:bg-primary-white/20 transition-colors font-medium"
                  >
                    Back to Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer page="certificate" />
    </main>
  );
}

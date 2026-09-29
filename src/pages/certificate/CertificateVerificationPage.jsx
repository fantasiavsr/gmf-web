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
  if (typeof value === "object") {
    return "[Complex Data]";
  }
  return String(value);
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

              {/* Certificate Info - Simple Fields Only */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    label: "Certificate Number",
                    value: selectedCertificate.certificate_no,
                  },
                  {
                    label: "Welder Name",
                    value: selectedCertificate.welder_name,
                  },
                  {
                    label: "Welder ID",
                    value: selectedCertificate.welder_identification_no,
                  },
                  {
                    label: "Certificate Type",
                    value: selectedCertificate.type,
                  },
                  {
                    label: "Test Date",
                    value: new Date(
                      selectedCertificate.test_date,
                    ).toLocaleDateString(),
                  },
                  {
                    label: "Status",
                    value:
                      selectedCertificate.status.charAt(0).toUpperCase() +
                      selectedCertificate.status.slice(1),
                    isStatus: true,
                  },
                  {
                    label: "Issue Date",
                    value:
                      selectedCertificate.issue_date &&
                      new Date(
                        selectedCertificate.issue_date,
                      ).toLocaleDateString(),
                  },
                ].map(
                  (field) =>
                    field.value && (
                      <div key={field.label}>
                        <label className="text-xs font-medium text-primary-black/60 dark:text-primary-white/60 uppercase tracking-wider mb-2 block">
                          {field.label}
                        </label>
                        <p
                          className={`text-lg font-semibold ${
                            field.isStatus
                              ? "text-green-600 dark:text-green-400"
                              : "text-primary-black dark:text-primary-white"
                          }`}
                        >
                          {field.value}
                        </p>
                      </div>
                    ),
                )}
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
                  <div className="flex-1">
                    <p className="font-medium text-primary-orange mb-3">
                      Log in to view full certificate details
                    </p>
                    <div className="flex gap-2 flex-col sm:flex-row">
                      <a
                        href="/login"
                        className="inline-block px-4 py-2 bg-primary-orange text-primary-white rounded hover:bg-primary-orange/90 transition-colors text-sm font-medium"
                      >
                        Log In
                      </a>
                      {usingMockData && (
                        <button
                          onClick={() => setShowDetails(true)}
                          className="inline-block px-4 py-2 bg-primary-white dark:bg-primary-dark-card text-primary-orange rounded hover:bg-primary-white/90 transition-colors text-sm font-medium border border-primary-orange"
                        >
                          Preview Mock Data
                        </button>
                      )}
                    </div>
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
                  Welder Qualification Test Record (WQT)
                </h2>
              </div>

              <div className="space-y-8">
                {/* 1. Certificate Information - Compact Grid */}
                <div>
                  <h3 className="text-lg font-semibold text-primary-black dark:text-primary-white mb-4">
                    Certificate Information
                  </h3>
                  <div className="space-y-3">
                    {/* First row: Certificate No, Issue Date, Test Date, Type */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs font-medium text-primary-black/60 dark:text-primary-white/60 uppercase tracking-wider mb-1">
                          Certificate No.
                        </p>
                        <p className="text-sm font-semibold text-primary-black dark:text-primary-white">
                          {selectedCertificate.certificate_no || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-primary-black/60 dark:text-primary-white/60 uppercase tracking-wider mb-1">
                          Issue Date
                        </p>
                        <p className="text-sm font-semibold text-primary-black dark:text-primary-white">
                          {selectedCertificate.issue_date
                            ? new Date(
                                selectedCertificate.issue_date,
                              ).toLocaleDateString()
                            : "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-primary-black/60 dark:text-primary-white/60 uppercase tracking-wider mb-1">
                          Date Test
                        </p>
                        <p className="text-sm font-semibold text-primary-black dark:text-primary-white">
                          {selectedCertificate.test_date
                            ? new Date(
                                selectedCertificate.test_date,
                              ).toLocaleDateString()
                            : "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-primary-black/60 dark:text-primary-white/60 uppercase tracking-wider mb-1">
                          Type of Welder
                        </p>
                        <p className="text-sm font-semibold text-primary-black dark:text-primary-white">
                          {selectedCertificate.data?.welder_type
                            ? formatCertificateLabel(
                                selectedCertificate.data.welder_type,
                              )
                            : "-"}
                        </p>
                      </div>
                    </div>
                    {/* Second row: Welder Name, ID, WPS No, Rev */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs font-medium text-primary-black/60 dark:text-primary-white/60 uppercase tracking-wider mb-1">
                          Welder Name
                        </p>
                        <p className="text-sm font-semibold text-primary-black dark:text-primary-white">
                          {selectedCertificate.welder_name || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-primary-black/60 dark:text-primary-white/60 uppercase tracking-wider mb-1">
                          Identification No.
                        </p>
                        <p className="text-sm font-semibold text-primary-black dark:text-primary-white">
                          {selectedCertificate.welder_identification_no || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-primary-black/60 dark:text-primary-white/60 uppercase tracking-wider mb-1">
                          WPS No.
                        </p>
                        <p className="text-sm font-semibold text-primary-black dark:text-primary-white">
                          {selectedCertificate.data?.wps_no || "-"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-primary-black/60 dark:text-primary-white/60 uppercase tracking-wider mb-1">
                          Rev.
                        </p>
                        <p className="text-sm font-semibold text-primary-black dark:text-primary-white">
                          {selectedCertificate.data?.wps_revision || "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Qualification Table - Main Table */}
                {selectedCertificate.data?.qualification && (
                  <div>
                    <h3 className="text-lg font-semibold text-primary-black dark:text-primary-white mb-4">
                      Qualification
                    </h3>
                    <div className="overflow-x-auto border border-primary-black/10 dark:border-primary-white/10 rounded-lg">
                      <table className="w-full border-collapse text-xs md:text-sm">
                        <thead>
                          <tr className="bg-primary-black/5 dark:bg-primary-white/5">
                            <th className="px-3 py-2 text-left font-semibold text-primary-black dark:text-primary-white border-b border-primary-black/10 dark:border-primary-white/10">
                              Variables
                            </th>
                            <th className="px-3 py-2 text-left font-semibold text-primary-black dark:text-primary-white border-b border-primary-black/10 dark:border-primary-white/10">
                              Record Actual
                            </th>
                            <th className="px-3 py-2 text-left font-semibold text-primary-black dark:text-primary-white border-b border-primary-black/10 dark:border-primary-white/10">
                              Qualification Range
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-primary-black/10 dark:divide-primary-white/10">
                          {/* Simple rows */}
                          {[
                            ["Process / Type", "process_type"],
                            ["Electrode", "electrode"],
                            ["Current / Polarity", "current_polarity"],
                            ["Position", "position"],
                            ["Welding Progression", "welding_progression"],
                            ["Backing", "backing"],
                            [
                              "Material / Specification",
                              "material_specification",
                            ],
                            ["Base Metal", "base_metal"],
                          ].map(([label, key]) => (
                            <tr key={key}>
                              <td className="px-3 py-2 font-medium text-primary-black dark:text-primary-white">
                                {label}
                              </td>
                              <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                                {selectedCertificate.data.qualification[key]
                                  ?.actual || "-"}
                              </td>
                              <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                                {selectedCertificate.data.qualification[key]
                                  ?.qualification || "-"}
                              </td>
                            </tr>
                          ))}

                          {/* Thickness Plate Group */}
                          <tr className="bg-primary-black/2 dark:bg-primary-white/5">
                            <td className="px-3 py-2 font-semibold text-primary-black dark:text-primary-white">
                              Thickness Plate
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              {selectedCertificate.data.qualification
                                .thickness_plate?.actual || "-"}
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              {selectedCertificate.data.qualification
                                .thickness_plate?.qualification || "-"}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 pl-6 text-primary-black dark:text-primary-white">
                              ↳ Fillet
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              {selectedCertificate.data.qualification
                                .thickness_plate_fillet?.actual || "-"}
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              {selectedCertificate.data.qualification
                                .thickness_plate_fillet?.qualification || "-"}
                            </td>
                          </tr>

                          {/* Thickness Pipe Group */}
                          <tr className="bg-primary-black/2 dark:bg-primary-white/5">
                            <td className="px-3 py-2 font-semibold text-primary-black dark:text-primary-white">
                              Thickness Pipe
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              —
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              —
                            </td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 pl-6 text-primary-black dark:text-primary-white">
                              ↳ Groove
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              {selectedCertificate.data.qualification
                                .thickness_pipe_groove?.actual || "-"}
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              {selectedCertificate.data.qualification
                                .thickness_pipe_groove?.qualification || "-"}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 pl-6 text-primary-black dark:text-primary-white">
                              ↳ Fillet
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              {selectedCertificate.data.qualification
                                .thickness_pipe_fillet?.actual || "-"}
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              {selectedCertificate.data.qualification
                                .thickness_pipe_fillet?.qualification || "-"}
                            </td>
                          </tr>

                          {/* Diameter Pipe Group */}
                          <tr className="bg-primary-black/2 dark:bg-primary-white/5">
                            <td className="px-3 py-2 font-semibold text-primary-black dark:text-primary-white">
                              Diameter Pipe
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              —
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              —
                            </td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 pl-6 text-primary-black dark:text-primary-white">
                              ↳ Groove
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              {selectedCertificate.data.qualification
                                .diameter_pipe_groove?.actual || "-"}
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              {selectedCertificate.data.qualification
                                .diameter_pipe_groove?.qualification || "-"}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 pl-6 text-primary-black dark:text-primary-white">
                              ↳ Fillet
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              {selectedCertificate.data.qualification
                                .diameter_pipe_fillet?.actual || "-"}
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              {selectedCertificate.data.qualification
                                .diameter_pipe_fillet?.qualification || "-"}
                            </td>
                          </tr>

                          {/* Filler Metal Group */}
                          <tr className="bg-primary-black/2 dark:bg-primary-white/5">
                            <td className="px-3 py-2 font-semibold text-primary-black dark:text-primary-white">
                              Filler Metal
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              —
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              —
                            </td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 pl-6 text-primary-black dark:text-primary-white">
                              ↳ Spec.
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              {selectedCertificate.data.qualification
                                .filler_metal_spec?.actual || "-"}
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              {selectedCertificate.data.qualification
                                .filler_metal_spec?.qualification || "-"}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 pl-6 text-primary-black dark:text-primary-white">
                              ↳ AWS Class
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              {selectedCertificate.data.qualification
                                .filler_metal_aws_class?.actual || "-"}
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              {selectedCertificate.data.qualification
                                .filler_metal_aws_class?.qualification || "-"}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 pl-6 text-primary-black dark:text-primary-white">
                              ↳ F No.
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              {selectedCertificate.data.qualification
                                .filler_metal_f_no?.actual || "-"}
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              {selectedCertificate.data.qualification
                                .filler_metal_f_no?.qualification || "-"}
                            </td>
                          </tr>

                          {/* Gas / Flux and Others */}
                          <tr>
                            <td className="px-3 py-2 font-medium text-primary-black dark:text-primary-white">
                              Gas / Flux Type
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              {selectedCertificate.data.qualification
                                .gas_flux_type?.actual || "-"}
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              {selectedCertificate.data.qualification
                                .gas_flux_type?.qualification || "-"}
                            </td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2 font-medium text-primary-black dark:text-primary-white">
                              Others
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              {selectedCertificate.data.qualification.others
                                ?.actual || "-"}
                            </td>
                            <td className="px-3 py-2 text-primary-black dark:text-primary-white">
                              {selectedCertificate.data.qualification.others
                                ?.qualification || "-"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 3. Small Test Sections - Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Visual Examination */}
                  {selectedCertificate.data?.visual_examination && (
                    <div>
                      <h3 className="text-md font-semibold text-primary-black dark:text-primary-white mb-3">
                        Visual Examination
                      </h3>
                      <div className="border border-primary-black/10 dark:border-primary-white/10 rounded-lg overflow-hidden">
                        <div className="flex justify-between items-center px-4 py-3 bg-primary-black/2 dark:bg-primary-white/5 border-b border-primary-black/10 dark:border-primary-white/10">
                          <span className="font-medium text-primary-black/70 dark:text-primary-white/70">
                            Complete Weld Result
                          </span>
                          <span className="font-semibold text-primary-black dark:text-primary-white">
                            {selectedCertificate.data.visual_examination
                              .complete_weld_result || "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mechanical Test */}
                  {selectedCertificate.data?.mechanical_test && (
                    <div>
                      <h3 className="text-md font-semibold text-primary-black dark:text-primary-white mb-3">
                        Mechanical Test
                      </h3>
                      <div className="border border-primary-black/10 dark:border-primary-white/10 rounded-lg divide-y divide-primary-black/10 dark:divide-primary-white/10 overflow-hidden">
                        <div className="flex justify-between items-start px-4 py-3 bg-primary-black/2 dark:bg-primary-white/5">
                          <span className="font-medium text-primary-black/70 dark:text-primary-white/70">
                            Conducted By
                          </span>
                          <span className="font-semibold text-primary-black dark:text-primary-white text-right">
                            {selectedCertificate.data.mechanical_test
                              .conducted_by || "-"}
                          </span>
                        </div>
                        <div className="flex justify-between items-start px-4 py-3">
                          <span className="font-medium text-primary-black/70 dark:text-primary-white/70">
                            Lab Test No.
                          </span>
                          <span className="font-semibold text-primary-black dark:text-primary-white text-right max-w-xs">
                            {selectedCertificate.data.mechanical_test
                              .lab_test_no || "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Guide Bend and Ultrasonic Tests - Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Guide Bend Test */}
                  {selectedCertificate.data?.guide_bend && (
                    <div>
                      <h3 className="text-md font-semibold text-primary-black dark:text-primary-white mb-3">
                        Guide Bend Test
                      </h3>
                      <div className="border border-primary-black/10 dark:border-primary-white/10 rounded-lg divide-y divide-primary-black/10 dark:divide-primary-white/10 overflow-hidden">
                        {[
                          { label: "SB 1/3G", key: "sb_1_3g" },
                          { label: "SB 2/3G", key: "sb_2_3g" },
                          { label: "SB 1/4G", key: "sb_1_4g" },
                          { label: "SB 2/4G", key: "sb_2_4g" },
                        ].map((item, idx) => (
                          <div
                            key={item.key}
                            className={`flex justify-between items-center px-4 py-2 ${
                              idx % 2 === 0
                                ? "bg-primary-black/2 dark:bg-primary-white/5"
                                : ""
                            }`}
                          >
                            <span className="font-medium text-primary-black/70 dark:text-primary-white/70 text-sm">
                              {item.label}
                            </span>
                            <span className="font-semibold text-primary-black dark:text-primary-white text-sm">
                              {selectedCertificate.data.guide_bend[item.key] ||
                                "-"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Ultrasonic Test */}
                  {selectedCertificate.data?.ultrasonic_test && (
                    <div>
                      <h3 className="text-md font-semibold text-primary-black dark:text-primary-white mb-3">
                        Ultrasonic Test
                      </h3>
                      <div className="border border-primary-black/10 dark:border-primary-white/10 rounded-lg divide-y divide-primary-black/10 dark:divide-primary-white/10 overflow-hidden">
                        {[
                          { label: "Report No.", key: "report_no" },
                          { label: "Technician", key: "technician" },
                          { label: "Results", key: "results" },
                          { label: "Company", key: "company" },
                        ].map((item, idx) => (
                          <div
                            key={item.key}
                            className={`flex justify-between items-start px-4 py-2 ${
                              idx % 2 === 0
                                ? "bg-primary-black/2 dark:bg-primary-white/5"
                                : ""
                            }`}
                          >
                            <span className="font-medium text-primary-black/70 dark:text-primary-white/70 text-sm">
                              {item.label}
                            </span>
                            <span className="font-semibold text-primary-black dark:text-primary-white text-sm text-right max-w-xs">
                              {selectedCertificate.data.ultrasonic_test[
                                item.key
                              ] || "-"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. Welding Supervision and Organization - Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Welding Supervision */}
                  {selectedCertificate.data?.supervision && (
                    <div>
                      <h3 className="text-md font-semibold text-primary-black dark:text-primary-white mb-3">
                        Welding Supervision
                      </h3>
                      <div className="border border-primary-black/10 dark:border-primary-white/10 rounded-lg divide-y divide-primary-black/10 dark:divide-primary-white/10 overflow-hidden">
                        <div className="flex justify-between items-start px-4 py-3 bg-primary-black/2 dark:bg-primary-white/5">
                          <span className="font-medium text-primary-black/70 dark:text-primary-white/70 text-sm">
                            Supervised By
                          </span>
                          <span className="font-semibold text-primary-black dark:text-primary-white text-sm text-right">
                            {selectedCertificate.data.supervision
                              .welding_supervised_by || "-"}
                          </span>
                        </div>
                        <div className="flex justify-between items-start px-4 py-3">
                          <span className="font-medium text-primary-black/70 dark:text-primary-white/70 text-sm">
                            Company
                          </span>
                          <span className="font-semibold text-primary-black dark:text-primary-white text-sm text-right">
                            {selectedCertificate.data.supervision.company ||
                              "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Organization */}
                  {selectedCertificate.data?.organizations &&
                    Array.isArray(selectedCertificate.data.organizations) && (
                      <div>
                        <h3 className="text-md font-semibold text-primary-black dark:text-primary-white mb-3">
                          Organization
                        </h3>
                        <div className="border border-primary-black/10 dark:border-primary-white/10 rounded-lg overflow-hidden">
                          <div className="bg-primary-black/2 dark:bg-primary-white/5 border-b border-primary-black/10 dark:border-primary-white/10 grid grid-cols-2">
                            <div className="px-3 py-2 font-medium text-primary-black/70 dark:text-primary-white/70 text-xs uppercase tracking-wider">
                              Organization
                            </div>
                            <div className="px-3 py-2 font-medium text-primary-black/70 dark:text-primary-white/70 text-xs uppercase tracking-wider border-l border-primary-black/10 dark:border-primary-white/10">
                              Signed By
                            </div>
                          </div>
                          <div className="divide-y divide-primary-black/10 dark:divide-primary-white/10">
                            {selectedCertificate.data.organizations.map(
                              (org, idx) => (
                                <div key={idx} className="grid grid-cols-2">
                                  <div
                                    className={`px-3 py-2 text-sm ${idx % 2 === 0 ? "bg-primary-black/2 dark:bg-primary-white/5" : ""}`}
                                  >
                                    {org.name || "-"}
                                  </div>
                                  <div
                                    className={`px-3 py-2 text-sm border-l border-primary-black/10 dark:border-primary-white/10 ${
                                      idx % 2 === 0
                                        ? "bg-primary-black/2 dark:bg-primary-white/5"
                                        : ""
                                    }`}
                                  >
                                    {org.signed_by || "-"}
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    )}
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

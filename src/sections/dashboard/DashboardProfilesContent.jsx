import { useState, useEffect } from "react";
import {
  User,
  Shield,
  Eye,
  EyeOff,
  Check,
  Lock,
  Mail,
  MapPin,
  Phone,
  Save,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getUser,
  updateProfile,
  changePassword,
} from "../../services/api/auth";
import { MockProfile } from "../../data/exampleData";
import { useAuth } from "../../context/AuthContext";
import MockDataWarning from "../../components/feedback/MockDataWarning";

export default function DashboardProfilesContent() {
  const { user: authUser, updateUser } = useAuth();

  const [profile, setProfile] = useState({
    fullName: MockProfile.name,
    email: MockProfile.email,
    phone: MockProfile.phone,
    address: MockProfile.address,
    city: MockProfile.city,
    country: MockProfile.country,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [usingMockData, setUsingMockData] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ msg: "", type: "" });
  const [initialProfile, setInitialProfile] = useState(null);

  const [security, setSecurity] = useState({
    currentPass: "",
    newPass: "",
    confirmPass: "",
    showCurrent: false,
    showNew: false,
    showConfirm: false,
    strength: 0,
  });

  const [securityStatus, setSecurityStatus] = useState({ msg: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUser();
        const userData = response.user;
        const profileData = {
          fullName: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.address || "",
          city: userData.city || "",
          country: userData.country || "",
        };
        setProfile(profileData);
        setInitialProfile(profileData);
        setUsingMockData(false);
        setIsLoading(false);
      } catch (err) {
        console.log("Using mock data - not authenticated or API unavailable");
        // Use mock data as fallback - matches pattern of other dashboard pages
        const mockProfileData = {
          fullName: MockProfile.name,
          email: MockProfile.email,
          phone: MockProfile.phone,
          address: MockProfile.address,
          city: MockProfile.city,
          country: MockProfile.country,
        };
        setProfile(mockProfileData);
        setInitialProfile(mockProfileData);
        setUsingMockData(true);
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleProfileSave = async () => {
    setSaveStatus({ msg: "Saving...", type: "info" });
    try {
      const response = await updateProfile({
        name: profile.fullName,
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        country: profile.country,
      });
      const updatedUser = response.user;
      const updatedProfile = {
        fullName: updatedUser.name || "",
        email: updatedUser.email || "",
        phone: updatedUser.phone || "",
        address: updatedUser.address || "",
        city: updatedUser.city || "",
        country: updatedUser.country || "",
      };
      setProfile(updatedProfile);
      setInitialProfile(updatedProfile);
      updateUser(updatedUser);
      setSaveStatus({ msg: "Profile updated successfully", type: "success" });
      setEditMode(false);
      setTimeout(() => setSaveStatus({ msg: "", type: "" }), 3000);
    } catch (err) {
      const validation = Object.values(err.errors || {})
        .flat()
        .join(" ");
      setSaveStatus({
        msg:
          validation ||
          err.message ||
          "Failed to save profile. Please login to update your profile.",
        type: "error",
      });
    }
  };

  const handlePasswordChange = async () => {
    setSecurityStatus({ msg: "Validating...", type: "info" });

    if (!security.currentPass) {
      setSecurityStatus({ msg: "Current password is required", type: "error" });
      return;
    }
    if (security.newPass.length < 8) {
      setSecurityStatus({
        msg: "Password must be at least 8 characters",
        type: "error",
      });
      return;
    }
    if (security.newPass !== security.confirmPass) {
      setSecurityStatus({ msg: "Passwords do not match", type: "error" });
      return;
    }

    try {
      await changePassword({
        current_password: security.currentPass,
        new_password: security.newPass,
        new_password_confirmation: security.confirmPass,
      });
      setSecurityStatus({
        msg: "Password changed successfully",
        type: "success",
      });
      setSecurity({
        ...security,
        currentPass: "",
        newPass: "",
        confirmPass: "",
        strength: 0,
      });
      setTimeout(() => setSecurityStatus({ msg: "", type: "" }), 3000);
    } catch (err) {
      const validation = Object.values(err.errors || {})
        .flat()
        .join(" ");
      setSecurityStatus({
        msg:
          validation ||
          err.message ||
          "Failed to change password. Please login to update your password.",
        type: "error",
      });
    }
  };

  const computeStrength = (pwd) => {
    let s = 0;
    if (pwd.length >= 8) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[0-9]/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return s;
  };

  const barColor = (s) =>
    s >= 3
      ? "bg-primary-orange-strong"
      : s >= 2
        ? "bg-primary-purple-strong"
        : s >= 1
          ? "bg-primary_sage-strong"
          : "bg-primary-black/20";

  if (isLoading) {
    return (
      <div className="min-h-screen text-primary-black dark:text-primary-white font-sans transition-colors flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-orange mx-auto mb-4"></div>
          <p className="text-primary-black/60 dark:text-primary-white/60">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {usingMockData && <MockDataWarning />}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Profile Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Section */}
          <section className="bg-primary-white dark:bg-primary-dark-card rounded-xl border border-primary-black/10 dark:border-primary-white/10 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary-black/5 dark:bg-primary-white/5">
                  <User
                    size={20}
                    strokeWidth={1.5}
                    className="text-primary-black dark:text-primary-white"
                  />
                </div>
                <h2 className="text-xl font-bold text-primary-black dark:text-primary-white">
                  Profile Information
                </h2>
              </div>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="text-sm font-medium text-primary-orange-strong hover:text-primary-orange transition-colors"
                >
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setProfile(initialProfile);
                    }}
                    className="text-xs px-3 py-1.5 rounded-full border border-primary-black/10 dark:border-primary-white/10 text-primary-black/60 dark:text-primary-white/60 hover:text-primary-black dark:hover:text-primary-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleProfileSave}
                    className="text-xs px-3 py-1.5 rounded-full bg-primary-orange text-white hover:bg-primary-orange-strong transition-colors flex items-center gap-1"
                  >
                    <Save size={14} /> Save
                  </button>
                </div>
              )}
            </div>

            {saveStatus.msg && (
              <div
                className={`mb-4 p-3 rounded-lg text-sm font-medium ${saveStatus.type === "success" ? "bg-primary-sage-strong/20 text-primary-sage-strong" : saveStatus.type === "error" ? "bg-red-100 text-red-600 dark:text-red-400" : "bg-primary-black/5 dark:bg-primary-white/5 text-primary-black dark:text-primary-white"}`}
              >
                {saveStatus.msg}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {[
                { label: "Full Name", key: "fullName", type: "text" },
                { label: "Email Address", key: "email", type: "email" },
                { label: "Phone Number", key: "phone", type: "tel" },
                {
                  label: "Street Address",
                  key: "address",
                  type: "text",
                  full: true,
                },
                { label: "City", key: "city", type: "text" },
                { label: "Country", key: "country", type: "text" },
              ].map((field) => (
                <div
                  key={field.key}
                  className={field.full ? "md:col-span-2" : ""}
                >
                  <label className="block text-xs font-medium text-primary-black/60 dark:text-primary-white/60 mb-1.5 uppercase tracking-wider">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={profile[field.key]}
                    onChange={(e) =>
                      setProfile({ ...profile, [field.key]: e.target.value })
                    }
                    disabled={!editMode}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all ${
                      editMode
                        ? "border-primary-black/20 dark:border-primary-white/20 bg-primary-white dark:bg-primary-dark-card text-primary-black dark:text-primary-white focus:outline-none focus:border-primary-orange focus:ring-1 focus:ring-primary-orange/20"
                        : "border-transparent bg-primary-black/3 dark:bg-primary-white/3 text-primary-black/90 dark:text-primary-white/90"
                    }`}
                  />
                </div>
              ))}
            </div>

            {editMode && (
              <div className="mt-2 text-xs text-primary-black/40 dark:text-primary-white/40">
                Email changes will require verification. Your current email is
                verified.
              </div>
            )}
          </section>
        </div>

        {/* Right: */}
        <div className="lg:col-span-1">
          {/* Security Section */}
          <section className="bg-primary-white dark:bg-primary-dark-card rounded-xl border border-primary-black/10 dark:border-primary-white/10 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary-orange/10 dark:bg-primary-orange/20">
                <Shield
                  size={20}
                  strokeWidth={1.5}
                  className="text-primary-orange-strong"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary-black dark:text-primary-white">
                  Security
                </h2>
                <p className="text-xs text-primary-black/50 dark:text-primary-white/50">
                  Manage password and account protection
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-primary-black/60 dark:text-primary-white/60 mb-1.5">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={security.showCurrent ? "text" : "password"}
                    value={security.currentPass}
                    onChange={(e) =>
                      setSecurity({ ...security, currentPass: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card text-primary-black dark:text-primary-white text-sm focus:outline-none focus:border-primary-orange focus:ring-1 focus:ring-primary-orange/20 transition-all"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setSecurity({
                        ...security,
                        showCurrent: !security.showCurrent,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-black/40 dark:text-primary-white/40 hover:text-primary-orange transition-colors"
                  >
                    {security.showCurrent ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-primary-black/60 dark:text-primary-white/60 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={security.showNew ? "text" : "password"}
                    value={security.newPass}
                    onChange={(e) => {
                      setSecurity({
                        ...security,
                        newPass: e.target.value,
                        strength: computeStrength(e.target.value),
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card text-primary-black dark:text-primary-white text-sm focus:outline-none focus:border-primary-orange focus:ring-1 focus:ring-primary-orange/20 transition-all"
                    placeholder="Minimum 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setSecurity({ ...security, showNew: !security.showNew })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-black/40 dark:text-primary-white/40 hover:text-primary-orange transition-colors"
                  >
                    {security.showNew ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
                {/* Strength indicator */}
                <div className="flex gap-1 mt-2 mb-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${i < security.strength ? barColor(security.strength) : "bg-primary-black/10 dark:bg-primary-white/10"}`}
                    />
                  ))}
                </div>
                <div className="flex gap-2 text-xs text-primary-black/40 dark:text-primary-white/40">
                  <span
                    className={
                      security.newPass.length >= 8
                        ? "text-primary-orange-strong"
                        : ""
                    }
                  >
                    8+ chars
                  </span>
                  <span>·</span>
                  <span
                    className={
                      /[A-Z]/.test(security.newPass)
                        ? "text-primary-orange-strong"
                        : ""
                    }
                  >
                    Uppercase
                  </span>
                  <span>·</span>
                  <span
                    className={
                      /[0-9]/.test(security.newPass)
                        ? "text-primary-orange-strong"
                        : ""
                    }
                  >
                    Number
                  </span>
                  <span>·</span>
                  <span
                    className={
                      /[^A-Za-z0-9]/.test(security.newPass)
                        ? "text-primary-orange-strong"
                        : ""
                    }
                  >
                    Symbol
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-primary-black/60 dark:text-primary-white/60 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={security.showConfirm ? "text" : "password"}
                    value={security.confirmPass}
                    onChange={(e) =>
                      setSecurity({ ...security, confirmPass: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card text-primary-black dark:text-primary-white text-sm focus:outline-none focus:border-primary-orange focus:ring-1 focus:ring-primary-orange/20 transition-all"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setSecurity({
                        ...security,
                        showConfirm: !security.showConfirm,
                      })
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-black/40 dark:text-primary-white/40 hover:text-primary-orange transition-colors"
                  >
                    {security.showConfirm ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>

              {securityStatus.msg && (
                <div
                  className={`p-3 rounded-lg text-sm font-medium ${securityStatus.type === "success" ? "bg-primary-sage-strong/20 text-primary-sage-strong" : securityStatus.type === "error" ? "bg-red-100 text-red-600 dark:text-red-400" : "bg-primary-black/5 dark:bg-primary-white/5 text-primary-black dark:text-primary-white"}`}
                >
                  {securityStatus.msg}
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-3">
                <button
                  onClick={handlePasswordChange}
                  className="w-full md:w-auto px-4 py-2 rounded-lg bg-primary-orange text-primary-white font-medium hover:bg-primary-orange-strong transition-all duration-300 shadow-lg shadow-primary-orange/20"
                >
                  Change Password
                </button>

                {/* <button
                  onClick={() => navigate("/dashboard/easter")}
                  className="w-full md:w-auto px-4 py-2 rounded-lg border border-primary-black/10 dark:border-primary-white/10 text-primary-black dark:text-primary-white font-medium hover:bg-primary-black/5 dark:hover:bg-primary-white/5 transition-all duration-300"
                >
                  Easter Egg
                </button> */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

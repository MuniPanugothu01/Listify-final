import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
  X,
  Camera,
  Loader2,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  FileText,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  fetchProfile,
  updateProfile,
  uploadProfileImage,
  setProfilePicPreview,
  clearProfileError,
  resetProfileSuccess,
  changeUserPassword,
} from "../../redux/slices/profileSlice";
import { refreshUserData } from "../../redux/slices/authSlice";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const FALLBACK_AVATAR =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop";

const GENDER_OPTIONS = [
  { label: "Select gender", value: "" },
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Non-binary / Other", value: "other" },
  { label: "Prefer not to say", value: "prefer-not-to-say" },
];

const EMPTY_FORM = {
  name: "",
  phone: "",
  address: "",
  bio: "",
  dateOfBirth: "",
  gender: "",
};

// ─────────────────────────────────────────────────────────────────────────────
// Small reusable components
// ─────────────────────────────────────────────────────────────────────────────
const Field = ({ label, icon: Icon, hint, children }) => (
  <div className="space-y-1.5">
    <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
      {Icon && <Icon className="w-4 h-4 text-gray-400" />}
      {label}
    </label>
    {children}
    {hint && <p className="text-xs text-gray-400">{hint}</p>}
  </div>
);

const baseCls =
  "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white " +
  "focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent " +
  "transition-all disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed";

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function PersonalDetailsSection() {
  const dispatch = useDispatch();

  // ── Redux state ─────────────────────────────────────────────────────────
  const {
    profile,
    profilePicPreview,
    loading,
    imageUploading,
    imageUploadProgress,
    error,
    success,
  } = useSelector((state) => state.profile);

  const { user: authUser } = useSelector((state) => state.auth);

  // ── Local state ──────────────────────────────────────────────────────────
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const [showPwSection, setShowPwSection] = useState(false);
  const [pwForm, setPwForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPw, setShowPw] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const fileInputRef = useRef(null);

  // ── Effects ──────────────────────────────────────────────────────────────

  // Fetch profile on first render if not already in store
  useEffect(() => {
    if (!profile) dispatch(fetchProfile());
  }, [dispatch, profile]);

  // Sync profile image to auth when profile updates
  useEffect(() => {
    if (profile?.profileImageUrl || profile?.profileImage || profile?.googleProfileImage || profile?.avatar) {
      // Get current user from auth
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = {
        ...currentUser,
        profileImageUrl: profile.profileImageUrl || profile.profileImage || profile.googleProfileImage || profile.avatar,
        profileImage: profile.profileImage,
        googleProfileImage: profile.googleProfileImage,
        avatar: profile.avatar,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Dispatch action to refresh auth user data if available
      if (refreshUserData) {
        dispatch(refreshUserData());
      }
    }
  }, [profile, dispatch]);

  // Pre-fill form whenever profile loads or updates
  useEffect(() => {
    if (!profile) return;
    setForm({
      name: profile.name || "",
      phone: profile.phone || "",
      address: profile.address || "",
      bio: profile.bio || "",
      dateOfBirth: profile.dateOfBirth
        ? String(profile.dateOfBirth).split("T")[0]
        : "",
      gender: profile.gender || "",
    });
  }, [profile]);

  // Handle redux success
  useEffect(() => {
    if (success) {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      dispatch(resetProfileSuccess());
    }
  }, [success, dispatch]);

  // Handle redux error
  useEffect(() => {
    if (error) {
      toast.error(typeof error === "string" ? error : "Something went wrong");
      dispatch(clearProfileError());
    }
  }, [error, dispatch]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profile) {
      setForm({
        name: profile.name || "",
        phone: profile.phone || "",
        address: profile.address || "",
        bio: profile.bio || "",
        dateOfBirth: profile.dateOfBirth
          ? String(profile.dateOfBirth).split("T")[0]
          : "",
        gender: profile.gender || "",
      });
    }
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    dispatch(updateProfile(form));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Show local preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(setProfilePicPreview(reader.result));
      // Also update localStorage preview temporarily
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      currentUser.profileImageUrl = reader.result;
      localStorage.setItem('user', JSON.stringify(currentUser));
    };
    reader.readAsDataURL(file);
    
    // Upload to server
    dispatch(uploadProfileImage(file)).then((result) => {
      if (result.payload?.imageUrl) {
        // Update localStorage with the actual URL
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        currentUser.profileImageUrl = result.payload.imageUrl;
        currentUser.profileImage = result.payload.imageUrl;
        localStorage.setItem('user', JSON.stringify(currentUser));
        
        // Refresh auth user data
        if (refreshUserData) {
          dispatch(refreshUserData());
        }
        
        toast.success("Profile image updated successfully!");
      }
    }).catch((error) => {
      toast.error("Failed to upload image. Please try again.");
      console.error("Image upload error:", error);
    });
  };

  const handlePasswordSave = async () => {
    if (!pwForm.currentPassword || !pwForm.newPassword || !pwForm.confirmPassword) {
      toast.error("All password fields are required");
      return;
    }
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (pwForm.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    try {
      await dispatch(changeUserPassword(pwForm)).unwrap();
      toast.success("Password changed successfully!");
      setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setShowPwSection(false);
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Failed to change password");
    }
  };

  // ── Derived values ────────────────────────────────────────────────────────
  const avatarSrc =
    profilePicPreview ||
    profile?.profileImage ||
    profile?.profileImageUrl ||
    profile?.googleProfileImage ||
    profile?.avatar ||
    authUser?.profileImageUrl ||
    authUser?.avatar ||
    FALLBACK_AVATAR;

  const displayName = profile?.name || authUser?.name || "User";
  const displayEmail = profile?.email || authUser?.email || "";
  const isGoogleUser =
    profile?.provider === "google" || authUser?.provider === "google";

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (!profile && loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 pb-10">

      {/* ── Page header + edit / save buttons ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Personal Details
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage your personal information
          </p>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500
                       hover:bg-emerald-600 text-white rounded-xl text-sm
                       font-semibold transition-colors shadow-sm"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300
                         text-gray-700 hover:bg-gray-50 rounded-xl text-sm
                         font-semibold transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500
                         hover:bg-emerald-600 disabled:bg-emerald-300 text-white
                         rounded-xl text-sm font-semibold transition-colors shadow-sm"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* ── Profile picture card ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Profile Picture
        </h3>
        <div className="flex items-center gap-6">
          <div className="relative flex-shrink-0">
            <img
              src={avatarSrc}
              alt={displayName}
              className="w-24 h-24 rounded-2xl object-cover border-4
                         border-white shadow-lg"
              onError={(e) => {
                e.target.src = FALLBACK_AVATAR;
              }}
            />

            {/* Upload progress overlay */}
            {imageUploading && (
              <div className="absolute inset-0 bg-black/50 rounded-2xl flex
                              flex-col items-center justify-center gap-1">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
                <span className="text-white text-xs font-medium">
                  {imageUploadProgress}%
                </span>
              </div>
            )}

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={imageUploading}
              title="Change profile picture"
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500
                         hover:bg-emerald-600 disabled:bg-gray-300 text-white
                         rounded-full flex items-center justify-center
                         shadow-md transition-colors"
            >
              <Camera className="w-4 h-4" />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div>
            <p className="font-semibold text-gray-900 text-lg">{displayName}</p>
            <p className="text-sm text-gray-500 mt-0.5">{displayEmail}</p>
            {isGoogleUser && (
              <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-1
                               bg-blue-50 text-blue-700 text-xs rounded-full
                               font-medium border border-blue-100">
                Google Account
              </span>
            )}
            <p className="text-xs text-gray-400 mt-2">
              JPG, PNG or WebP — max 5 MB
            </p>
          </div>
        </div>
      </div>

      {/* ── Account information card ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-5">
          Account Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Name */}
          <Field label="Full Name" icon={User}>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter your full name"
              className={baseCls}
            />
          </Field>

          {/* Email — always read-only */}
          <Field
            label="Email Address"
            icon={Mail}
            hint="Email cannot be changed"
          >
            <input
              value={displayEmail}
              disabled
              placeholder="your@email.com"
              className={baseCls}
            />
          </Field>

          {/* Phone */}
          <Field
            label="Phone Number"
            icon={Phone}
            hint="10-digit number, digits only"
          >
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="9876543210"
              maxLength={15}
              className={baseCls}
            />
          </Field>

          {/* Date of Birth */}
          <Field label="Date of Birth" icon={Calendar}>
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              disabled={!isEditing}
              max={new Date().toISOString().split("T")[0]}
              className={baseCls}
            />
          </Field>

          {/* Gender — values match DB enum exactly */}
          <Field label="Gender" icon={User}>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              disabled={!isEditing}
              className={baseCls}
            >
              {GENDER_OPTIONS.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>

          {/* Address */}
          <Field label="Address" icon={MapPin}>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter your address"
              className={baseCls}
            />
          </Field>
        </div>

        {/* Bio — full width */}
        <div className="mt-5">
          <Field label="Bio" icon={FileText}>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              disabled={!isEditing}
              rows={3}
              placeholder="Tell us a little about yourself…"
              className={`${baseCls} resize-none`}
            />
          </Field>
        </div>

        {/* Editing mode notice */}
        {isEditing && (
          <div className="mt-5 p-4 bg-amber-50 border border-amber-200
                          rounded-xl flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-amber-700">
              You are in editing mode. Click{" "}
              <strong>Save Changes</strong> to persist your updates.
            </p>
          </div>
        )}
      </div>

      {/* ── Change password card — hidden for Google accounts ── */}
      {!isGoogleUser && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Change Password
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">
                Update your account password
              </p>
            </div>
            <button
              onClick={() => {
                setShowPwSection((v) => !v);
                setPwForm({
                  currentPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                });
              }}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200
                         hover:bg-gray-50 text-gray-700 rounded-xl text-sm
                         font-medium transition-colors"
            >
              <Lock className="w-4 h-4" />
              {showPwSection ? "Cancel" : "Change Password"}
            </button>
          </div>

          {showPwSection && (
            <div className="space-y-4 pt-4 border-t border-gray-100 mt-4">
              {[
                {
                  key: "current",
                  label: "Current Password",
                  name: "currentPassword",
                },
                {
                  key: "new",
                  label: "New Password",
                  name: "newPassword",
                },
                {
                  key: "confirm",
                  label: "Confirm New Password",
                  name: "confirmPassword",
                },
              ].map(({ key, label, name }) => (
                <div key={key} className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      type={showPw[key] ? "text" : "password"}
                      value={pwForm[name]}
                      onChange={(e) =>
                        setPwForm((prev) => ({
                          ...prev,
                          [name]: e.target.value,
                        }))
                      }
                      placeholder={`Enter ${label.toLowerCase()}`}
                      className={`${baseCls} pr-10`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPw((prev) => ({ ...prev, [key]: !prev[key] }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2
                                 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPw[key] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={handlePasswordSave}
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500
                           hover:bg-emerald-600 disabled:bg-emerald-300 text-white
                           rounded-xl text-sm font-semibold transition-colors mt-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
                Update Password
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
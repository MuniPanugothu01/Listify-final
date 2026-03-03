import React from "react";
import {
  BadgeCheck,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  FileText,
} from "lucide-react";

const ProfileOverview = ({ user, profilePic }) => {
  const formatDate = (date) => {
    if (!date) return null;
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return null;
    return parsed.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatGender = (value) => {
    if (!value) return null;
    return value
      .toString()
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatPreferences = (value) => {
    if (!value) return null;
    if (Array.isArray(value)) {
      const cleaned = value.filter(Boolean);
      return cleaned.length ? cleaned.join(", ") : null;
    }
    if (typeof value === "object") {
      const cleaned = Object.entries(value)
        .filter(([, enabled]) => Boolean(enabled))
        .map(([key]) => key.replace(/([A-Z])/g, " $1").trim());
      return cleaned.length ? cleaned.join(", ") : null;
    }
    return String(value);
  };

  const structuredLocation = [
    user?.city,
    user?.state,
    user?.country,
    user?.postalCode || user?.zipCode,
  ]
    .filter(Boolean)
    .join(", ");

  const profileFields = [
    {
      label: "Full Name",
      value: user?.name,
      icon: User,
    },
    {
      label: "Email",
      value: user?.email,
      icon: Mail,
    },
    {
      label: "Phone",
      value: user?.phone,
      icon: Phone,
    },
    {
      label: "Address",
      value: user?.address,
      icon: MapPin,
    },
    {
      label: "Location",
      value: structuredLocation,
      icon: MapPin,
    },
    {
      label: "Member Since",
      value: formatDate(user?.createdAt),
      icon: Calendar,
    },
    {
      label: "Date of Birth",
      value: formatDate(user?.dateOfBirth),
      icon: Calendar,
    },
    {
      label: "Gender",
      value: formatGender(user?.gender),
      icon: User,
    },
    {
      label: "Verification",
      value: user?.isVerified ? "Verified" : null,
      icon: Shield,
    },
    {
      label: "Status",
      value: user?.status,
      icon: Shield,
    },
    {
      label: "Preferences",
      value: formatPreferences(user?.preferences),
      icon: FileText,
    },
    {
      label: "Last Updated",
      value: formatDate(user?.updatedAt),
      icon: Calendar,
    },
  ].filter((field) => Boolean(field.value));

  return (
    <div className="space-y-6 w-full">
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-gray-100">
          <div className="relative">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-gray-100 border-4 border-white shadow-lg flex items-center justify-center">
                <User className="w-8 h-8 text-gray-400" />
              </div>
            )}
            {user?.isVerified && (
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                <BadgeCheck className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              {user?.name && <h3 className="font-bold text-gray-900 truncate">{user.name}</h3>}
              {user?.provider && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                  {user.provider === "google" ? "Google Account" : "Account"}
                </span>
              )}
            </div>
            {user?.email && <p className="text-sm text-gray-500 truncate">{user.email}</p>}
          </div>
        </div>

        {profileFields.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
            {profileFields.map((field) => (
              <div key={field.label} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <field.icon className="w-4 h-4 text-emerald-600" />
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{field.label}</p>
                </div>
                <p className="text-sm font-medium text-gray-900 break-words">{field.value}</p>
              </div>
            ))}
          </div>
        )}

        {user?.bio && (
          <div className="pt-6 border-t border-gray-100 mt-6">
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-emerald-600 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Bio</p>
                <p className="text-sm text-gray-900 mt-1 break-words">{user.bio}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileOverview;
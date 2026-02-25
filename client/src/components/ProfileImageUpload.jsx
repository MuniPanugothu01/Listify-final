// components/ProfileImageUpload.jsx
// Reusable profile image upload component with S3 integration
// Works for both Google and email users

import React, { useState, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/useRedux";
import { updateProfile, updateUser } from "../redux/slices/authSlice";
import { fetchProfile } from "../redux/slices/profileSlice";
import s3Service from "../services/s3Service";
import toast from "react-hot-toast";
import { FaCamera, FaSpinner } from "react-icons/fa";

const STATIC_PROFILE_IMAGE =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

/**
 * ProfileImageUpload
 *
 * Usage:
 *   <ProfileImageUpload size={96} />
 *
 * After upload, the image URL is saved to backend and Redux state is refreshed.
 * The Navbar will automatically pick up the new image via Redux.
 */
const ProfileImageUpload = ({ size = 96, className = "" }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { profile } = useAppSelector((state) => state.profile);

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageError, setImageError] = useState(false);

  const fileInputRef = useRef(null);

  // Determine current displayed image
  const isGoogleUser =
    profile?.provider === "google" ||
    user?.provider === "google" ||
    !!user?.googleId;

  const currentImage = (() => {
    // Prefer custom uploaded image (profileImage is the actual S3 URL)
    const custom =
      profile?.profileImage ||
      profile?.profileImageUrl ||
      user?.profileImage ||
      user?.profileImageUrl;

    if (custom && custom !== STATIC_PROFILE_IMAGE) return custom;

    // Google photo fallback
    if (isGoogleUser) {
      const googlePhoto =
        profile?.googleProfileImage ||
        profile?.avatar ||
        user?.googleProfileImage ||
        user?.picture ||
        user?.avatar;
      if (googlePhoto && googlePhoto !== STATIC_PROFILE_IMAGE)
        return googlePhoto;
    }

    // Static fallback for email users
    return STATIC_PROFILE_IMAGE;
  })();

  const displaySrc =
    previewUrl || (imageError ? STATIC_PROFILE_IMAGE : currentImage);

  const handleFileSelect = useCallback(
    async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Show preview immediately
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);

      setUploading(true);
      setUploadProgress(0);
      setImageError(false);

      try {
        // Upload to S3 (via backend presigned URL or direct backend upload)
        // Switch between methods based on your backend setup:
        //
        // Option A: Presigned URL (direct to S3)
        // const { imageUrl, fileKey } = await s3Service.uploadProfileImage(file, setUploadProgress);
        //
        // Option B: Via backend (backend uploads to S3)
        const { imageUrl, fileKey } =
          await s3Service.uploadProfileImageViaBackend(file, setUploadProgress);

        // Save image URL to user profile in backend
        await dispatch(
          updateProfile({
            profileImage: imageUrl,
            profileImageUrl: imageUrl,
            profileImageKey: fileKey,
          }),
        ).unwrap();

        // Refresh profile slice so Navbar updates
        await dispatch(fetchProfile());

        // Update auth user state directly via Redux
        dispatch(
          updateUser({ profileImageUrl: imageUrl, profileImage: imageUrl }),
        );

        toast.success("Profile photo updated!");
        setPreviewUrl(null); // Clear preview — actual image now in Redux
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error(
          error.message || "Failed to upload image. Please try again.",
        );
        setPreviewUrl(null); // Revert preview on error
      } finally {
        setUploading(false);
        setUploadProgress(0);
        // Reset file input so same file can be re-selected
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [dispatch],
  );

  const handleClick = () => {
    if (!uploading) fileInputRef.current?.click();
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Profile Image */}
      <div
        onClick={handleClick}
        className="relative cursor-pointer group"
        style={{ width: size, height: size }}
      >
        <img
          src={displaySrc}
          alt="Profile"
          onError={() => setImageError(true)}
          className="rounded-full object-cover border-4 border-white shadow-lg"
          style={{ width: size, height: size }}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
          {uploading ? (
            <div className="flex flex-col items-center">
              <FaSpinner
                className="text-white animate-spin"
                size={size * 0.2}
              />
              <span className="text-white text-xs mt-1">{uploadProgress}%</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <FaCamera className="text-white" size={size * 0.2} />
              <span className="text-white text-xs mt-1">Change</span>
            </div>
          )}
        </div>

        {/* Upload progress ring */}
        {uploading && (
          <svg
            className="absolute inset-0"
            style={{ width: size, height: size }}
            viewBox={`0 0 ${size} ${size}`}
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={(size - 8) / 2}
              fill="none"
              stroke="#27bb97"
              strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * ((size - 8) / 2)}`}
              strokeDashoffset={`${2 * Math.PI * ((size - 8) / 2) * (1 - uploadProgress / 100)}`}
              strokeLinecap="round"
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "center",
                transition: "stroke-dashoffset 0.3s",
              }}
            />
          </svg>
        )}
      </div>

      {/* Camera icon badge */}
      {!uploading && (
        <button
          onClick={handleClick}
          className="absolute bottom-0 right-0 bg-[#1FA987] text-white rounded-full p-1.5 shadow-md hover:bg-[#1a9277] transition-colors border-2 border-white"
          style={{ width: size * 0.28, height: size * 0.28 }}
          title="Change profile photo"
        >
          <FaCamera size={size * 0.12} />
        </button>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />
    </div>
  );
};

export default ProfileImageUpload;

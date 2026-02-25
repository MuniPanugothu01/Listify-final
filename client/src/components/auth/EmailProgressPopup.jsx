import React, { useEffect } from "react";
import { X, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmailProgressPopup = ({
  isOpen,
  onClose,
  email,
  expiryTime,
  countdown,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-2xl animate-slideUp">
        {/* Header with X button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Registration In Progress
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-700 mb-2">
              An OTP has already been sent to:
            </p>
            <p className="text-lg font-semibold text-[#27bb97] bg-[#27bb97]/10 p-3 rounded-lg break-all">
              {email}
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <p className="text-amber-800 text-sm">
              This email is already in the registration process. Please check
              your inbox for the OTP or wait for the session to expire.
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Session expires in:</span>
              <span className="text-sm font-semibold text-amber-600">
                {countdown} seconds
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(countdown / expiryTime) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                onClose();
                // Focus on email field
                setTimeout(() => {
                  const emailInput = document.querySelector(
                    'input[name="email"]',
                  );
                  if (emailInput) emailInput.focus();
                }, 100);
              }}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Try Different Email
            </button>
            <button
              onClick={() => {
                onClose();
                navigate("/signin");
              }}
              className="flex-1 px-4 py-3 bg-[#27bb97] text-white rounded-lg hover:bg-[#1fa987] transition-colors font-medium"
            >
              Go to Login
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <p className="text-xs text-gray-500 text-center">
            The OTP will expire in {expiryTime} seconds. You can request a new
            OTP after that.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailProgressPopup;

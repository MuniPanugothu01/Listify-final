import React from "react";

const sizeMap = {
  small: 'w-8 h-8',
  medium: 'w-12 h-12',
  large: 'w-16 h-16',
};

const LoadingSpinner = ({
  fullScreen = true,
  text = 'Loading...',
  size = 'large',
}) => {
  const spinnerSize = sizeMap[size] || sizeMap.large;

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4" role="status" aria-live="polite">
      <div className={`relative ${spinnerSize}`}>
        <div className="absolute inset-0 rounded-full border-2 border-[#27bb97]/20" />
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#27bb97] border-r-[#27bb97]"
          style={{ animation: 'smoothSpin 1s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
        />
        <div
          className="absolute inset-1 rounded-full border border-transparent border-b-[#34d1a8]"
          style={{ animation: 'smoothSpinReverse 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
        />
        <div
          className="absolute inset-[38%] rounded-full bg-[#27bb97]"
          style={{ animation: 'smoothPulse 1.6s ease-in-out infinite' }}
        />
      </div>

      {text && (
        <p className="text-sm sm:text-base text-gray-600 font-medium tracking-wide" style={{ animation: 'smoothFade 1.8s ease-in-out infinite' }}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/90 backdrop-blur-[2px] z-50 flex items-center justify-center transition-opacity duration-300">
        {spinner}
        <style>{`
          @keyframes smoothSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes smoothSpinReverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          @keyframes smoothPulse {
            0%, 100% { transform: scale(0.85); opacity: 0.8; }
            50% { transform: scale(1); opacity: 1; }
          }
          @keyframes smoothFade {
            0%, 100% { opacity: 0.65; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      {spinner}
      <style>{`
        @keyframes smoothSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes smoothSpinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes smoothPulse {
          0%, 100% { transform: scale(0.85); opacity: 0.8; }
          50% { transform: scale(1); opacity: 1; }
        }
        @keyframes smoothFade {
          0%, 100% { opacity: 0.65; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default LoadingSpinner;

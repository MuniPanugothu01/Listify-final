import React from "react";

export default function StylePreview() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] p-6 flex justify-center items-start">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-[#E2E2E2] p-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-[#2D7A82] mb-4">
          Marketplace Style Preview
        </h1>
        <p className="text-[#7A7A7A] mb-6 leading-relaxed">
          This is a React + Tailwind preview using your finalized color palette.
        </p>

        {/* Button */}
        <button className="bg-[#2D7A82] hover:bg-[#1F4E54] text-white px-6 py-3 rounded-xl text-lg transition">
          Primary Button
        </button>

        {/* Card */}
        <div className="mt-8 p-6 border border-[#E2E2E2] rounded-xl bg-white">
          <h2 className="text-2xl font-semibold text-[#2D7A82] mb-2">
            Sample Card Title
          </h2>
          <p className="text-[#7A7A7A] leading-relaxed">
            This card demonstrates the neutral backgrounds, border styling, and accent
            color for section headers.
          </p>
        </div>
      </div>
    </div>
  );
}

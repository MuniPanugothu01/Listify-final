import React from "react";

export default function HeroSection1() {
  return (
    <section className="bg-gray-200 px-8 py-20 md:px-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-blue-700">
            Build Better, Faster & Smarter
          </h1>

          <p className="mt-4 text-gray-700 text-lg">
            A powerful, real-time and user-friendly platform designed with clean
            UI principles. Built using React, Tailwind and a modern blue theme
            for a professional look.
          </p>

          <div className="mt-6 flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
              Get Started
            </button>

            <button className="bg-blue-400 text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-500 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="flex justify-center">
          <img
            src="https://cdn.dribbble.com/userupload/13891393/file/original-56d9fb4c48a8e03cdf0c921e68b99052.png"
            alt="Hero Illustration"
            className="w-80 md:w-96 rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

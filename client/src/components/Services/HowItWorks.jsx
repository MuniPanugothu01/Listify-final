import {
  FaSearch,
  FaCalendarCheck,
  FaUserCheck,
  FaCreditCard,
} from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Choose a Service",
    description: "Browse verified local services and select what you need.",
    icon: <FaSearch />,
  },
  {
    id: 2,
    title: "Pick Date & Time",
    description: "Select a convenient slot that fits your schedule.",
    icon: <FaCalendarCheck />,
  },
  {
    id: 3,
    title: "Get Service Done",
    description: "A trusted professional arrives and completes the job.",
    icon: <FaUserCheck />,
  },
  {
    id: 4,
    title: "Pay Securely",
    description: "Pay online after service completion with full transparency.",
    icon: <FaCreditCard />,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <span className="inline-block mb-3 sm:mb-4 text-sm font-semibold tracking-wider uppercase text-[#27bb97]">
            How It Works
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Book Local Services in 4 Simple Steps
          </h2>

          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            From finding the right service to secure payment, everything is
            designed to be fast, transparent, and reliable.
          </p>

          <div className="mt-8 sm:mt-10 flex justify-center">
            <div className="w-24 sm:w-28 h-[2px] bg-gradient-to-r from-transparent via-[#27bb97] to-transparent rounded-full" />
          </div>
        </div>

        {/* STEPS */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {/* PROGRESS LINE (DESKTOP ONLY) */}
          <div className="hidden md:block absolute top-16 left-0 right-0 border-t border-dashed border-gray-300" />

          {steps.map((step) => (
            <div
              key={step.id}
              className="
                relative
                bg-white
                border border-gray-100
                rounded-3xl
                px-6
                py-8
                sm:py-10
                text-center
                shadow-sm
                hover:shadow-xl
                transition-all
                duration-300
                hover:-translate-y-1
              "
            >
              {/* STEP INDEX */}
              <div
                className="
                  absolute
                  -top-4
                  left-1/2
                  -translate-x-1/2
                  bg-white
                  border border-gray-200
                  rounded-full
                  w-8
                  h-8
                  flex
                  items-center
                  justify-center
                  text-xs
                  font-semibold
                  text-gray-500
                "
              >
                {step.id}
              </div>

              {/* ICON */}
              <div
                className="
                  mx-auto
                  mb-5
                  sm:mb-6
                  w-14
                  h-14
                  sm:w-16
                  sm:h-16
                  rounded-2xl
                  bg-[#27bb97]/10
                  text-[#27bb97]
                  flex
                  items-center
                  justify-center
                  text-xl
                  sm:text-2xl
                "
              >
                {step.icon}
              </div>

              {/* CONTENT */}
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                {step.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

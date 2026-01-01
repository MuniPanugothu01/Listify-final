import {
  MdVerified,
  MdShield,
  MdChat,
  MdAttachMoney,
} from "react-icons/md";

const trustItems = [
  {
    label: "Verified Professionals",
    icon: <MdVerified />,
  },
  {
    label: "Secure Payments",
    icon: <MdShield />,
  },
  {
    label: "Call Masking & Chat",
    icon: <MdChat />,
  },
  {
    label: "Transparent Pricing",
    icon: <MdAttachMoney />,
  },
];

export default function ServiceTrustStrip() {
  return (
    <section className="bg-[#27bb97]/5 border-y border-[#27bb97]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm font-medium text-gray-700">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2"
            >
              <span className="text-[#27bb97] text-lg">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

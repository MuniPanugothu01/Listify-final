import { useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { GoArrowUpRight } from "react-icons/go";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

const Questions = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I create a listing on Listify?",
      answer:
        "Click on 'Post Ad' in the top navigation, select the appropriate category, fill in your listing details, add photos, and publish. It's free and takes just a few minutes!",
    },
    {
      question: "Is Listify completely free to use?",
      answer:
        "Yes! Basic listings are completely free. We offer optional premium features like featured listings and bumps for better visibility at affordable rates.",
    },
    {
      question: "How do I contact a seller?",
      answer:
        "Click on the listing you're interested in and use the 'Contact Seller' button. You can send a message directly through our platform while keeping your email private.",
    },
    {
      question: "What safety tips should I follow when meeting?",
      answer:
        "Always meet in public places, bring a friend, inspect items thoroughly, trust your instincts, and avoid sharing personal financial information. Never wire money or pay in advance for items.",
    },
    {
      question: "Can I edit or delete my listing after posting?",
      answer:
        "Yes! Log into your account, go to 'My Listings', and you can edit, delete, or mark your items as sold at any time.",
    },
    {
      question: "What categories can I list items in?",
      answer:
        "Listify offers various categories including Housing, Jobs, For Sale, Services, Community, and Personals. Choose the most relevant category for better visibility.",
    },
    {
      question: "How long do listings stay active?",
      answer:
        "Listings remain active for 30 days. You can renew them for free or use our 'bump' feature to bring them back to the top of search results.",
    },
    {
      question: "Do you offer customer support?",
      answer:
        "Absolutely! Our support team is available via email and live chat to help with any issues, from technical problems to account questions.",
    },
  ];

  return (
    <div className="min-h-screen  mt-8 sm:mt-10 md:mt-12 lg:mt-10 rounded-[5%] sm:rounded-[8%] lg:rounded-[10%] py-6 sm:py-7 md:py-8 lg:py-10 flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 text-black">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8 md:mb-10">
        <h1
          style={{ fontFamily: "Satoshi, sans-serif" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[55px] font-normal leading-tight sm:leading-snug"
        >
          Questions? Answers!
        </h1>
        <p className="text-sm sm:text-base md:text-[15px] text-gray-700 mt-2 sm:mt-3 max-w-2xl mx-auto px-2">
          Find quick answers to the most common questions about Listify
        </p>
      </div>

      {/* Content Section - Stack on mobile, side by side on desktop */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 w-full max-w-6xl">
        {/* Contact Card - Full width on mobile, 30% on desktop */}
        <div className="w-full lg:w-[30%] flex flex-col items-center gap-3 sm:gap-4 h-fit bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl shadow-gray-300 sm:shadow-gray-400 p-4 sm:p-5 md:p-6">
          <div className="p-3 sm:p-4 bg-white rounded-xl shadow shadow-gray-300 sm:shadow-gray-400">
            <BsQuestionCircle size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-medium mb-1 sm:mb-2">
              Get In Touch Now!
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Still have questions? Feel free to get in touch with us today!
            </p>
          </div>

          <Link to="/contact-us">
            <button className="bg-[#27BB97]  text-sm sm:text-base md:text-[17px] cursor-pointer shadow-lg sm:shadow-xl px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-white flex items-center justify-center gap-1 sm:gap-2 w-full sm:w-auto transition-colors duration-300">
              <GoArrowUpRight size={18} className="sm:w-5 sm:h-5" />
              Contact Us
            </button>
          </Link>
        </div>

        {/* FAQ Questions - Full width on mobile, 70% on desktop */}
        <div className="w-full lg:w-[70%] flex flex-col gap-3 sm:gap-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg sm:rounded-xl w-full shadow-md sm:shadow-lg shadow-gray-200 sm:shadow-gray-300 overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div
                className="flex items-center justify-between p-3 sm:p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleQuestion(index)}
              >
                <p className="text-gray-800 font-medium text-sm sm:text-base md:text-lg pr-2">
                  {item.question}
                </p>
                {activeIndex === index ? (
                  <MdKeyboardArrowUp
                    size={18}
                    className="sm:w-5 sm:h-5 flex-shrink-0"
                  />
                ) : (
                  <MdKeyboardArrowDown
                    size={18}
                    className="sm:w-5 sm:h-5 flex-shrink-0"
                  />
                )}
              </div>
              {activeIndex === index && (
                <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-t border-gray-100 pt-3">
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Spacing at bottom */}
      <div className="mt-8 sm:mt-10 md:mt-12"></div>
    </div>
  );
};

export default Questions;

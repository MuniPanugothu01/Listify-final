import { useState } from "react";
import { FaCircleQuestion } from "react-icons/fa6";
import { BsQuestionCircle } from "react-icons/bs";
import { GoArrowUpRight } from "react-icons/go";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const Questions = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I create a listing on Listify?",
      answer: "Click on 'Post Ad' in the top navigation, select the appropriate category, fill in your listing details, add photos, and publish. It's free and takes just a few minutes!"
    },
    {
      question: "Is Listify completely free to use?",
      answer: "Yes! Basic listings are completely free. We offer optional premium features like featured listings and bumps for better visibility at affordable rates."
    },
    {
      question: "How do I contact a seller?",
      answer: "Click on the listing you're interested in and use the 'Contact Seller' button. You can send a message directly through our platform while keeping your email private."
    },
    {
      question: "What safety tips should I follow when meeting?",
      answer: "Always meet in public places, bring a friend, inspect items thoroughly, trust your instincts, and avoid sharing personal financial information. Never wire money or pay in advance for items."
    },
    {
      question: "Can I edit or delete my listing after posting?",
      answer: "Yes! Log into your account, go to 'My Listings', and you can edit, delete, or mark your items as sold at any time."
    },
    {
      question: "What categories can I list items in?",
      answer: "Listify offers various categories including Housing, Jobs, For Sale, Services, Community, and Personals. Choose the most relevant category for better visibility."
    },
    {
      question: "How long do listings stay active?",
      answer: "Listings remain active for 30 days. You can renew them for free or use our 'bump' feature to bring them back to the top of search results."
    },
    {
      question: "Do you offer customer support?",
      answer: "Absolutely! Our support team is available via email and live chat to help with any issues, from technical problems to account questions."
    }
  ];

  return (
    <div className="min-h-screen bg-[#c89a5e]/20 mt-10 rounded-[10%] py-7 flex flex-col items-center justify-center px-10 text-black">
      {/* <div className="bg-[#F3F3F3] w-fit flex items-center gap-2 px-4 py-1 rounded-full shadow-xl shadow-balck">
        <FaCircleQuestion />
        <p>FAQS</p>
      </div> */}

      <div className="flex flex-col items-center text-center ">
        <h1
          style={{ fontFamily: "Satoshi, sans-serif" }}
          className="text-[55px] font-normal"
        >
          Questions? Answers!
        </h1>
        <p className="text-[15px] text-gray-700">
          Find quick answers to the most common questions about Listify
        </p>
      </div>

      <div className="flex gap-5 mt-7">
        <div className="flex flex-col items-center gap-3 h-fit bg-white rounded-xl shadow-xl shadow-gray-400 p-5">
          <div className="p-4 bg-white rounded-xl shadow shadow-gray-400">
            <BsQuestionCircle size={25} />
          </div>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-[26px] ">Get In Touch Now!</h2>
            <p className="text-gray-600">Still have questions? Feel free to get in touch with us today!</p>
          </div>

          <div className="bg-[#2F3A63] border-2 border-[#2F3A63] text-[17px] cursor-pointer shadow-xl px-4 py-3 rounded-xl text-white flex items-center gap-2">
            <GoArrowUpRight size={20}/>
            Ask A Question
          </div>
        </div>

        {/* questions */}
        <div className="flex flex-col gap-4">
          {faqData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg w-[500px] shadow-lg shadow-gray-300 overflow-hidden">
              <div 
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleQuestion(index)}
              >
                <p className="text-gray-800 font-medium">{item.question}</p>
                {activeIndex === index ? <MdKeyboardArrowUp size={20} /> : <MdKeyboardArrowDown size={20} />}
              </div>
              {activeIndex === index && (
                <div className="px-4 pb-4">
                  <p className="text-gray-600 text-sm">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Questions;
import React from 'react';
import { Award, Shuffle, BadgeCheck, Users, Clock, HandHeart } from 'lucide-react';

const TutorAbout = () => {
  const features = [
    {
      id: '01',
      icon: <Award className="w-8 h-8 xs:w-10 xs:h-10 sm:w-10 sm:h-10" />,
      title: 'We are the experts',
      description: 'Thousands of students and parents already love, trust, and rely on Sulekha for professional tutoring services.',
    },
    {
      id: '02',
      icon: <Shuffle className="w-8 h-8 xs:w-10 xs:h-10 sm:w-10 sm:h-10" />,
      title: 'Flexible Options',
      description: 'Choose from subject-specific tutoring, test prep, homework help, online sessions, and in-person tutoring.',
    },
    {
      id: '03',
      icon: <BadgeCheck className="w-8 h-8 xs:w-10 xs:h-10 sm:w-10 sm:h-10" />,
      title: 'Quality Assurance',
      description: '97% satisfaction rate from students, ensuring you receive effective and personalized tutoring service.',
    },
    {
      id: '04',
      icon: <Users className="w-8 h-8 xs:w-10 xs:h-10 sm:w-10 sm:h-10" />,
      title: 'Experienced Tutors',
      description: 'With thousands of successful sessions, our educational professionals bring proven teaching expertise.',
    },
    {
      id: '05',
      icon: <Clock className="w-8 h-8 xs:w-10 xs:h-10 sm:w-10 sm:h-10" />,
      title: 'Quick Matches',
      description: 'Find the right tutor within hours, perfect for exam preparation or last-minute homework help.',
    },
    {
      id: '06',
      icon: <HandHeart className="w-8 h-8 xs:w-10 xs:h-10 sm:w-10 sm:h-10" />,
      title: 'Academic Success',
      description: 'Achieve better grades and confidence knowing your learning needs are in professional and caring hands.',
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12 lg:py-16 px-3 xs:px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-16 px-2">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            ABOUT <span className='text-[#27BB97]'>US</span> 
          </h2>
          <p className="text-gray-600 text-sm xs:text-base sm:text-lg lg:text-lg">
            Why Find a <span className='text-[#27BB97] font-medium'>Tutor with Listify</span>?
          </p>
        </div>

        {/* Layout Strategy */}
        <div className="flex flex-col items-center">
          
          {/* Mobile Layout - Single column for screens < 768px */}
          <div className="w-full md:hidden">
            <div className="grid grid-cols-1 gap-4 xs:gap-5 sm:gap-6">
              {features.map((feature) => (
                <div 
                  key={feature.id} 
                  className="bg-white rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow relative"
                >
                  <div className="absolute top-4 xs:top-5 right-4 xs:right-5 text-4xl xs:text-5xl sm:text-6xl font-bold text-gray-100">
                    {feature.id}
                  </div>
                  <div className="relative z-10">
                    <div className="text-[#27BB97] mb-3 xs:mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg xs:text-xl font-bold text-gray-900 mb-2 xs:mb-3 line-clamp-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm xs:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tablet Layout - 2 columns for 768px - 1023px */}
          <div className="hidden md:block lg:hidden w-full">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature) => (
                <div 
                  key={feature.id} 
                  className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow relative"
                >
                  <div className="absolute top-5 right-5 text-5xl sm:text-6xl font-bold text-gray-100">
                    {feature.id}
                  </div>
                  <div className="relative z-10">
                    <div className="text-[#27BB97] mb-3 sm:mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Layout - Diamond arrangement for ≥ 1024px */}
          <div className="hidden lg:block w-full">
            <div className="flex flex-col items-center">
              {/* First Row: Features 1 & 4 */}
              <div className="max-w-4xl mx-auto mb-8 xl:mb-12 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Feature 1 */}
                  <div className="bg-white rounded-2xl p-6 xl:p-8 shadow-sm hover:shadow-md transition-shadow relative">
                    <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100">
                      01
                    </div>
                    <div className="relative z-10">
                      <div className="text-[#27BB97] mb-4 xl:mb-6">
                        {features[0].icon}
                      </div>
                      <h3 className="text-xl xl:text-2xl font-bold text-gray-900 mb-3 xl:mb-4">
                        {features[0].title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-base xl:text-lg">
                        {features[0].description}
                      </p>
                    </div>
                  </div>

                  {/* Feature 4 */}
                  <div className="bg-white rounded-2xl p-6 xl:p-8 shadow-sm hover:shadow-md transition-shadow relative">
                    <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100">
                      04
                    </div>
                    <div className="relative z-10">
                      <div className="text-[#27BB97] mb-4 xl:mb-6">
                        {features[3].icon}
                      </div>
                      <h3 className="text-xl xl:text-2xl font-bold text-gray-900 mb-3 xl:mb-4">
                        {features[3].title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-base xl:text-lg">
                        {features[3].description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Row: Feature 2 + Image + Feature 5 */}
              <div className="max-w-7xl mx-auto mb-8 xl:mb-12 w-full">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-stretch">
                  {/* Feature 2 */}
                  <div className="bg-white rounded-2xl p-6 xl:p-8 shadow-sm hover:shadow-md transition-shadow relative flex flex-col">
                    <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100">
                      02
                    </div>
                    <div className="relative z-10 flex-grow">
                      <div className="text-[#27BB97] mb-4 xl:mb-6">
                        {features[1].icon}
                      </div>
                      <h3 className="text-xl xl:text-2xl font-bold text-gray-900 mb-3 xl:mb-4">
                        {features[1].title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-base xl:text-lg">
                        {features[1].description}
                      </p>
                    </div>
                  </div>

                  {/* Center Image */}
                  <div className="flex items-center justify-center my-6 xl:my-0">
                    <div className="relative">
                      <div className="absolute inset-0 border-4 border-dashed border-gray-300 rounded-full animate-pulse"></div>
                      <div className="relative rounded-full overflow-hidden w-64 h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 border-8 border-white shadow-xl">
                        <img
                          src="/tutor-2.jpg"
                          alt="Professional tutor teaching"
                          className="w-full h-full object-cover object-right hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Feature 5 */}
                  <div className="bg-white rounded-2xl p-6 xl:p-8 shadow-sm hover:shadow-md transition-shadow relative flex flex-col">
                    <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100">
                      05
                    </div>
                    <div className="relative z-10 flex-grow">
                      <div className="text-[#27BB97] mb-4 xl:mb-6">
                        {features[4].icon}
                      </div>
                      <h3 className="text-xl xl:text-2xl font-bold text-gray-900 mb-3 xl:mb-4">
                        {features[4].title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-base xl:text-lg">
                        {features[4].description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Third Row: Features 3 & 6 */}
              <div className="max-w-4xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Feature 3 */}
                  <div className="bg-white rounded-2xl p-6 xl:p-8 shadow-sm hover:shadow-md transition-shadow relative">
                    <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100">
                      03
                    </div>
                    <div className="relative z-10">
                      <div className="text-[#27BB97] mb-4 xl:mb-6">
                        {features[2].icon}
                      </div>
                      <h3 className="text-xl xl:text-2xl font-bold text-gray-900 mb-3 xl:mb-4">
                        {features[2].title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-base xl:text-lg">
                        {features[2].description}
                      </p>
                    </div>
                  </div>

                  {/* Feature 6 */}
                  <div className="bg-white rounded-2xl p-6 xl:p-8 shadow-sm hover:shadow-md transition-shadow relative">
                    <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100">
                      06
                    </div>
                    <div className="relative z-10">
                      <div className="text-[#27BB97] mb-4 xl:mb-6">
                        {features[5].icon}
                      </div>
                      <h3 className="text-xl xl:text-2xl font-bold text-gray-900 mb-3 xl:mb-4">
                        {features[5].title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-base xl:text-lg">
                        {features[5].description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorAbout;
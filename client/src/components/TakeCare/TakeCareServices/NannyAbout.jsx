import React from 'react';
import { Award, Shuffle, BadgeCheck, Users, Clock, HandHeart } from 'lucide-react';

const NannyAbout = () => {
  const features = [
    {
      id: '01',
      icon: <Award className="w-10 h-10 text-[#27BB97]" />,
      title: 'We are the experts',
      description: 'Thousands of parents already love, trust, and rely on Sulekha for childcare.',
    },
    {
      id: '02',
      icon: <Shuffle className="w-10 h-10 text-[#27BB97]" />,
      title: 'Flexible Options',
      description: 'Choose from live-in, live-out, part-time, full-time, and weekend nannies to suit your schedule.',
    },
    {
      id: '03',
      icon: <BadgeCheck className="w-10 h-10 text-[#27BB97]" />,
      title: 'Quality Assurance',
      description: '97% satisfaction rate from clients, ensuring you receive top-notch care.',
    },
    {
      id: '04',
      icon: <Users className="w-10 h-10 text-[#27BB97]" />,
      title: 'Experienced Caregivers',
      description: 'With thousands of successful engagements, our nannies bring a wealth of experience to your home.',
    },
    {
      id: '05',
      icon: <Clock className="w-10 h-10 text-[#27BB97]" />,
      title: 'Quick Matches',
      description: 'Find the right nanny within 24 hours, ensuring no disruption in your childcare needs.',
    },
    {
      id: '06',
      icon: <HandHeart className="w-10 h-10 text-[#27BB97]" />,
      title: 'Peace of Mind',
      description: 'Knowing your children are in safe, caring hands allows you to focus on other priorities.',
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ABOUT <span className='text-[#27BB97]'>US</span> 
          </h2>
          <p className="text-gray-600 text-lg">
            Why Find a  <span className='text-[#27BB97]'> Nanny with Listify</span>?
          </p>
        </div>

        {/* Diamond Layout */}
        <div className="flex flex-col items-center">
          {/* First Row: Features 1 & 4 */}
          <div className="max-w-4xl mx-auto mb-8 lg:mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100">
                  01
                </div>
                <div className="relative z-10">
                  <div className="text-blue-900 mb-4">
                    {features[0].icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {features[0].title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {features[0].description}
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100">
                  04
                </div>
                <div className="relative z-10">
                  <div className="text-blue-900 mb-4">
                    {features[3].icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {features[3].title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {features[3].description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row: Feature 2 + Image + Feature 5 */}
          <div className="max-w-7xl mx-auto mb-8 lg:mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              {/* Feature 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative h-full">
                <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100">
                  02
                </div>
                <div className="relative z-10">
                  <div className="text-blue-900 mb-4">
                    {features[1].icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {features[1].title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {features[1].description}
                  </p>
                </div>
              </div>

              {/* Center Image */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 border-4 border-dashed border-gray-300 rounded-full animate-pulse"></div>
                  <div className="relative rounded-full overflow-hidden w-64 h-64 md:w-80 md:h-80 border-8 border-white shadow-xl">
                    <img
                      src="/nanny-care-2.jpg"
                      alt="Nanny with child"
                      className="w-full h-full object-cover object-right hover:scale-105 transition-transform duration-500 "
                    />
                  </div>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative h-full">
                <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100">
                  05
                </div>
                <div className="relative z-10">
                  <div className="text-blue-900 mb-4">
                    {features[4].icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {features[4].title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {features[4].description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Third Row: Features 3 & 6 */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Feature 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100">
                  03
                </div>
                <div className="relative z-10">
                  <div className="text-blue-900 mb-4">
                    {features[2].icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {features[2].title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {features[2].description}
                  </p>
                </div>
              </div>

              {/* Feature 6 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative">
                <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100">
                  06
                </div>
                <div className="relative z-10">
                  <div className="text-blue-900 mb-4">
                    {features[5].icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {features[5].title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {features[5].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NannyAbout;
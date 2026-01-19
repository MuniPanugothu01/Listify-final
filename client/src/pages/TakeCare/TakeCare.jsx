import React from "react";
import HeroPage from "../../components/TakeCare/HeroPage.jsx";
import RecentCare from "../../components/TakeCare/RecentCare.jsx";
import CareServices from "../../components/TakeCare/CareServices.jsx";
import AllServices from "../../components/TakeCare/AllServices.jsx";
import EasyServices from "../../components/TakeCare/EasyServices.jsx";
import FeaturedServices from "../../components/TakeCare/FeaturedServices.jsx";
import HowItWorks from "../../components/TakeCare/HowItWorks.jsx";
import WhyChooseUs from "../../components/TakeCare/WhyChooseUs.jsx";

const TakeCare = () => {
  // Data
  const serviceTypesData = [
    {
      id: "childcare",
      title: "Child Care",
      description: "Now! It's easy to find affordable care services for your child. From babysitter for a night to daily child care, we have it all.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      services: [
        "Nannies",
        "Babysitter", 
        "Tutors",
        "Daycare Centers",
        "Nanny Jobs",
        "Babysitter Jobs",
        "Tutoring Jobs"
      ],
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&h=300&fit=crop"
    },
    {
      id: "homecare",
      title: "Home Care",
      description: "Missing the taste of home-cooked food? Faced with an untidy home? From cooking services to housekeeping, we have it all.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      services: [
        "Housekeeping",
        "Cooking",
        "Part Time Cooking",
        "Part Time Housekeeping",
        "Housekeeping Jobs",
        "Cooking Jobs",
        "Care Jobs"
      ],
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop"
    },
    {
      id: "eldercare",
      title: "Elder Care",
      description: "Do your elderly parents need care while you're away? We offer full-time and part-time senior caretakers, we have it all.",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
      services: [
        "Elder Care Individuals",
        "Elder Care Centers",
        "Senior Care",
        "Elder Care Jobs",
        "Nurse Jobs",
        "Elder Care Center Jobs",
        "Adult Daycare"
      ],
      image: "elder-care-5.jpg"
    }
  ];

  const easyServicesData = [
    {
      id: "nanny",
      title: "Nanny",
      description: "Hire professional nannies with a good track record. Connect with a professional nanny for your naughty baby.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w-400&h=300&fit=crop",
      color: "from-pink-500 to-rose-500"
    },
    {
      id: "babysitter",
      title: "Babysitter",
      description: "Hire a babysitter to keep your baby happy! Know the babysitter who will know your baby better.",
      image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&h=300&fit=crop",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "cook",
      title: "Cook",
      description: "Appoint a cook who cooks, shares, and cares! Connect with a cook for delicious food daily.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      color: "from-orange-500 to-amber-500"
    },
    {
      id: "housekeeper",
      title: "Housekeeper",
      description: "Book a housekeeper for a hygienic house. Hire a housekeeper with good organizing skills for your home.",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "eldercare-provider",
      title: "Eldercare provider/Nurse",
      description: "Connect with trusted Elder care providers. Learn more about the most-reliable elder care providers.",
      image: "elder-care-3.jpg",
      color: "from-purple-500 to-violet-500"
    },
    {
      id: "daycare-center",
      title: "Daycare center",
      description: "Know more about the daycare that cares for your child! Connect with the best daycare who cares.",
      image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&h=300&fit=crop",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: "family-childcare",
      title: "Family child care center",
      description: "Get in touch with the best family child care center. Enquire now about top-class family child care center.",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
      color: "from-teal-500 to-cyan-500"
    },
    {
      id: "pet-care",
      title: "Pet care provider",
      description: "Hire the best pet care provider in the town to express your love for your pet. Get in touch with the most experienced pet care provider.",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
      color: "from-indigo-500 to-blue-500"
    }
  ];

  const featuredProvidersData = [
    {
      id: 1,
      name: "Little Sunshine Daycare",
      type: "Day Care Center",
      rating: 4.9,
      reviews: 247,
      price: "$$",
      location: "Downtown, NY",
      distance: "0.5 mi",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
      features: ["Certified Staff", "24/7 CCTV", "Healthy Meals", "Play Area"],
      availability: "3 spots left",
      verified: true,
      badge: "Top Rated",
    },
    {
      id: 2,
      name: "Nanny Mary Care",
      type: "Nanny Service",
      rating: 4.8,
      reviews: 132,
      price: "$$$",
      location: "Upper East Side",
      distance: "1.2 mi",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      features: [
        "10+ Years Exp",
        "CPR Certified",
        "Multilingual",
        "Flexible Hours",
      ],
      availability: "Available Now",
      verified: true,
      badge: "Featured",
    },
    {
      id: 3,
      name: "Play & Learn Preschool",
      type: "Preschool",
      rating: 4.7,
      reviews: 185,
      price: "$$",
      location: "Midtown",
      distance: "2.1 mi",
      image: "care-center-2.jpg",
      features: ["Montessori", "STEM Program", "Outdoor Play", "Art Classes"],
      availability: "Enrolling Now",
      verified: true,
      badge: "Best Value",
    },
    {
      id: 4,
      name: "Happy Tails Pet Care",
      type: "Pet Care Service",
      rating: 4.9,
      reviews: 98,
      price: "$$",
      location: "Brooklyn, NY",
      distance: "3.4 mi",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d",
      features: ["Experienced Sitters", "Daily Updates", "Pet Grooming", "Vet Visits"],
      availability: "Limited Slots",
      verified: true,
      badge: "Highly Recommended",
    },
    {
      id: 5,
      name: "ElderCare Plus",
      type: "Eldercare Service",
      rating: 4.8,
      reviews: 76,
      price: "$$$",
      location: "Queens, NY",
      distance: "4.0 mi",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      features: ["24/7 Care", "Medical Assistance", "Companionship", "Physical Therapy"],
      availability: "Contact for Availability",
      verified: true,
      badge: "Top Choice",
    },
    {
      id: 6,
      name: "Chef's Delight Home Cooking",
      type: "Cooking Service",
      rating: 4.9,
      reviews: 54,
      price: "$$",
      location: "Manhattan, NY",
      distance: "1.5 mi",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136",
      features: ["Custom Menus", "Healthy Options", "Event Catering", "Dietary Needs"],
      availability: "Book Now",
      verified: true,
      badge: "Customer Favorite",
    },
  ];


  

  // Function to handle service click
  const handleServiceClick = (serviceId) => {
    console.log(`Navigating to: ${serviceId}`);
    // Add your routing logic here
    // Example: router.push(`/services/${serviceId}`);
  };

  return (
    <div className="">
      <HeroPage />
      <RecentCare/>
      <CareServices/>
      <main className="max-w-7xl mx-auto ">
        <AllServices 
          services={serviceTypesData} 
          onServiceClick={handleServiceClick}
        />
        
        <EasyServices
          services={easyServicesData} 
          onServiceClick={handleServiceClick}
        />
        
        <FeaturedServices providers={featuredProvidersData} />
        
      
      </main>
        <HowItWorks />
        
        <WhyChooseUs />
    </div>
  );
};

export default TakeCare;
import React from 'react';
import { MapPin, Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ApartmentCard = ({ image, title, city, state, zip, rating = 4.5, onClick }) => (
  <div 
    className="
      group cursor-pointer bg-white rounded-lg border border-gray-200 
      overflow-hidden transition-all duration-300 
      hover:shadow-md hover:-translate-y-1
    "
    onClick={onClick}
  >
    {/* Card Wrapper */}
    <div className="
      group cursor-pointer bg-white rounded-lg border border-gray-200 
      overflow-hidden transition-all duration-300 
      hover:shadow-md hover:-translate-y-1
    ">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="
            w-full h-40 object-cover 
            transition-transform duration-500 ease-out 
            group-hover:scale-105
          "
        />

        {/* Verified Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-[#27bb97] text-white text-xs font-semibold px-3 py-1 rounded-full">
            Verified
          </span>
        </div>
      </div>
    </div>

    {/* Content */}
    <div className="p-4">
      {/* Title + Rating */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-gray-900 font-semibold text-base line-clamp-1">
          {title}
        </h3>

        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-semibold text-gray-700">{rating}</span>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-start gap-1 text-gray-600 text-sm mb-3">
        <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <span className="truncate">{city}, {state}, {zip}</span>
      </div>

      {/* Price + Button */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-gray-600 text-sm">
          Starting at <span className="font-semibold text-blue-500">$2,850</span> <span className='font-semibold text-blue-500'>/mo </span> 
        </span>

        <button className="
          opacity-0 group-hover:opacity-100 transition-opacity duration-200
          flex items-center gap-1 text-[#27bb97] text-sm font-medium
        ">
          View Details
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

export default function ApartmentListings() {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/rentals-listings');
  };

  const apartments = [
    {
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      title: "Ravens Crest Apartments",
      city: "Plainsboro",
      state: "NJ",
      zip: "08536",
      rating: 4.8
    },
    {
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      title: "Renaissance Properties Apartments",
      city: "North Brunswick",
      state: "NJ",
      zip: "08902",
      rating: 4.6
    },
    {
      image: "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800",
      title: "Woodbridge Gardens",
      city: "Avenel",
      state: "NJ",
      zip: "07001",
      rating: 4.7
    },
    {
      image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
      title: "201 St Pauls Apartments",
      city: "Jersey City",
      state: "NJ",
      zip: "07306",
      rating: 4.4
    },
    {
      image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800",
      title: "Margate Tenants Corporation",
      city: "Edison",
      state: "NJ",
      zip: "08837",
      rating: 4.9
    },
    {
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
      title: "Rivendell Apartments At Edison",
      city: "Edison",
      state: "NJ",
      zip: "08817",
      rating: 4.5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Explore Apartments in and around New York, NY
        </h1>

        <p className="text-gray-600 mb-8">
          {apartments.length} Verified Listings
        </p>

        {/* Apartments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartments.map((apt, index) => (
            <ApartmentCard 
              key={index} 
              {...apt} 
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
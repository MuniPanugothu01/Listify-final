import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Heart,
  Share2,
  MessageCircle,
  MapPin,
  ChevronRight,
  Star,
  Check,
  Clock,
  Shield,
  Calendar,
  Users,
  Ticket,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Verified,
} from 'lucide-react';
import { FaMinus, FaPlus } from 'react-icons/fa';

// Import events data (in real app, this would be from API or context)
import { eventsData } from './EventsListing';

// Static Map Component for Events
const EventLocationMap = ({ location }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-8">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-[#27bb97]" />
          Event Location
        </h3>
        <p className="text-gray-600 mt-2">{location}</p>
      </div>
      
      <div className="relative h-64 sm:h-72 md:h-80 bg-gray-100">
        {/* Map-like background with grid */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-50">
          {/* Grid lines */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, #cbd5e1 1px, transparent 1px),
              linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
          
          {/* Location pin */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <MapPin className="w-12 h-12 text-[#27bb97] animate-pulse" />
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#27bb97] rounded-full"></div>
            </div>
          </div>
          
          {/* Location label */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-white px-4 py-2 rounded-lg shadow-lg text-center">
              <p className="font-medium text-gray-800">{location}</p>
              <p className="text-xs text-gray-500 mt-1">Exact address provided after ticket purchase</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <Ticket className="w-4 h-4 mr-2" />
            <span>Local pickup available</span>
          </div>
          <button className="text-sm text-[#27bb97] hover:text-[#1fa987] font-medium">
            Get directions →
          </button>
        </div>
      </div>
    </div>
  );
};

// Organizer Details Component
const OrganizerDetails = ({ organizer, rating, reviews, joined }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Organizer Information</h3>
        <button className="text-[#27bb97] text-sm font-medium hover:text-[#1fa987]">
          View Profile →
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-[#27bb97] to-[#1E9E7E] rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {organizer[0].toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-bold text-gray-900 text-lg">{organizer}</h4>
            <Verified className="w-5 h-5 text-blue-500" />
          </div>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
            <span className="text-sm text-gray-500 ml-2">({reviews} reviews)</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1.5" />
              <span>42 events hosted</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1.5" />
              <span>Joined {joined}</span>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full py-3 bg-[#27bb97] hover:bg-[#1fa987] text-white rounded-lg font-medium transition-colors mb-4 flex items-center justify-center">
        <MessageCircle className="w-5 h-5 mr-2" />
        Contact Organizer
      </button>

      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">98%</div>
          <div className="text-xs text-gray-500">Response Rate</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">94%</div>
          <div className="text-xs text-gray-500">Satisfaction</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">100%</div>
          <div className="text-xs text-gray-500">Verified Events</div>
        </div>
      </div>
    </div>
  );
};

// Main Event Detail Component
const EventsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = eventsData.find((p) => p.id === parseInt(id));
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Additional images for gallery
  const eventImages = [
    event?.image,
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
    'https://images.unsplash.com/photo-1492684223066-e9e4aab4d25e?w=800&q=80',
  ].filter(Boolean);

  const handleThumbnailClick = (index) => setSelectedImageIndex(index);
  const handlePrevImage = () =>
    setSelectedImageIndex((prev) => (prev === 0 ? eventImages.length - 1 : prev - 1));
  const handleNextImage = () =>
    setSelectedImageIndex((prev) => (prev === eventImages.length - 1 ? 0 : prev + 1));

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center p-6 sm:p-8 bg-white rounded-2xl shadow-lg w-full max-w-md">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Ticket className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Event not found</h2>
          <button
            onClick={() => navigate('/events')}
            className="px-6 py-3 bg-[#27bb97] text-white rounded-lg hover:bg-[#1E9E7E] transition-colors font-medium text-base sm:text-lg"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  // Event details for the sidebar
  const eventDetails = [
    { icon: <Calendar className="text-[#27bb97] text-xl" />, label: 'Date', value: event.date },
    { icon: <Clock className="text-[#27bb97] text-xl" />, label: 'Time', value: event.time },
    { icon: <Users className="text-[#27bb97] text-xl" />, label: 'Age Restriction', value: event.ageRestriction },
    { icon: <Ticket className="text-[#27bb97] text-xl" />, label: 'Tickets Available', value: `${event.ticketsAvailable} remaining` },
  ];

  // Event specifications
  const eventSpecs = [
    { icon: <Clock className="text-[#27bb97] text-xl" />, label: 'Duration', value: '3-4 hours' },
    { icon: <Users className="text-[#27bb97] text-xl" />, label: 'Group Size', value: 'Small group (max 20)' },
    { icon: <Shield className="text-[#27bb97] text-xl" />, label: 'Dress Code', value: event.dressCode },
    { icon: <Check className="text-[#27bb97] text-xl" />, label: 'Included', value: 'All equipment & materials' },
  ];

  // Find similar events (same category)
  const similarEvents = eventsData
    .filter((e) => e.id !== event.id && e.category === event.category)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navigation */}
      <div className="bg-white shadow-sm top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-1.5 sm:space-x-2 text-sm text-gray-600 min-w-0 flex-1">
              <button
                onClick={() => navigate('/events')}
                className="hover:text-[#27bb97] transition-colors whitespace-nowrap"
              >
                Events
              </button>
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium text-gray-900 truncate">{event.title}</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-8">
          {/* Left Column - 60% */}
          <div className="lg:col-span-6">
            {/* Main Image */}
            <div className="rounded-md mb-6 shadow-sm overflow-hidden bg-white">
              <div className="relative">
                <img
                  src={eventImages[selectedImageIndex]}
                  alt={event.title}
                  className="w-full h-auto max-h-[500px] rounded-md object-cover bg-gray-50"
                />
                
                {/* Navigation Buttons */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all hover:shadow-xl z-20"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all hover:shadow-xl z-20"
                >
                  <ChevronRightIcon className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mb-8">
              {eventImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer transition-all ${
                    selectedImageIndex === index
                      ? 'border-2 border-[#27bb97] shadow-md'
                      : 'hover:border-2 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    className="w-full h-full object-cover"
                    alt={`Thumbnail ${index + 1}`}
                  />
                </button>
              ))}
            </div>

            {/* Location Map */}
            <EventLocationMap location={event.location} />

            {/* Event Description */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Event Description</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {event.description}
              </p>
              
              <div className="pt-6 border-t border-gray-100">
                <h4 className="text-lg font-semibold mb-3">Event Highlights</h4>
                <ul className="space-y-2">
                  {event.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-[#27bb97] mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - 40% */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Event Info Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#27bb97]/10 text-[#1E9E7E]">
                    {event.category}
                  </span>
                </div>
                
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {event.title}
                </h2>
                
                {/* Price */}
                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-1 font-medium">
                    PRICE PER TICKET
                  </div>
                  <div className="text-4xl font-bold text-[#27bb97]">
                    ${event.price}
                  </div>
                </div>

                {/* Event Details */}
                <div className="space-y-4 mb-6">
                  {eventDetails.map((detail, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <div className="w-8 h-8 flex items-center justify-center mr-3">
                        {detail.icon}
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">{detail.label}</div>
                        <div className="font-medium">{detail.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-gray-700 font-medium">Tickets:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition"
                    >
                      <FaMinus className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                    <span className="text-xl font-semibold w-10 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition"
                    >
                      <FaPlus className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full py-4 bg-[#27bb97] hover:bg-[#1fa987] text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg">
                    <Ticket className="w-5 h-5 inline mr-2" />
                    Get Tickets (${event.price * quantity})
                  </button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:border-gray-300 transition-colors">
                      Save for Later
                    </button>
                    <button className="py-3 bg-white border-2 border-[#27bb97] text-[#27bb97] rounded-lg font-medium hover:bg-[#27bb97]/5 transition-colors">
                      <Heart className="w-4 h-4 inline mr-2" />
                      Save Event
                    </button>
                  </div>
                </div>
              </div>

              {/* Event Specifications */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4 text-gray-700">
                  Event Details
                </h3>
                <div className="grid grid-cols-2 gap-y-4">
                  {eventSpecs.map((spec, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg">
                        {spec.icon}
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">{spec.label}</div>
                        <div className="text-sm font-medium text-gray-700">{spec.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Organizer Info */}
              <OrganizerDetails
                organizer={event.organizer}
                rating={event.organizerRating}
                reviews={event.organizerReviews}
                joined={event.organizerJoined}
              />
            </div>
          </div>
        </div>

        {/* Similar Events */}
        {similarEvents.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Similar {event.category} Events</h2>
              <button 
                onClick={() => navigate('/events')}
                className="text-[#27bb97] hover:text-[#1E9E7E] font-medium"
              >
                View all events →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarEvents.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/event/${item.id}`)}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden"
                >
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded-full">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{item.date}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.description?.substring(0, 80)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-[#27bb97]">
                        ${item.price}
                      </span>
                      <span className="text-xs font-medium text-gray-500 px-3 py-1.5 bg-gray-100 rounded-full">
                        <Users className="w-3 h-3 inline mr-1" />
                        {item.ticketsAvailable} left
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsDetail;
import React from "react";
import { Heart, MapPin, Bed, Bath, Square, Eye, Share2 } from "lucide-react";

const PropertyCard = ({ property, onToggleSave, isMyPost = false, showSaveButton = true }) => (
  <div className="group bg-white rounded-xl md:rounded-2xl border border-gray-200 overflow-hidden hover:border-emerald-300 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
    <div className="relative overflow-hidden flex-shrink-0">
      <img
        src={property.images[0]}
        alt={property.title}
        className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      
      {/* Badges */}
      <div className="absolute top-3 left-3 flex gap-2">
        <span className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs font-semibold ${
          property.type === "rent"
            ? "bg-emerald-500 text-white"
            : "bg-blue-500 text-white"
        }`}>
          {property.type === "rent" ? "FOR RENT" : "FOR SALE"}
        </span>
        {property.featured && (
          <span className="px-2 py-1 md:px-3 md:py-1.5 bg-amber-500 text-white rounded-full text-xs font-semibold">
            FEATURED
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="absolute top-3 right-3 flex flex-col gap-2">
        {showSaveButton && (
          <button
            onClick={() => onToggleSave && onToggleSave(property)}
            className="w-8 h-8 md:w-10 md:h-10 bg-white hover:bg-gray-50 rounded-lg md:rounded-xl flex items-center justify-center transition-all shadow-sm hover:shadow-md"
          >
            <Heart className="w-4 h-4 md:w-5 md:h-5 fill-red-500 text-red-500" />
          </button>
        )}
        <button className="w-8 h-8 md:w-10 md:h-10 bg-white hover:bg-gray-50 rounded-lg md:rounded-xl flex items-center justify-center transition-all shadow-sm hover:shadow-md">
          <Share2 className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-3 left-3">
        <span className="px-2 py-1 md:px-3 md:py-1.5 bg-white/90 backdrop-blur-sm text-gray-900 rounded-lg md:rounded-xl text-xs font-semibold">
          {property.posted}
        </span>
      </div>
    </div>

    <div className="p-4 md:p-6 flex-1 flex flex-col">
      <div className="mb-4 flex-1">
        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 line-clamp-1">
          {property.title}
        </h3>
        <p className="text-gray-600 text-xs md:text-sm line-clamp-2 mb-3">
          {property.description}
        </p>
        
        <div className="flex items-center text-gray-500 text-xs md:text-sm mb-4">
          <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-emerald-500" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        {property.bedrooms && (
          <div className="flex items-center justify-between text-gray-500 text-xs md:text-sm p-2 md:p-3 bg-gray-50 rounded-lg md:rounded-xl mb-4">
            <div className="flex items-center">
              <Bed className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-blue-500" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="h-3 w-px bg-gray-300"></div>
            <div className="flex items-center">
              <Bath className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-blue-500" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="h-3 w-px bg-gray-300"></div>
            <div className="flex items-center">
              <Square className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-blue-500" />
              <span>{property.sqft} sqft</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
        <div>
          <span className="text-lg md:text-xl font-bold text-emerald-600">
            {property.type === "rent"
              ? `$${property.price.toLocaleString()}/mo`
              : `$${property.price.toLocaleString()}`}
          </span>
          {property.type === "sale" && (
            <div className="text-xs md:text-sm text-gray-500 mt-1">$2,450/month</div>
          )}
        </div>
        <button className={`px-3 py-1.5 md:px-4 md:py-2.5 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm transition-colors ${
          isMyPost 
            ? "bg-emerald-500 text-white hover:bg-emerald-600" 
            : "bg-emerald-500 text-white hover:bg-emerald-600"
        } shadow-sm hover:shadow whitespace-nowrap`}>
          {isMyPost ? "Edit" : "View"}
        </button>
      </div>
    </div>
  </div>
);

export default PropertyCard;
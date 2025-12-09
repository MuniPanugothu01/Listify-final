import React from "react";

const AgendaEvent = ({ event, day }) => (
  <div className={`rounded-xl p-3 md:p-4 bg-white border border-gray-200 shadow-xs transition-all duration-200 hover:shadow-sm hover:border-emerald-200 ${
    event.group ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-blue-500'
  }`}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-md">
        {event.time}
      </span>
      {event.group ? (
        <div className="flex -space-x-2">
          {event.avatars.map((src, i) => (
            <div key={i} className="relative">
              <img 
                src={src} 
                alt="" 
                className="w-6 h-6 md:w-7 md:h-7 rounded-full object-cover border-2 border-white shadow-xs" 
              />
              {i === 0 && (
                <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-emerald-500 rounded-full border border-white"></div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="relative">
          <img 
            src={event.avatar} 
            alt={event.client} 
            className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover border-2 border-white shadow-xs" 
          />
          <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-blue-500 rounded-full border border-white"></div>
        </div>
      )}
    </div>
    <h4 className="text-sm font-semibold text-gray-900 truncate mb-1">{event.title}</h4>
    {event.client && (
      <p className="text-xs text-gray-600 flex items-center gap-1">
        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
        {event.client}
      </p>
    )}
  </div>
);

export default AgendaEvent;
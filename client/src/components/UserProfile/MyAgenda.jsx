import React from "react";
import { ChevronRight, Calendar } from "lucide-react";
import AgendaEvent from "./AgendaEvent";

const MyAgenda = ({ events }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const currentDay = 2; // Wednesday

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-900">Upcoming Viewings</h3>
          <p className="text-gray-500 text-xs md:text-sm mt-1">Manage your property viewings</p>
        </div>
        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 transition-colors">
          View all
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Calendar Navigation */}
      <div className="mb-4 md:mb-6">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
            <span className="font-medium text-gray-900 text-sm md:text-base">This Week</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 md:px-3 md:py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
              ←
            </button>
            <button className="px-2 py-1 md:px-3 md:py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
              →
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, i) => (
            <div 
              key={i} 
              className={`text-center py-2 px-1 md:py-3 md:px-1 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all ${
                i === currentDay 
                  ? 'bg-emerald-500 text-white shadow-sm' 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              <div>{day}</div>
              <div className="mt-1 text-xs opacity-75">{i + 10}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-2 md:space-y-3 max-h-48 md:max-h-60 overflow-y-auto pr-2">
        {Object.entries(events).map(([day, dayEvents]) => (
          dayEvents.map((event, i) => <AgendaEvent key={i} event={event} day={day} />)
        ))}
      </div>

      <div className="pt-4 md:pt-6 border-t border-gray-100 mt-4">
        <button className="w-full py-3 px-4 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-semibold flex items-center justify-center gap-2 text-sm md:text-base">
          <Calendar className="w-4 h-4 md:w-5 md:h-5" />
          Schedule New Viewing
        </button>
      </div>
    </div>
  );
};

export default MyAgenda;
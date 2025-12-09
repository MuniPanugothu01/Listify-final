import React from "react";

const StatsCard = ({ title, value, color = "emerald", icon: Icon, trend }) => {
  const colorClasses = {
    emerald: "bg-emerald-50 border-emerald-200",
    blue: "bg-blue-50 border-blue-200",
    amber: "bg-amber-50 border-amber-200",
    purple: "bg-purple-50 border-purple-200",
  };

  const iconColors = {
    emerald: "text-emerald-600",
    blue: "text-blue-600",
    amber: "text-amber-600",
    purple: "text-purple-600",
  };

  return (
    <div className={`${colorClasses[color]} rounded-2xl border p-4 md:p-6`}>
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div>
          <p className="text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">{title}</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 md:w-6 md:h-6 ${iconColors[color]}`} />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-xs md:text-sm">
          <span className={`font-medium ${trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
            {trend}
          </span>
          <span className="text-gray-500">from last month</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
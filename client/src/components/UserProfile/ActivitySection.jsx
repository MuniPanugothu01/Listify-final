import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  History,
  LogIn,
  MapPin,
  Smartphone,
  Globe,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { fetchLoginHistory } from "../../redux/slices/profileSlice";

const ActivitySection = ({ loginHistory: propLoginHistory }) => {
  const dispatch = useDispatch();
  const { loginHistory: stateLoginHistory, loading } = useSelector((state) => state.profile);
  const loginHistory = propLoginHistory || stateLoginHistory || [];

  useEffect(() => {
    if (!propLoginHistory) {
      dispatch(fetchLoginHistory());
    }
  }, [dispatch, propLoginHistory]);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Account Activity</h2>
        <p className="text-gray-500 text-sm mt-1">
          Review your recent account activity and login history
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {loginHistory.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {loginHistory.map((activity, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                      {activity.success ? (
                        <LogIn className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {activity.success ? 'Logged in' : 'Failed login attempt'}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity.success 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {activity.loginType || 'email'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      {activity.deviceName && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Smartphone className="w-4 h-4 text-gray-400" />
                          <span>{activity.deviceName}</span>
                        </div>
                      )}

                      {activity.location && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{activity.location}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{formatDate(activity.timestamp)}</span>
                      </div>
                    </div>

                    {!activity.success && activity.failureReason && (
                      <div className="mt-3 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                        {activity.failureReason}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <History className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No activity found</h3>
            <p className="text-gray-500">Your login history will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitySection;
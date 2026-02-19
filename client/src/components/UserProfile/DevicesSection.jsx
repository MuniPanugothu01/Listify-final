import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  Smartphone, 
  Laptop, 
  Tablet, 
  Globe, 
  Clock, 
  MapPin, 
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { fetchDevices, revokeDevice } from "../../redux/slices/profileSlice";
import { toast } from "react-toastify";

const DevicesSection = ({ devices: propDevices }) => {
  const dispatch = useDispatch();
  const { devices: stateDevices, loading } = useSelector((state) => state.profile);
  const devices = propDevices || stateDevices || [];

  useEffect(() => {
    if (!propDevices) {
      dispatch(fetchDevices());
    }
  }, [dispatch, propDevices]);

  const handleRevokeDevice = async (deviceId) => {
    try {
      await dispatch(revokeDevice(deviceId)).unwrap();
      toast.success("Device revoked successfully");
    } catch (error) {
      toast.error(error || "Failed to revoke device");
    }
  };

  const getDeviceIcon = (deviceType) => {
    switch (deviceType?.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="w-6 h-6 text-emerald-500" />;
      case 'tablet':
        return <Tablet className="w-6 h-6 text-blue-500" />;
      case 'desktop':
        return <Laptop className="w-6 h-6 text-purple-500" />;
      default:
        return <Globe className="w-6 h-6 text-gray-500" />;
    }
  };

  const getDeviceStatus = (device) => {
    if (device.isCurrentDevice) {
      return {
        label: "Current Device",
        color: "text-emerald-600 bg-emerald-50",
        icon: CheckCircle
      };
    }
    
    const lastSeen = new Date(device.lastSeen);
    const now = new Date();
    const hoursDiff = (now - lastSeen) / (1000 * 60 * 60);
    
    if (hoursDiff < 24) {
      return {
        label: "Active Today",
        color: "text-blue-600 bg-blue-50",
        icon: CheckCircle
      };
    } else if (hoursDiff < 168) {
      return {
        label: "Active This Week",
        color: "text-amber-600 bg-amber-50",
        icon: AlertCircle
      };
    } else {
      return {
        label: "Inactive",
        color: "text-gray-600 bg-gray-50",
        icon: XCircle
      };
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
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Devices & Sessions</h2>
        <p className="text-gray-500 text-sm mt-1">
          Manage devices where you're currently logged in
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {devices.length > 0 ? (
            devices.map((device) => {
              const StatusIcon = getDeviceStatus(device).icon;
              const status = getDeviceStatus(device);
              
              return (
                <div key={device.deviceId} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        {getDeviceIcon(device.deviceType)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {device.deviceName}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                          <StatusIcon className="w-3 h-3 inline mr-1" />
                          {status.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <span>
                            {device.browser} on {device.os}
                          </span>
                        </div>

                        {device.location && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{device.location}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>Last active: {device.lastActiveText}</span>
                        </div>
                      </div>
                    </div>

                    {!device.isCurrentDevice && (
                      <button
                        onClick={() => handleRevokeDevice(device.deviceId)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No devices found</h3>
              <p className="text-gray-500">Your logged-in devices will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DevicesSection;
import { useDispatch, useSelector } from "react-redux";

// Basic hooks
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Auth hooks
export const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return { ...auth, dispatch };
};

// Profile hooks
export const useProfile = () => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  return { ...profile, dispatch };
};

// Devices hooks
export const useDevices = () => {
  const devices = useSelector((state) => state.devices);
  const dispatch = useDispatch();
  return { ...devices, dispatch };
};

// Listings hooks
export const useListings = () => {
  const listings = useSelector((state) => state.listings);
  const dispatch = useDispatch();
  return { ...listings, dispatch };
};

// Messages hooks
export const useMessages = () => {
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  return { ...messages, dispatch };
};

// Activity hooks
export const useActivity = () => {
  const activity = useSelector((state) => state.activity);
  const dispatch = useDispatch();
  return { ...activity, dispatch };
};

// Combined hooks for profile page
export const useProfilePage = () => {
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const devices = useSelector((state) => state.devices);
  const listings = useSelector((state) => state.listings);
  const messages = useSelector((state) => state.messages);
  const activity = useSelector((state) => state.activity);

  return {
    auth,
    profile,
    devices,
    listings,
    messages,
    activity,
  };
};

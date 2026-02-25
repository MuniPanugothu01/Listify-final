import {
  fetchMyListings,
  fetchSavedItems,
  toggleSaveItem,
  fetchAlerts,
  clearListingsError,
  resetListingsSuccess,
  addSavedItem,
  removeSavedItem,
} from "../slices/listingsSlice";

export const listingActions = {
  // Fetch my listings
  getMyListings: () => async (dispatch) => {
    try {
      const result = await dispatch(fetchMyListings()).unwrap();
      return { success: true, listings: result.listings };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Fetch saved items
  getSavedItems: () => async (dispatch) => {
    try {
      const result = await dispatch(fetchSavedItems()).unwrap();
      return { success: true, savedItems: result.savedItems };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Toggle save item
  toggleSaveItem: (itemId) => async (dispatch, getState) => {
    try {
      const { listings } = getState();
      const isSaved = listings.savedHouses.some((item) => item.id === itemId);

      // Optimistic update
      if (isSaved) {
        dispatch(removeSavedItem(itemId));
      }

      const result = await dispatch(toggleSaveItem(itemId)).unwrap();

      return {
        success: true,
        isSaved: result.isSaved,
        item: result.item,
      };
    } catch (error) {
      // Revert optimistic update on error
      const { listings } = getState();
      const { originalItem } = error;
      if (originalItem) {
        dispatch(addSavedItem(originalItem));
      }
      return { success: false, error };
    }
  },

  // Fetch alerts
  getAlerts: () => async (dispatch) => {
    try {
      const result = await dispatch(fetchAlerts()).unwrap();
      return { success: true, alerts: result.alerts };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Create alert
  createAlert: (alertData) => async (dispatch) => {
    try {
      // This would need an API endpoint
      // const result = await listingsAPI.createAlert(alertData);
      // dispatch(addAlert(result.alert));
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Delete alert
  deleteAlert: (alertId) => async (dispatch) => {
    try {
      // This would need an API endpoint
      // await listingsAPI.deleteAlert(alertId);
      // dispatch(removeAlert(alertId));
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  },

  // Clear error
  clearError: () => (dispatch) => {
    dispatch(clearListingsError());
  },

  // Reset success
  resetSuccess: () => (dispatch) => {
    dispatch(resetListingsSuccess());
  },

  // Add saved item (optimistic)
  addSavedItem: (item) => (dispatch) => {
    dispatch(addSavedItem(item));
  },

  // Remove saved item (optimistic)
  removeSavedItem: (itemId) => (dispatch) => {
    dispatch(removeSavedItem(itemId));
  },
};

export default listingActions;

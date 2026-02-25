import api from "./api";

export const listingsAPI = {
  // Get my listings
  getMyListings: () => {
    return api.get("/listings/my-posts");
  },

  // Get saved items
  getSavedItems: () => {
    return api.get("/listings/saved");
  },

  // Toggle save item
  toggleSaveItem: (itemId) => {
    return api.post(`/listings/${itemId}/toggle-save`);
  },

  // Get alerts
  getAlerts: () => {
    return api.get("/alerts");
  },

  // Create alert
  createAlert: (alertData) => {
    return api.post("/alerts", alertData);
  },

  // Delete alert
  deleteAlert: (alertId) => {
    return api.delete(`/alerts/${alertId}`);
  },
};

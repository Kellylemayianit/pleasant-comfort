/* ============================================================
   services/dataLoader.js
   The ONLY data import surface pages/ and components/ should
   use. Re-exports api.js so the rest of the app never imports
   mockData.js or api.js directly — swapping the data source
   later means editing api.js alone.
   ============================================================ */

export {
  getProperty,
  getFeatures,
  getRooms,
  getRoomById,
  getAddOns,
  getEventEnquiries
} from './api.js';

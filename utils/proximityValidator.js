// utils/proximityValidator.js
const authorizedSSIDs = [
  "Airtel_Anshuman pandey",
  "My_Home_WiFi",
  "Campus_WiFi",
]; // add more as needed

exports.isDeviceAuthorized = ({ wifiSSID }) => {
  return authorizedSSIDs.includes(wifiSSID);
};

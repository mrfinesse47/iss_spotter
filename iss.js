/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

//geolocate example 'https://api.freegeoip.app/json/?apikey=???""

const { API_KEY } = require("./constants");
const request = require("request");
//const url = "https://api.ipify.org?format=json";

const fetchMyIP = (callback) => {
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
  // use request to fetch IP address from JSON API
};

const fetchMyLocation = (ipAddressV4, callback) => {
  const url = `https://api.freegeoip.app/json/${ipAddressV4}?apikey=${API_KEY}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const location = {
      latitude: JSON.parse(body).latitude,
      longitude: JSON.parse(body).longitude,
    };
    callback(null, location);
  });
};

module.exports = { fetchMyIP, fetchMyLocation };

// {
//   "latitude": num,
//   "longitude": num,
// }

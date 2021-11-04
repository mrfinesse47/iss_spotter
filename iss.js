/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request");
const url = "https://api.ipify.org?format=json";

const fetchMyIP = function (callback) {
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    //console.log(response.statusCode);
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
  // use request to fetch IP address from JSON API
};

module.exports = { fetchMyIP };

const { API_KEY } = require("./constants");
const request = require("request");

const nextISSTimesForMyLocation = function (callback) {
  // empty for now
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }
      console.log(loc);
      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, nextPasses);
      });
    });
  });
};

const fetchMyIP = (callback) => {
  const url = "https://api.ipify.org?format=json";
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
};

const fetchCoordsByIP = (ipAddressV4, callback) => {
  const url = `https://api.freegeoip.app/json/${ipAddressV4}?apikey=${API_KEY}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(Error(error), null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP.`;
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

const fetchISSFlyOverTimes = (coords, callback) => {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(Error(error), null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching iss pass times: ${body}.`;
      callback(Error(msg), null);
      return;
    }

    const issLocations = JSON.parse(body).response;

    callback(null, issLocations);
  });
};

module.exports = { nextISSTimesForMyLocation };

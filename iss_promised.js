const request = require("request-promise-native");
const { API_KEY } = require("./constants");

const fetchMyIP = function () {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function (body) {
  // console.log(ipAddressV4);
  const ip = JSON.parse(body).ip;

  return request(`https://api.freegeoip.app/json/${ip}?apikey=${API_KEY}`);
};

const fetchISSFlyOverTimes = (body) => {
  const coords = {
    latitude: JSON.parse(body).latitude,
    longitude: JSON.parse(body).longitude,
  };
  console.log(coords);

  return request(
    `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`
  );
};

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };

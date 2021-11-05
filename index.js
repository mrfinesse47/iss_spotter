// index.js
// const { fetchMyIP } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });

//50.92.242.56

// const { fetchCoordsByIP } = require("./iss");

// fetchCoordsByIP("50.92.242.56", (error, location) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned my location:", location);
// });

// const { fetchISSFlyOverTimes } = require("./iss");

// fetchISSFlyOverTimes("50.92.242.56", (error, response) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned data:", response);
// });

const { nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  printPassTimes(passTimes);
});

const printPassTimes = (passTimes) => {
  passTimes.forEach((pass) => {
    const date = new Date(0);
    date.setUTCSeconds(pass.risetime);
    // console.log(`Next pass at Fri Jun 01 2021 13:01:35 GMT-0700 (Pacific Daylight Time) for 465 seconds!`)
    console.log(`Next pass at ${date} for ${pass.duration} seconds!`);
  });
};

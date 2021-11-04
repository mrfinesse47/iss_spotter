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

const { fetchCoordsByIP } = require("./iss");

fetchCoordsByIP("50.92.242.56", (error, location) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned my location:", location);
});

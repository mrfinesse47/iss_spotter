const { nextISSTimesForMyLocation } = require("./iss_promised");

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });

const printPassTimes = (passTimes) => {
  passTimes.forEach((pass) => {
    const date = new Date(0);
    date.setUTCSeconds(pass.risetime);
    // console.log(`Next pass at Fri Jun 01 2021 13:01:35 GMT-0700 (Pacific Daylight Time) for 465 seconds!`)
    console.log(`Next pass at ${date} for ${pass.duration} seconds!`);
  });
};

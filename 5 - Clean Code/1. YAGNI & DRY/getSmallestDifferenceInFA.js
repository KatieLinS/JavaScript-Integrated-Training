const fs = require("fs");
const {
  extractDataFromSourceData,
  getSmallestDifference,
} = require("./helpers");

fs.readFile("./football.dat", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const dataArray = extractDataFromSourceData(
    data,
    0,
    1,
    { start: 7, end: 23 },
    { start: 43, end: 46 },
    { start: 50, end: 53 }
  );

  const teamWithSmallestDifferenceInFA = getSmallestDifference(dataArray);

  console.log("Team with smallest difference in 'For' and 'Against' goals: ", teamWithSmallestDifferenceInFA);
});

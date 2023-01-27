const fs = require("fs");
const {
  extractDataFromSourceData,
  getSmallestDifference,
} = require("./helpers");

fs.readFile("./weather.dat", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const dataArray = extractDataFromSourceData(
    data,
    1,
    2,
    { type: "number", start: 0, end: 5 },
    { start: 6, end: 8 },
    { start: 12, end: 14 }
  );

  const dayWithSmallestTempSpread = getSmallestDifference(dataArray);

  console.log("Day with smallest temperature spread: ", dayWithSmallestTempSpread);
});

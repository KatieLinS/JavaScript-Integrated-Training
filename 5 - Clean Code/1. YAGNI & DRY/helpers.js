function extractDataFromSourceData(
  sourceData,
  startingRow,
  endingRowFromEnd = 0,
  elementNameColumnAndType = {type: 'string'},
  maxColumnAndType = {type: 'number'},
  minColumnAndType = {type: 'number'},
) {

  let dataArray = [];

  sourceData.split(/\r?\n/).forEach((row, idx) => {
    if (
      idx > startingRow &&
      idx < sourceData.split(/\r?\n/).length - endingRowFromEnd
    ) {
      dataArray.push(row);
    }
  });

  return dataArray.map((element) => {
    const elementName = element.slice(elementNameColumnAndType.start, elementNameColumnAndType.end);
    const max = element.slice(maxColumnAndType.start, maxColumnAndType.end);
    const min = element.slice(minColumnAndType.start, minColumnAndType.end);
    return [
      elementNameColumnAndType.type === 'number' ? parseInt(elementName, 10) : elementName,
      maxColumnAndType.type === 'number' ? parseInt(max, 10) : max,
      minColumnAndType.type === 'number' ? parseInt(min, 10) : min,
    ];
  });

}

function getSmallestDifference(dataArray){
  const newArray = dataArray.map((element) => [element[0], Math.abs(element[1]-element[2])]);
  return newArray.sort((day1, day2) => day1[1] - day2[1])[0][0];
}

module.exports = { extractDataFromSourceData, getSmallestDifference }
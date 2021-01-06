const buses = require("./store");

const firstBus = () => {
//   const dataArray = buses
//     .split(",")
//     .slice(1)
//     .map(Number)
//     .map((bus) => {
//       return { [bus]: index };
//     })
//     .filter((busObj) => busObj[Object.keys(bus)[0]] !== NaN);

const dataArray = buses
    .split(",")
    .slice(1)
    .map(Number)
let busObject = {}
    for (let i = 0; i < dataArray.length; i++){
        if (!isNaN(dataArray[i])) busObject = {...busObject, [dataArray[i]]: i}
    }
  let max = Math.max(...Object.keys(busObject).map(Number));
  let myTime = max;
  let busKeys = Object.keys(busObject).sort((a, b) => Number(a) - Number(b))
  let indexToCheck = busKeys[busKeys.length - 2]
  let incrementer = max;
  while (indexToCheck >= 0) {
      if ((myTime + busObject[buskeys[indexToCheck]] - busObject[max]) % (Number(bus)) !== 0) {
        indexToCheck --;
        incrementer *= Number(buskeys[indexToCheck])
    }
    // console.log(myTime)
    myTime += (max)
  }
  return myTime - max - busObject[max];
};

console.log(firstBus());

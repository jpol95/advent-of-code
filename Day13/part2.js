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
  let indexToCheck = busKeys.length - 2
  let incrementer = max;
  while (indexToCheck >= 0) {
      const bus = busKeys[indexToCheck];
      const checking = myTime + busObject[bus] - busObject[max]
      if (myTime >= 2000){
          console.log("dbugger")
      }
      if ((myTime + busObject[bus] - busObject[max]) % (Number(bus)) === 0) {
        console.log(indexToCheck)
        indexToCheck --;
        incrementer *= Number(bus)
    }
    myTime += (incrementer)
  }
  return myTime - max - busObject[max];
};

console.log(firstBus());

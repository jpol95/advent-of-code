const buses = require("./store");

const firstBus = () => {
  const dataArray = buses.split(",");
  let myTime = Number(dataArray[0]) - 1;
  let originalTime = myTime + 1;
  const busArray = [];
  for (let bus of dataArray.slice(1)) {
    if (bus !== "x") busArray.push(Number(bus));
  }
  let firstBus;
  while (!firstBus) {
    myTime++;
    for (let bus of busArray) {
      if (myTime % bus === 0){ firstBus = bus;}
    }
  }
  return (myTime - originalTime) * firstBus;
};

console.log(firstBus())
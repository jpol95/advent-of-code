const directions = require("./directions-store");

const getDirectionTotal = () => {
  let horizontal = 0;
  let vertical = 0;
  let currentDirections = [
    { degree: 0, distance: 10 },
    { degree: 90, distance: 1 },
  ];
  const shipInfo = { horizontal, vertical, currentDirections };
  const directionArray = directions.split(/\n/).map((direction) => {
    return {
      [direction.substring(0, 1)]: Number(
        direction.substring(1, direction.length)
      ),
    };
  });
  for (let direction of directionArray) {
    processDirection(direction, shipInfo);
  }

  return Math.abs(shipInfo.vertical) + Math.abs(shipInfo.horizontal);
};

// const changeWayPoint = (directionObj, executable) => {
//     if (shipInfo.currentAngle % 180 === 0){
//         shipInfo.currentDirections.degree += units;
//     }
//     else shipInfo.currentDirections.orientation = "horizontal";

// }

const processAngle = (shipInfo) => {
  for (let direction of shipInfo.currentDirections) {
    if (direction.degree % 360 === 0) {
      shipInfo.horizontal += direction.distance;
      continue;
    } else if (direction.degree % 360 === 270) {
      shipInfo.vertical -= direction.distance;
      continue;
    } else if (direction.degree % 360 === 180) {
      shipInfo.horizontal -= direction.distance;
      continue;
    } else {
      shipInfo.vertical += direction.distance;
      continue;
    }
  }
};

processDirection = (direction, shipInfo) => {
  const key = Object.keys(direction)[0];
  const units = direction[key];
  const verticalObj =
    shipInfo.currentDirections[0].degree % 180 !== 0
      ? shipInfo.currentDirections[0]
      : shipInfo.currentDirections[1];
  const horizontalObj =
    shipInfo.currentDirections[0].degree % 180 === 0
      ? shipInfo.currentDirections[0]
      : shipInfo.currentDirections[1];
  const east = horizontalObj.degree % 360 === 0;
  const north = verticalObj.degree % 360 === 90;
  if (key === "F") {
    for (let i = 0; i < units; i++) {
      processAngle(shipInfo, units);
    }
    return;
  }
  if (key === "N") {
    if (north) verticalObj.distance += units;
    else verticalObj.distance -= units;
    return;
  }
  if (key === "S") {
    if (north) verticalObj.distance -= units;
    else verticalObj.distance += units;
    return;
  }
  if (key === "E") {
    if (east) horizontalObj.distance += units;
    else horizontalObj.distance -= units;
    return;
  }
  if (key === "W") {
    if (east) horizontalObj.distance -= units;
    else horizontalObj.distance += units;
    return;
  }
  if (key === "L") {
    verticalObj.degree += units;
    horizontalObj.degree += units;
    return;
  }
  if (key === "R") {
    verticalObj.degree += 360 - units;
    horizontalObj.degree += 360 - units;
    return;
  }
};

console.log(getDirectionTotal());

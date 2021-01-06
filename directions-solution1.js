const directions = require('./directions-store')


const getDirectionTotal = () => {
    let horizontal = 0;
    let vertical = 0;
    let currentAngle = 0;
    const shipInfo = {horizontal, vertical, currentAngle}
    const directionArray = directions.split(/\n/).map(direction => {return {[direction.substring(0,1)]: Number(direction.substring(1, direction.length))}})
    for (let direction of directionArray){
        processDirection(direction, shipInfo)
    } 

    return Math.abs(shipInfo.vertical) + Math.abs(shipInfo.horizontal)
}

const processAngle = (shipInfo, units) => {
    if (shipInfo.currentAngle % 360 === 0){
        shipInfo.horizontal += units;
        return;
    }
    else if (shipInfo.currentAngle % 360 === 270){
        shipInfo.vertical -= units;
        return;
    }
    else if (shipInfo.currentAngle % 360 === 180){
        shipInfo.horizontal -= units;
        return;
    }
    else {
        shipInfo.vertical += units;
        return;
    }
}

processDirection = (direction, shipInfo) => {
    const key = Object.keys(direction)[0]
    const units = direction[key]
    if (key === 'F'){
        processAngle(shipInfo, units)
        return
    }
    if (key === 'N'){
        shipInfo.vertical += units;
        return;
    }
    if (key === 'S'){
        shipInfo.vertical -= units;
        return;
    }
    if (key === 'E'){
        shipInfo.horizontal += units;
        return;
    }
    if (key === 'W'){
        shipInfo.horizontal -= units;
        return;
    }
    if (key === 'L'){
        shipInfo.currentAngle += units;
        return
    }
    if (key === 'R'){
        shipInfo.currentAngle += (360 - units);
        return
    }
}


console.log(getDirectionTotal())
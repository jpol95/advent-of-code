const seats = require('./seats-store')

const getStable = () => {
    let seatArray = seats.split(/\n/).map(seat => seat.split(''))
    let copy = makeCopy(seatArray);
    do {
    seatArray = copy;
    copy = makeCopy(seatArray)
    for (let i = 0; i < seatArray.length; i++){
        for (let j = 0; j < seatArray[i].length; j++){
            alterSeat(seatArray, copy, j, i)
        }
    }
} while (!checkEquals(copy, seatArray))
return countSeats(seatArray)
}

const makeCopy = (inputArray) => {
    const resultArray = []
    for (let row of inputArray){
        resultArray.push([...row])
    }
    return resultArray;
}

const checkEquals = (array1, array2) => {
    for (let i = 0; i < array1.length; i++){
        for (let j = 0; j < array1[i].length; j++){
            if (array1[i][j] !== array2[i][j]) return false;
        }
    }
    return true;
}

const countSeats = (seatArray) => {
    let seatCount = 0
    for (let i = 0; i < seatArray.length; i++){
        for (let j = 0; j < seatArray[i].length; j++){
            if (seatArray[i][j] === '#') seatCount++;
        }
    }
    return seatCount;
}

const alterSeat = (seatArray, copy, x, y) => {
    const surroundArray = []
    const seatsToCheck = [-1, 0, 1]
    for (let i = 0; i < seatsToCheck.length; i++){
        for (let j = 0; j < seatsToCheck.length; j++){
            if (!outOfBounds(copy, y + seatsToCheck[j], x + seatsToCheck[i]) && seatArray[y + seatsToCheck[j]] === undefined){
                console.log("error")
            }
            if (i === 1 && j === 1 || outOfBounds(copy, y + seatsToCheck[j], x + seatsToCheck[i])) continue;
            surroundArray.push(seatArray[y + seatsToCheck[j]][x + seatsToCheck[i]])
        }
    }
    let occupiedSeats = 0;
    for (let seat of surroundArray){
        if (seat === '#') occupiedSeats++;
    }
    if (seatArray[y][x] === 'L' && occupiedSeats === 0) copy[y][x] = '#'
    if (seatArray[y][x] === '#' && occupiedSeats > 3) copy[y][x] = 'L'
}

const outOfBounds = (copy, y, x) => {
    if (copy[y] === undefined) return true;
    if (copy[y][x] === undefined) return true;
    return false;
}

console.log(getStable())
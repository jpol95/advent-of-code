const seats = require("./boardingpass-store")

const highestSeat = () => {
    const seatArray = seats.split(/\n/)
    const idArr = []
    for (let seat of seatArray){
       let row = seat.substring(0,7).split('').map(char => {
            if (char === 'F') return "0"
            else return "1"
        }).join('')
        let column = seat.substring(8, 11).split('').map(char => {
            if(char === 'L') return "0"
            else return "1"
        }).join('')
        row = parseInt(row, 2)
        column = parseInt(column, 2)
        const id = row * 8 + column 
        idArr.push(id)

    }
    return Math.max(...idArr)
}

const getIdArray = () => {
    const seatArray = seats.split(/\n/)
    const idArr = []
    for (let seat of seatArray){
       let row = seat.substring(0,7).split('').map(char => {
            if (char === 'F') return "0"
            else return "1"
        }).join('')
        let column = seat.substring(7, 11).split('').map(char => {
            if(char === 'L') return "0"
            else return "1"
        }).join('')
        row = parseInt(row, 2)
        column = parseInt(column, 2)
        const id = row * 8 + column 
        idArr.push(id)

    }
    idArr.sort()
    return idArr
}

const mySeat = () => {
    const refArray = []
    const idArray = getIdArray()
    for (let i = 0; i < 817; i++){
        refArray.push(i)
    }
    for (let seat of idArray){
        const index = refArray.indexOf(seat)
        refArray.splice(index, 1)
    }
    return refArray
}

// for (let id of getIdArray()) console.log(id)
console.log(mySeat())
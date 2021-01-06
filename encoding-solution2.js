const numberList = require('./encoding-store')

const getFirstBug = (goal) => {
    const numArray = numberList.split(/\n/).map(Number)
    let i = j = 0;
    while (j < numArray.length){
        const sum = numArray.slice(i, j + 1).reduce((total, current) => total + current, 0)
        if (sum > goal){
            i++
        }
        else if (sum < goal){
            j++
        }
        else break;
    }
    let total = numArray.slice(500, 517).reduce((total, current) => total + current, 0)
    console.log(numArray[500], numArray[516])
    return numArray[500] + numArray[516]
}


console.log(getFirstBug(542529149))

const numberList = require('./encoding-store')

const getFirstBug = (preamble) => {
    const numArray = numberList.split(/\n/).map(Number)
    for (let i = preamble; i < numArray.length; i++){
        if (!hasCombo(numArray.slice(i - preamble, i + 1))) return numArray[i] 
    }
}

const hasCombo = (numArray) => {
    for (let i = 0; i < numArray.length - 1; i++){
        for (let j = i; j < numArray.length - 1; j++){
            if (numArray[i] + numArray[j] === numArray[numArray.length - 1]) return true;
        }
    }
    return false;
}

console.log(getFirstBug(25))
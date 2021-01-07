const nums = require('./store')

const get2020 = () => {
    const numObject = {}
    nums.forEach((num, index) => numObject[num] = [index])
    const sequence = [...nums]
    for (let i = sequence.length; i < 2020; i++){
        const lastNum = sequence[i - 1]
        if (numObject[lastNum].length == 1) {
            sequence.push(0);
            numObject[0].push(i)
        }
        else {
            const numArray = numObject[lastNum]
            const currentNum = numArray[numArray.length - 1] - numArray[numArray.length - 2]
            sequence.push(currentNum);
            if (numObject[currentNum]){
                numObject[currentNum].push(i)
            }
            else numObject[currentNum] = [i]
        }
    }
    return sequence[2019]
}

console.log(get2020())
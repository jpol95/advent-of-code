const nums = require('./store')

const get2020 = () => {
    const numObject = {}
    nums.forEach((num, index) => numObject[num] = index)
    let first = true;
    let current;
    for (let i = nums.length; i < 2020; i++){
        if (first) {
            first = false;
            current = 0
        }
        else {
            const numIndex = numObject[current]
            current = i - 1 - numIndex
            // console.log(current)
            numObject[current] = i
            first = true;
        }
    }
    console.log(numObject)
    // console.log(numObject)
    return current;
}

console.log(get2020())


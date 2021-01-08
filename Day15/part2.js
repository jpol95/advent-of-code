const nums = require('./store')

const get2020 = () => {
    const numObject = {}
    nums.forEach((num, index) =>{ if (index !== nums.length - 1) numObject[num] = index})
    let first;
    let current = nums[nums.length - 1];
    for (let i = nums.length; i < 30000000; i++){
        first = numObject[current] === undefined ? true : false;
        if (first) {
            numObject[current] = i - 1
            current = 0;
        }
        else {
            const numIndex = numObject[current]
            numObject[current] = i - 1
            current = i - 1 - numIndex
        }
    }
    // console.log(numObject)
    return current;
}

console.log(get2020())


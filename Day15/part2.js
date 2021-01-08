const nums = require('./store')

const get2020 = () => {
    const numArray = []
    for (i = 0; i < 30000000; i++) numArray[i] = undefined
    nums.forEach((num, index) =>{ if (index !== nums.length - 1) numArray[num] = index})
    let first;
    let current = nums[nums.length - 1];
    for (let i = nums.length; i < 30000000; i++){
        first = numArray[current] === undefined;
        if (first) {
            numArray[current] = i - 1
            current = 0;
        }
        else {
            const numIndex = numArray[current]
            numArray[current] = i - 1
            current = i - 1 - numIndex
        }
    }

    return current;
}

console.log(get2020())


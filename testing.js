const jesse = "I like bags and I like the bag"

// console.log(jesse.split(/bag(s)?/))

const bigFunc = () => {
    let index = 0
    const testArray = {}
    for (let i = 0; i < 30000000; i++){
        if (index % 2 === 0){
        testArray[i] = i
        index += testArray[i]
        index += testArray[i]
        index += testArray[i]
        }
    else {
        testArray[i] = i
        index += testArray[i]
        index += testArray[i]
        index += testArray[i]
    }
    }
return index
}

console.log(bigFunc())

// const myArray = [4,3,5,'x','x','x']
// const numArray = myArray.map(Number)
// console.log(isNaN(numArray[2]))
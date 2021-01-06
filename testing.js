const jesse = "I like bags and I like the bag"

// console.log(jesse.split(/bag(s)?/))

const bigFunc = () => {
    let index = 0
    for (let i = 0; i < Math.pow(2, 32); i++){
        index = i
    }
return index
}

// console.log(bigFunc())

const myArray = [4,3,5,'x','x','x']
const numArray = myArray.map(Number)
console.log(isNaN(numArray[2]))
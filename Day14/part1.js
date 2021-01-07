const commands = require('./store.js')

const sumMemory = () => {
    const commandArray = commands.split(/\n/)
    let memory = {};
    let mask;
    for (let command of commandArray){
        if (command.slice(0,4) === 'mask'){
            mask = command.slice(7);
        }
        else {
            const memoryAddress = Number(command.slice(4).split("]")[0])
            const insertionVal = Number(command.slice(5).split("]")[1].split("=")[1])
            memory[memoryAddress] = parseInt(parseMask(mask, convertToBinary(insertionVal)), 2)

        }
    }
    let sum = 0;
    for (let key in memory){
        sum += memory[key]
    }
    return sum
}


const convertToBinary = (decimal) => {
    let binaryString = "";
    for (let i = 35; i >=0; i--){
        if (decimal >= Math.pow(2, i)){
            binaryString += "1";
            decimal -=  Math.pow(2, i)
        }
        else binaryString += "0"
    }

    return binaryString
}

parseMask = (mask, binaryToChange) => {
    let resultBinary = ""
    for (let i = 0; i < mask.length ; i++){
        if (mask.charAt(i) !== 'X')
        resultBinary += mask.charAt(i);
        else resultBinary += binaryToChange.charAt(i);
    }
    return resultBinary;
}

console.log(sumMemory())

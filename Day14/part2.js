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
            const insertionVal = Number(command.slice(5).split("]")[1].split("=")[1])
            let memoryAddresses = parseMask(mask, convertToBinary(Number(command.slice(4).split("]")[0])))
            memoryAddresses = processMemories(memoryAddresses)
            for (let memoryAddress of memoryAddresses){
            // console.log(memoryAddresses)
            memory[memoryAddress]= insertionVal
            }
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

const convertToBinaryShort = (decimal, numDigits) => {
    let binaryString = "";
    for (let i = numDigits - 1; i >= 0; i--){
        if (decimal >= Math.pow(2, i)){
            binaryString += "1";
            decimal -=  Math.pow(2, i)
        }
        else binaryString += "0"
    }

    return binaryString
}


const processMemories = (mask) => {
    let count = 0; 
    let indexes = []
    const memories = []
    for (let i = 0; i < mask.length; i++){
        if (mask.charAt(i) === 'X'){
            indexes.push(i)
            count++;
        }
    }
    // console.log(Math.pow(2, count))
    const limit = Math.pow(2, count)
    for (let i = 0; i < limit; i++){
        let binString = convertToBinaryShort(i, count).split('')
        // console.log(binString)
        const maskArray = mask.split('')
        for (let j = 0; j < indexes.length; j++){
            maskArray[indexes[j]] = binString[j]
        }
        memories.push(parseInt(maskArray.join(''), 2))
    }
    return memories
}

const parseMask = (mask, binaryToChange) => {
    let resultBinary = ""
    for (let i = 0; i < mask.length ; i++){
        if (mask.charAt(i) !== '0')
        resultBinary += mask.charAt(i);
        else resultBinary += binaryToChange.charAt(i);
    }
    // console.log(resultBinary)
    return resultBinary;
}



console.log(sumMemory())
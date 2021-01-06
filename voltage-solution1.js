const voltages = require('./voltage-store')

const countVoltages = () => {
    const voltageArray = voltages.split(/\n/).map(Number).sort((a, b) => a - b)
    console.log(voltageArray)
    let count1 = 0
    let count3 = 0
    if (voltageArray[0] === 3) count3++
    if (voltageArray[0] === 1) count1++
    for (let i = 0; i < voltageArray.length - 1; i++){
        if (voltageArray[i + 1] - voltageArray[i] === 1) count1++
        if (voltageArray[i + 1] - voltageArray[i] === 3) count3++
    }

    return [count1, count3 + 1]
}



console.log(countVoltages())


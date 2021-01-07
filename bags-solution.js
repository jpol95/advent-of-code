const bagRules = require('./bags-store')

const processBag = (bag) => { //parseBag
    if (bag.match(/contain no other/) !== null){
        const resultArr = bag.split(" bags contain no other")
        const firstEl = resultArr[0]
        return {[firstEl]: []}
    }
    const lineArray = bag.split(/\s{1}bags contain [0-9] | bags?, [0-9] | bags?\./)
    lineArray.splice(lineArray.length - 1, 1)
    const firstEl = lineArray[0]
    return {[firstEl]: lineArray.slice(1)}
}

// console.log(processBag(bagRules.split(/\n/)[0]))

const countBags = () => {
    let bagObj = {}
    let count = 0
    const bagList = bagRules.split(/\n/).map(processBag) //reduce
    for (let bag of bagList){
        bagObj = {...bagObj, ...bag}
    }
    for (bag in bagObj){
        if (countBagsHelper(bag, bagObj)){
            count++;
        } // memoization
    }
    return count;
}
//child as key, parents as value
//try with graphs


// shiny-gold: [blue, lilac, yellow]
// queue

const countBagsHelper = (key, bagRules) => { //be more explicit with function names
    if (bagRules[key].includes("shiny gold")) return true;
    // let result = false
    for (let bag of bagRules[key]){
        if (countBagsHelper(bag, bagRules)) return true;
    }
    return false
}

console.log(countBags())


/* 
------------------------------------------------PART TWO OF THE PROBLEM ----------------------------------------------------
*/

// const processBag = (bag) => {
//     if (bag.match(/contain no other/) !== null){
//         const resultArr = bag.split(" bags contain no other")
//         const firstEl = resultArr[0]
//         return {[firstEl]: []}
//     }
//     const lineArray = bag.split(/\s{1}bags contain | bags?, | bags?\./)
//     lineArray.splice(lineArray.length - 1, 1)
//     const firstEl = lineArray[0]
//     const bagEntries = lineArray.slice(1).map(bagEntry => {
//         let result = bagEntry.split(/\s(.+)/)
//         result = result.slice(0, result.length - 1)
//         return {[result[1]]: Number(result[0])}
//     })
//     let result = {}
//     for (let bagEntry of bagEntries){
//         const key = Object.keys(bagEntry)
//         result = {...result, [key[0]]: bagEntry[key]}
//     }
//     return {[firstEl]: result}
// }

// // console.log(processBag(bagRules.split(/\n/)[0]))

// const countBags = () => {
//     let bagObj = {}
//     const bagList = bagRules.split(/\n/).map(processBag)
//     for (let bag of bagList){
//                  bagObj = {...bagObj, ...bag}
//              }
//     const result = countBagsHelper("shiny gold", bagObj)
//     return result;

// }

// const countBagsHelper = (key, bagRules) => {
//     let count = 0;
//     for (let bag in bagRules[key]){
//         const multiplier = bagRules[key][bag]
//         count += multiplier + multiplier * countBagsHelper(bag, bagRules)
//     }
//     return count
// }

// console.log(countBags())
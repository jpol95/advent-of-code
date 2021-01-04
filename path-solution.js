const {paths, pathsEx} = require('./path-store')

countTrees = (xSlope, ySlope) => {
    let x = y = count = 0
    while (y < paths.length){
        if (paths[y][x] === '#'){
            count++;
        }
        y += ySlope;
        x = (x + xSlope) % paths[0].length
    }
    return count;
}



console.log(
    countTrees(1,1) *
    countTrees(3,1) *
    countTrees(5,1) *
    countTrees(7,1) *
    countTrees(1,2) 
)

// console.log(
//     countTrees(3,1)
// )
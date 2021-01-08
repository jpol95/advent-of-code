let cubes = require('./store.js')

const countActive = () => {
    cubes = { "0" : cubes.split(/\n/).map(line => line.split(''))};
    // for (let i = 0; i < 6; i++){
        let newCubes = createNewCubeObject(cubes);
        console.log(newCubes)
    // }
}

const createNewCubeObject = (cubes) => {
    let newCubes = [];
       for (j = 0; j < cubes[0][0].length + 2; j++){
           newCubes.push('.');
       }
    const newCubeObject = {};
    let keyArray = Object.keys(cubes).map(Number)
    keyArray = [...keyArray, Math.max(keyArray) + 1, Math.max(keyArray) - 1]
    for (let key of keyArray){
        newCubeObject[key] = []
        for (let i = 0; i < cubes[0].length + 2; i++){
            newCubeObject[key].push(newCubes);
        }
    }

    return newCubeObject;
}

console.log(countActive())
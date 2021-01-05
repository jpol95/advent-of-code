// const commands = require("./game-store");

// const setUp = (command) => {
//   let commandArray = command.split(" ");
//   return { [commandArray[0]]: Number(commandArray[1]), touched: false };
// };

// const accCount = () => {
//   const commandArray = commands.split(/\n/).map(setUp);
//   return executor(0, commandArray);
// };

// const executor = (index, commandArray) => {
//   let acc = 0;
//   const commandObj = commandArray[index];
//   if (commandObj.touched === true) return acc;
//   commandObj.touched = true;
//   const command = Object.keys(commandObj)[0];
//   if (command === "nop") {
//     acc += executor(index + 1, commandArray);
//   }
//   if (command === "jmp") {
//     acc += executor(index + commandObj[command], commandArray);
//   }
//   if (command === "acc") {
//     acc += commandObj[command] + executor(index + 1, commandArray);
//   }
//   return acc;
// };

// console.log(accCount())


/* 
------------------------------------------------PART TWO OF THE PROBLEM ----------------------------------------------------
*/

const commands = require("./game-store");

const setUp = (command) => {
  let commandArray = command.split(" ");
  return { [commandArray[0]]: Number(commandArray[1]), touched: false };
};

const accCount = () => {
  const commandArray = commands.split(/\n/).map(setUp);
  return findProblem(0, commandArray);
};

const switchOp = (command) => {
    if (Object.keys(command)[0] === "jpm"){
        return {"nop": command["jmp"], touched: true};
    }
    if (Object.keys(command[0]) === "nop"){
        return {"jmp": command["nop"], touched: true};
    }
    return command;
}

const findProblem = (index, commandArray, indexToSwitch) => {
  let problem = -1;
  if (indexToSwitch === index) {
      commandArray[index] = switchOp(commandArray[index])
  }
  const commandObj = commandArray[index];
  commandObj.touched = true;
  const command = Object.keys(commandObj)[0];
  if (command === "nop") {
    if (commandArray[index + 1].touched){
        return index
   }
    problem = findProblem(index + 1, commandArray);
  }
  if (command === "jmp") {
    if (commandArray[index + commandObj[command]].touched){
        return index 
    }
    problem = findProblem(index + commandObj[command], commandArray);
  }
  if (command === "acc") {
    if (commandArray[index + 1].touched){
         return index 
    }
    problem = findProblem(index + 1, commandArray);
  }
  return problem;
};

console.log(accCount())

//you should fix the logic here!!!!!


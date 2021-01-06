const commands = require("./game-store");

const setUp = (command) => {
  let commandArray = command.split(" ");
  return { [commandArray[0]]: Number(commandArray[1]), touched: false };
};

const accCount = () => {
  let commandArray = commands.split(/\n/).map(setUp);
  const instructions = [];
  getTouched(0, commandArray, instructions);
  let bug = -1;
  for (let instruction of instructions) {
    //   console.log(instruction)
    commandArray = commands.split(/\n/).map(setUp);
    if (doesComplete(0, commandArray, instruction)) bug = instruction;
  }
  commandArray[bug] = switchOp(commandArray[bug])
  return executor(0, commandArray)
  //   return doesComplete(0, commandArray, -1);
};

const executor = (index, commandArray) => {
  let acc = 0;
  const commandObj = commandArray[index];
  if (index >= commandArray.length) return acc;
  commandObj.touched = true;
  const command = Object.keys(commandObj)[0];
  if (command === "nop") {
    acc += executor(index + 1, commandArray);
  }
  if (command === "jmp") {
    acc += executor(index + commandObj[command], commandArray);
  }
  if (command === "acc") {
    acc += commandObj[command] + executor(index + 1, commandArray);
  }
  return acc;
};

const getTouched = (index, commandArray, output) => {
  const commandObj = commandArray[index];
  output.push(index);
  if (commandObj.touched === true) return;
  commandObj.touched = true;
  const command = Object.keys(commandObj)[0];
  if (command === "nop") {
    getTouched(index + 1, commandArray, output);
  }
  if (command === "jmp") {
    getTouched(index + commandObj[command], commandArray, output);
  }
  if (command === "acc") {
    getTouched(index + 1, commandArray, output);
  }
  return;
};

const switchOp = (command) => {
  if (Object.keys(command)[0] === "jmp") {
    return { nop: command["jmp"], touched: command.touched };
  }
  if (Object.keys(command)[0] === "nop") {
    // console.log({ jmp: command["nop"], touched: true })
    return { jmp: command["nop"], touched: command.touched };
  }
  return command;
};

const doesComplete = (index, commandArray, indexToSwitch) => {
  let completed = false;
  if (indexToSwitch === index) {
    commandArray[index] = switchOp(commandArray[index]);
  }
  const commandObj = commandArray[index];
  if (index >= commandArray.length) return true;
  if (commandObj.touched === true) return false;
  commandObj.touched = true;
  const command = Object.keys(commandObj)[0];
  if (command === "nop") {
    completed = doesComplete(index + 1, commandArray, indexToSwitch);
  }
  if (command === "jmp") {
    completed = doesComplete(
      index + commandObj[command],
      commandArray,
      indexToSwitch
    );
  }
  if (command === "acc") {
    completed = doesComplete(index + 1, commandArray, indexToSwitch);
  }
  return completed;
};

console.log(accCount());

//you should fix the logic here!!!!!
const commands = require("./game-store");

const setUp = (command) => {
  let commandArray = command.split(" ");
  return { [commandArray[0]]: Number(commandArray[1]), touched: false };
};

const accCount = () => {
  const commandArray = commands.split(/\n/).map(setUp);
  return executor(0, commandArray);
};

const executor = (index, commandArray) => {
  let acc = 0;
  const commandObj = commandArray[index];
  if (commandObj.touched === true) return acc;
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

console.log(accCount())

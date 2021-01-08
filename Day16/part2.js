const ticketInfo = require("./store");

const findDepartures = () => {
  let [rules, myTicket, otherTickets] = ticketInfo.split(/\n\n/);
  rules = parseRules(rules);
  myTicket = myTicket.split(/\n/).slice(1)[0].split(",").map(Number);
  otherTickets = otherTickets
    .split(/\n/)
    .slice(1)
    .map((ticketLine) => ticketLine.split(",").map(Number));
  const validTickets = otherTickets.filter((ticketArray) => {
    for (let ticket of ticketArray) {
      let valid = false;
      for (let rule in rules) {
        if (rules[rule].includes(ticket)) valid = true;
      }
      if (!valid) return false;
    }
    return true;
  });
  const designations = findDesignations(validTickets, rules);
  return departureMultiplier(designations, myTicket)
};

const departureMultiplier = (designations, myTicket) => {
    let result = 1;
    const designationKeys = Object.keys(designations).filter(key => key.startsWith("departure"))
    // console.log(myTicket)
    for (let key of designationKeys){
        // console.log(myTicket[designations[key]])
        result *= myTicket[designations[key]];
    }
    return result;
};

const findDesignations = (ticketRows, rules) => {
  let designations = [];
  let designationsResult = {};
  for (let i = 0; i < ticketRows[0].length; i++) {
    designations[i] = [...Object.keys(rules)];
  }
  for (let ticketRow of ticketRows) {
    for (let i = 0; i < ticketRow.length; i++) {
      for (let rule in rules) {
        if (!rules[rule].includes(ticketRow[i])) {
          designations[i] = designations[i].filter(
            (ruleInList) => rule !== ruleInList
          );
        }
      }
    }
  }
  for (let i = 0; i < designations.length; i++) {
    let singleIndex = designations.findIndex(
      (designation) => designation.length === 1
    );
    let singleRule = designations[singleIndex][0];
    designationsResult[singleRule] = singleIndex;
    for (let j = 0; j < designations.length; j++) {
      if (designations[j].length !== 1) {
        let indexToRemove = designations[j].indexOf(singleRule);
        designations[j].splice(indexToRemove, 1);
      }
    }
    designations[singleIndex] = [];
  }
//   console.log(designationsResult);

  return designationsResult;
};

const parseRules = (ruleString) => {
  ruleString = ruleString.split(/\n/);
  return ruleString.reduce((ruleObj, ruleString) => {
    const ruleArray = ruleString.split(/: | or /);
    const name = ruleArray[0];
    const range = [];
    const firstLower = Number(ruleArray[1].split("-")[0]);
    const firstUpper = Number(ruleArray[1].split("-")[1]);
    const secondLower = Number(ruleArray[2].split("-")[0]);
    const secondUpper = Number(ruleArray[2].split("-")[1]);
    for (let i = firstLower; i <= firstUpper; i++) range.push(i);
    for (let i = secondLower; i <= secondUpper; i++) range.push(i);
    return { ...ruleObj, [name]: range };
  }, {});
};

console.log(findDepartures());

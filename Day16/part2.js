const ticketInfo = require("./store");

const findDepartures = () => {
  let [rules, myTicket, otherTickets] = ticketInfo.split(/\n\n/);
  rules = parseRules(rules);
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
  findDesignations(validTickets, rules);
};

const findDesignations = (ticketRows, rules) => {
    const designations = {}
    const rowLength = []
    for (let i = 0; i < ticketRows[0].length; i++) rowLength.push(i)
    for (let rule in rules){
        designations[rule] = [...rowLength]
    }
    for (let ticketRow of ticketRows){
        for (let i = 0; i < ticketRow.length; i ++){
            for (let rule in rules){
                if (!rules[rule].includes(ticketRow[i])) designations[rule][i] = null
            }
        }
    }
    console.log(designations)
    return designations;
}

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

const ticketInfo = require('./store')

const countInvalid = () => {
   let [rules, myTicket, otherTickets] = ticketInfo.split(/\n\n/);
    rules = parseRules(rules)
    console.log(rules)

};

const parseRules = (ruleString) => {
    ruleString = ruleString.split(/\n/);
    ruleString = ruleString.reduce((ruleObj, ruleString) => {
        const objToInsert = {};
        const ruleArray = ruleString.split(/: | or /);
        const name = ruleArray[0];
        const range = [];
        const firstLower = Number(ruleArray[1].split("-")[0]);
        const firstUpper = Number(ruleArray[1].split("-")[1]);
        const secondLower = Number(ruleArray[2].split("-")[0]);
        const secondUpper = Number(ruleArray[2].split("-")[1]);
        for (let i = firstLower; i < firstUpper; i++) range.push(i);
        for (let i = secondLower; i < secondUpper; i++) range.push(i);
        return {...ruleObj, [name]: range}
    })
};

console.log(countInvalid())
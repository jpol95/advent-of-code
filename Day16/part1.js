const ticketInfo = require('./store')

const countInvalid = () => {
   let [rules, myTicket, otherTickets] = ticketInfo.split(/\n\n/);
    rules = parseRules(rules);
    otherTickets = otherTickets.split(/\n/).slice(1).reduce((ticketArray, ticketLine) => {
        const tickets = ticketLine.split(",").map(Number)
        return [...ticketArray, ...tickets]
    }, [])
    const invalidCounter = otherTickets.reduce((counter, ticket) => {
        for (let rule in rules){
            if (rules[rule].includes(ticket)) return counter;
        }
        return counter + ticket;
    }, 0)
    return invalidCounter;
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
        return {...ruleObj, [name]: range}
    }, {})
};

console.log(countInvalid())
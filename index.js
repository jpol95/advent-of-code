const entries = require("./store");
const passwords = require("./password-store")

let result = 0;
for (let i = 0; i < entries.length; i++) {
  for (let j = i; j < entries.length; j++) {
    for (let k = j; k < entries.length; k++) {
      if (entries[i] + entries[j] + entries[k] === 2020) {
        result = entries[i] * entries[j] * entries[k];
      }
    }
  }
}

// console.log(result);


const checkPasswords = () => {
    let count = 0
    for (let password of passwords){
        const nums = password.split(" ")[0].split("-").map(Number)
        const reqLetter = password.split(" ")[1].slice(0,1)
        const pword = password.split(" ")[2]
        var re = new RegExp(reqLetter, "g")
        if (pword.match(re) == null) continue;
        const occurences = pword.match(re).length
        if (occurences >= nums[0] && occurences <= nums[1]){
            count++
        }
        
    }
    return count;
}

// console.log(checkPasswords())

const checkPasswordsRev = () => {
    let count = 0
    for (let password of passwords){
        const nums = password.split(" ")[0].split("-").map(Number)
        const reqLetter = password.split(" ")[1].slice(0,1)
        const pword = password.split(" ")[2]
        if ((pword[nums[0] - 1] === reqLetter) !== (pword[nums[1] - 1] === reqLetter)) count++
        
    }
    return count;
}

console.log(checkPasswordsRev())
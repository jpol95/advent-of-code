const { data } = require("./airport-store");

const countValid = () => {
  const dataArray = data.split(/\n\n/);
  let result = 0;
  for (let passport of dataArray) {
    const required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
    const passArray = passport.split(/\s/).map((entry) => entry.slice(0, 3));
    for (let code of passArray) {
      // console.log(code)
      const index = required.indexOf(code);
      // console.log(index)
      if (index !== -1) required.splice(index, 1);
    }
    // console.log(required);
    if (required.length === 0) result++;
  }
  return result;
};

// console.log(countValid());

const countValidPart2 = () => {
  const dataArray = data.split(/\n\n/);
  let result = 0;
  for (let passport of dataArray) {
    const required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
    const passArray = passport.split(/\s/).map((entry) => entry.slice(0, 3));
    for (let code of passArray) {
      // console.log(code)
      const index = required.indexOf(code);
      // console.log(index)
      if (index !== -1) required.splice(index, 1);
    }
    if (required.length === 0 && validateFields(passport.split(/\s/))) result++;
  }
  return result;
};

const validateFields = (passport) => {
  for (let field of passport) {
    const content = field.slice(4);
    if (field.startsWith("byr")) {
      if (Number(content) < 1920 || Number(content) > 2002) {
        return false;
      }
    }
    if (field.startsWith("iyr")) {
      if (Number(content) < 2010 || Number(content) > 2020) {
        return false;
      }
    }
    if (field.startsWith("eyr")) {
      if (Number(content) < 2020 || Number(content) > 2030) {
        return false;
      }
    }
    if (field.startsWith("hgt")) {
      const height = content.substring(0, content.length - 2);
      if (
        content.endsWith("cm") &&
        (Number(height) < 150 || Number(height) > 193)
      ) {
        return false;
      }
      if (
        content.endsWith("in") &&
        (Number(height) < 59 || Number(height) > 76)
      ) {
        return false;
      }
      if (!content.endsWith("in") && !content.endsWith("cm")) {
        return false;
      }
    }
    if (field.startsWith("hcl")) {
      if (!content.startsWith("#")) return false;
      const color = content.substring(1);
      if (color.length !== 6 || color.match(/([0-9]|[a-f]){6}/).length === 0)
        return false;
    }
    if (field.startsWith("ecl")) {
      const options = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
      if (!options.includes(content)) return false;
    }
    if (field.startsWith("pid")) {
      if (content.length !== 9 || content.match(/[0-9]{9}/).length === 0)
        return false;
    }
  }
  return true;
};

console.log(countValidPart2());

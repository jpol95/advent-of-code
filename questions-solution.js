const answers = require('./questions-store')

const totalQuestions = () => {
    const groups = answers.split(/\n\n/)
    let total = 0
    for (let group of groups){
        const persons = group.split(/\n/)
        const answerSet = new Set()
        for (let person of persons){
            const answers = person.split('')
            for (let answer of answers){
                answerSet.add(answer)
            }
        }
        total += answerSet.size
    }
    return total
}

// console.log(totalQuestions())

const totalQuestionsCommon = () => {
    const groups = answers.split(/\n\n/)
    let total = 0
    for (let group of groups){
        const persons = group.split(/\n/)
        const answerSet = new Set()
        const answerMap = {}
        for (let person of persons){
            const answers = person.split('')
            const answerSet = new Set()
            for (let answer of answers){
                answerSet.add(answer)
            }
            for (let answer of answerSet.values()){
                answerMap[answer] = answerMap[answer] !== undefined ? answerMap[answer] + 1 : 1
            }
        }
        for (let answer in answerMap){
            if (answerMap[answer] === persons.length) total ++
        }
    }
    return total
}

console.log(totalQuestionsCommon())

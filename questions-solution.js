const answers = require('./questions-store')

const totalQuestions = () => {
    const groups = answers.split(/\n\n/)
    let total = 0
    for (let group of groups){
        const persons = group.split(/\n/)
        const answerMap = {}
        for (let person of persons){
            const answerSet = new Set()
            const answers = person.split('')
            for (let answer of answers){
                answerSet.add(answer)
            }
        }
        total += answerSet.size
    }
    return total
}

console.log(totalQuestions())
const scores = [55,65,82,95,78,48,39,77]

// Destructuring
const [s1, , s3] = scores

console.log(s1,s3)

// Last Element
const {[scores.length - 1]: last} = scores
console.log(last)


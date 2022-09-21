// Spread Operator
const arr = [4,5,6]
const append = [1,2,3, arr]
const appendsp = [1,2,3, ...arr]

console.log(append)
console.log(appendsp)

// Rest Parameter
const howManyAgrs = (...args) => {
    console.log(args.length)
    console.log(args)
}

howManyAgrs()
howManyAgrs(4)
howManyAgrs(6,8)
howManyAgrs(8,7,9,10,16)

// Exercise
function multiply(multiplier, ...array){
    console.log(array)
    return array.map(e => multiplier * e)
}

const result = multiply(2,10,20,30)
console.log(result)
// ES5
// function showHello(name,message){
//     return message + name
// }

// เขียนแบบ First Class Function
const showHello = function(name,message){
    return message + name
}

console.log(showHello('Samit', 'Hello '))

// ES6 Arror function
const showHelloArrow = (name,message) => {
    return message + name
}

console.log(showHelloArrow('Somchai', 'Hello '))

// ลดรูปได้กรณีมี Return เพียงอย่างเดียว
const showHelloArrow2 = (name,message) => message + name
console.log(showHelloArrow2('Wicahi', 'Hello '))

// ยังลดรูปต่อไปได้อีกกรณีมีการรับค่าเพียงพารามิเตอร์เดียว
const showHelloArrow3 = message => message
console.log(showHelloArrow3('Hello every body'))

// QA
function sayHi(name){
    const result = 'Hello ' + name
    return result
}

// Ans ES6 
const sayHi2 = name => {
    const result = 'Hello ' + name
    return result
}

console.log(sayHi2())


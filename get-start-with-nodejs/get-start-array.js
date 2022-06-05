// ------------------------- Array Push, Pop, Unshift, Shift -----------------------------
const arr_data = [1, 2, 3, 4, 5]
console.log(arr_data) // [1, 2, 3, 4, 5]
console.log(arr_data.length) // 5

arr_data.push(6);   console.log(arr_data); // [1, 2, 3, 4, 5, 6]
arr_data.pop();     console.log(arr_data); // [1, 2, 3, 4, 5]
arr_data.unshift("abc");       console.log(arr_data); // [ 'abc', 1, 2, 3, 4, 5 ]
arr_data.shift();   console.log(arr_data); // [ 1, 2, 3, 4, 5 ]

// ------------------------- Array Map -----------------------------
// โดยหน้าที่ของมันคือการวนค่าทุกค่าใน array ตาม function ที่เราต้องการ และทำการสร้าง array ใหม่ออกมาพร้อมกับค่าใหม่
const arr_map = [1, 2, 3, 4, 5]
const multiplyByTwo = arr_map.map(value => {
    return value * 2
})
console.log(arr_map) // [1, 2, 3, 4, 5]
console.log(multiplyByTwo) // [2, 4, 6, 8, 10]

// ------------------------- Array Filter -----------------------------
// สำหรับ filter นั้นชื่อก็บ่งบอกอยู่แล้วว่าเราต้องการที่จะกรองค่าหรือฟิลเตอร์ค่าออกมาตามเงื่อนไขที่เราต้องการ โดย filter นั้นรับ array มาวนเหมือนกับ map แต่ว่าเราจะต้องมีการส่ง condition หรือเงื่อนไขว่าเราต้องการที่จะให้ return ค่าอะไรออกมา ซึ่ง filter ก็จะทำการสร้าง array ใหม่เช่นเดียวกัน
const arr_filter = [1, 2, 3, 4, 5]
const evenNumbers = arr_map.filter(value => {
    return value % 2 == 0
})
console.log(arr_map) // [1, 2, 3, 4, 5]
console.log(evenNumbers) // [2, 4]

// ------------------------- Array splice การค่าตัดออกแล้วใส่เพิ่ม -----------------------------
const colors = ['red', 'green', 'blue'] // const array
colors[3] = 'yellow'    // add, Edit Array

console.log(colors) // [ 'red', 'green', 'blue', 'yellow' ]

// splice คือ การค่าตัดออกแล้วใส่เพิ่ม ตัดตั้งแต่ index ที่ 1 แล้ว ถัดจาก index ที่ 1 ไปอีก 2 ตัว โดยนับตัว index 1 ด้วย
colors.splice(1, 2)
console.log(colors); // [ 'red', 'yellow' ]

// splice คือ การค่าตัดออกแล้วใส่เพิ่ม ตัดตั้งแต่ index ที่ 1 แล้ว ถัดจาก index ที่ 1 ไปอีก 2 ตัว โดยนับตัว index 1 ด้วย จากนั้น เพิ่ม purple ไปแทนที่ index ที่ 1
colors.splice(1, 2, 'purple') // [ 'red', 'purple', 'yellow' ]
console.log(colors)

// ------------------------- Array Reduce -----------------------------
// รวมตัวเลขที่อยู่ใน array ทั้งหมดออกมาเป็นค่า sum ค่าเดียว 
function sum(...args) {
    return args.reduce(
        (
            accumulator, //ผลจากแต่ละรอบ loop 
            currentValue //ค่าของสมาชิก array ปัจจุบัน
        ) => accumulator + currentValue, 0); // 0 คือค่าตั้งต้นใช้ในกรณีที่เกิดข้อผิดพลาดใน function จะ return ค่านี้ไปแทน
}
console.log(sum()); //0
console.log(sum(1, 2)); //3
console.log(sum(1, 2, 3)); //6
console.log(sum(1, 2, 3, 4, 5)); //15

// ------------------------- Array Reduce -----------------------------
// สมมติเรามีข้อมูลของลูกค้าจำนวนหนึ่ง เราอยากจะ group ลูกค้าตามอายุว่าแต่ละช่วงอายุมีใครบ้าง โดยเราจะลองแบ่งเป็น 3 ช่วงอายุคือ 1.อายุ <= 20 ปี  2.อายุ 21-30 ปี    3.อายุ > 30 ปี
let people = [
    { name: 'Alice', age: 21 },
    { name: 'Max', age: 16 },
    { name: 'Jane', age: 20 },
    { name: 'Bo', age: 23 },
    { name: 'Noon', age: 25 },
    { name: 'Jane', age: 28 },
    { name: 'John', age: 45 },
    { name: 'Doe', age: 51 },
];

let ageRange = people.reduce((acc, obj) => {
        if (obj.age <= 20) {
            acc.lte20.push(obj)
        } else if (obj.age >= 21 && obj.age <= 30) {
            acc.btw21n30.push(obj)
        } else {
            acc.gt30.push(obj)
        }
        return acc;
    }, {  // ประกาศตัวแปร array ที่จะใส่ค่าตั้งต้นด้วยว่าเป็นยังไง
        lte20: [],      //<= 20
        btw21n30: [],   //21-30
        gt30: [],       //> 30
    }
)

console.log(ageRange);
// {
//  lte20: [
//    	{ name: 'Max', age: 16 },
//      { name: 'Jane', age: 20 }
//  ],
//  btw21n30: [
//      { name: 'Alice', age: 21 },
//    	{ name: 'Bo', age: 23 },
//    	{ name: 'Noon', age: 25 },
//      { name: 'Jane', age: 28 }
//  ],
//  gt30: [
//	    { name: 'John', age: 45 },
//	    { name: 'Doe', age: 51 }
//	]
// }

// ------------------------- Array เรียงลำดับข้อมูลตาม Value -----------------------------
const demo_sort = [1, 4, 3, 2]
console.log(demo_sort.sort())       // [ 1, 2, 3, 4 ]
console.log(demo_sort.reverse())    // [ 4, 3, 2, 1 ]

// ------------------------- Array Find -----------------------------
// Find คือเมธอดที่จะ Return ค่าแรก เมื่อผ่านเงื่อนไขที่กำหนด จากอาร์เรย์ที่ใช้เรียก หากว่าไม่พบสิ่งที่เราต้องการจะreturn ค่าออกมาเป็น undefined
const arr_Find = [1, 2, 3, 4]
const newArrFind = arr_Find.find(
    (value, key) => value > 2
)
console.log(newArrFind) // 3

// ------------------------- Array findIndex -----------------------------
// return เลข index ของ array ตัวแรกที่เข้าเงื่อนไข ถ้าไม่เจอจะ return ค่า -1 ออกมา
const arr_FindIndex = [1, 2, 3, 4]
const newArrFindIndex = arr_FindIndex.findIndex(
    (value, key) => value > 2
)
console.log(newArrFindIndex) // 2

// ------------------------- Array indexOf -----------------------------
// return เลข index ของ array ตัวแรกที่เข้าเงื่อนไขโดยจะส่ง value เข้าไปถ้าไม่เจอจะ return ค่า -1 ออกมา
const arr_indexOf = [1, 2, 3, 4]
const newArrIndexOf = arr_indexOf.indexOf(2)
console.log(newArrIndexOf) // 1

// ------------------------- Array includes -----------------------------
// จะเป็นการเช็คว่า array นั้นมีค่าที่เราต้องการจะค้นหาอยู่หรือไม่ return ออกมาเป็น true หรือ false แทนที่จะเป็น เลข index หรือ -1
const arr_includes = [1, 2, 3, 4]
const newArrIncludes = arr_includes.includes(2)
console.log(newArrIncludes) // 1

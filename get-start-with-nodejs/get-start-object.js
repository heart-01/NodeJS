// ------------------------- Object -----------------------------
const person = {        // const Object Variable
    name: 'John Muir',
    age: 28,
    gender: 'male',
    married: false
}

person['height'] = 175.3 // add, Edit Data Object

console.log(person);

// ------------------------- Ref Type = Object, Array, Function -----------------------------
const obj1 = {
    name: 'John'
}

const obj2 = obj1
obj2.name = 'Heart'

console.log(`obj1`, obj1); // { name: 'Heart' }
console.log(`obj2`, obj2); // { name: 'Heart' }

// จากข้างต้นจะเป็นการ Ref Type เวลาเปลี่ยนค่าที่ obj จะเปลี่ยนทั้ง obj1 และ obj2 เพราะว่า ตัวแปร obj2 มันไม่ได้ไปดึงค่ามาเก็บไว้ที่ตัวมันเอง แต่มันไปชี้ค่าที่ตัวแปร obj1 แทน เวลาเปลี่ยนค่าเลยเปลี่ยนทั้ง 2 จุด
// **** วิธีแก้เราต้องเปลี่ยนให้ Object เป็น String ก่อน JSON.stringify แล้วค่อยเปลี่ยน String เป็น Object โดยJSON.parse

// const obj3 = JSON.parse(JSON.stringify(obj1))
const obj3 = {...obj1} // เขียนแบบง่ายโดยการ copy obj1 มาได้เมือนกัน
obj3.name = 'Jack';
console.log(`obj1`, obj1); // { name: 'Heart' }
console.log(`obj3`, obj3); // { name: 'Jack' }

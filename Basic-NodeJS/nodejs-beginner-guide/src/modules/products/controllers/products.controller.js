const humps = require('humps')  // package แปลงชื่อตัวแปรเป็นตามหลักสากล camelCase, PascalCase, snake_case, kebab-case

const productList = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Tank' },
    { id: 3, name: 'Submarine' },
]

// การสร้าง Object แบบ literals คือ ออบเจ็คที่เก็บข้อมูลในรูปแบบของ Key/Value หรือที่เรียกว่า Plain object
// เราสามารถสร้าง function ใน Object ได้
const productsController = {    

    getProducts(req, res) {
        res.json(productList) // ส่งข้อมูลกลับไปในรูปแบบ json object
    },

    getProductByld (req, res) {
        // console.log(req);
        // { id } เป็น Destructuring
        // humps.camelizeKeys ค่าที่รับมาจากฝั่งหน้าบ้านเราไม่รู้ว่าเขาจะส่ง key ที่เป็นตัวแปรการเขียนแบบไหนเรากำหนดให้เป็น camelCase ทั้งหมดเลย
        const { id } = humps.camelizeKeys(req.params) // รับ request 
        /*
            (product) => product.id === id จะเปรียบเหมือนการวน loop เพื่อเช็คในแต่ละรอบว่า product.id === id ที่รับเข้ามาไหม เช่น 
            for (let i; i < productsList.length; i++) {
                (productsList[id] === id)
            }
        */
        const foundProduct = productList.find((product) => product.id === +id) // ค้นหาข้อมูลใน productsList ฟังชั่น find จะเป็นการค้นหาแล้ว return ข้อมูลตัวแรกเสมอถ้าเจอ ส่วน (product) =>  product.id === id จะเป็นการวน loop แต่ละรอบแล้วก็เงื่อนไขเช็คว่ามี id ที่ส่งเข้ามาตรงกับ product.id ใน productsList ไหม // การแปลง String เป็น Number คือ Number(id) หรือ +id ส่วการแปลง Number เป็น String คือ id+''
        res.json({ // ส่งข้อมูลกลับไปในรูปแบบ json object
            success: true,
            data: foundProduct
        })
    }
}

/*
    Destructuring เป็น feature ที่มาใน ES6 ซึ่งความสามารถ ของมันคือ unpack หรือ กระจาย variables หลายๆตัว พร้อมทั้ง value ต่างๆ ออกมาจาก Array หรือ Object ได้

ตัวอย่างที่ 1. Object Destructuring
    const users = {
        firstname: 'Tyson',
        lastname: 'Fury',
        age: 30
    };
    const {firstname, lastname, age} = users
    console.log(firstname) // Tyson
    console.log(lastname) // Fury
    console.log(age) // 3
    
ตัวอย่างที่ 2. New Variable Names
    const users = {
        firstname: 'Tyson',
        lastname: 'Fury',
        age: 30
    };
    const {firstname: f, lastname: l, age: a} = users
    console.log(f) // Tyson
    console.log(l) // Fury
    console.log(a) // 30

ตัวอย่างที่ 3. Default Values
    const users = {
        firstname: 'Tyson',
        lastname: 'Fury'
    };
    const {firstname, lastname, age = 30 } = users
    console.log(firstname) // Tyson
    console.log(lastname) // Fury
    console.log(age) // 30  //ถ้าไม่มี property age ใน object จะแสดงค่า default 30 แทน

ตัวอย่างที่ 4. Object Destructuring With Rest
    const users = {
        firstname: 'Tyson',
        lastname: 'Fury',
        age: 30,
        score: {
            w: 29,
            k: 20,
            l: 0,
            d: 1
        }
    };
    const {firstname, lastname, age, ...other} = users
    console.log(firstname) // Tyson
    console.log(lastname) // Fury
    console.log(age) // 30
    console.log(other) // { score: { w: 29, k: 20, l: 0, d: 1 } }

*/

// ส่ง functions productsController ออกไปใช้งาน
module.exports = productsController
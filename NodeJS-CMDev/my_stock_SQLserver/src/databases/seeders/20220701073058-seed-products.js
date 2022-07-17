'use strict';

// data ที่เราต้องการ seeder 
const data = [
  {
    "name": "Macbook Pro",
    "image": "",
    "stock": 9,
    "price": 10
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    // เพิ่ม value date created_at, updated_at เข้าไปที่ object 
    data.map(item => {
      item.created_at = new Date()
      item.updated_at = new Date()
    })

    // insert data ไปที่ table Products
    await queryInterface.bulkInsert('Products', data, {});
  },

  async down (queryInterface, Sequelize) {
    // เมื่อยิง command down seed จะลบ table products
    await queryInterface.bulkDelete('Products', null, {});
  }
};
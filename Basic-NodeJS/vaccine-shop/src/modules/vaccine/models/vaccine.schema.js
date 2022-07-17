const { Schema, model } = require('mongoose')
const StatusEnum = require('../../../common/status.enum')
const AutoIncrement = require('../../../plugins/auto-increment.plugin')

// กำหนด Schema ที่จะใช้งานใน Collection
const VaccineSchema = new Schema (
    {
        _id: {
            type: Number,
            required: true,
            unique: true,        // unique ค่าจะไม่ซ้ำในตอนเพิ่มลง database
            default: 0
        },
        name: {                 // ชื่อของ data
            type: String,       // ชนิดข้อมูลของ data
            required: true      // จำเป็นต้องกรอก data นี้
        },
        quantity: {
            type: Number,
            default: 0          // กรณีที่ไม่มีข้อมูลให้ใส่เป็น 0
        },
        quality: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            default: StatusEnum.ACTIVE
        }
    }, 
    { 
        _id: false, // ปิดการ generate id เองอัติโนมัติของ mongoDB
        timestamps: true, // ใช้งาน timestamps create, update
        strict: true  // กำหนดว่าถ้ามีข้อมูลอื่นที่นอกเหนือจากที่กำหนดใน schema จะไม่ถูกบันทึกเข้ามาใน DB
    }
)

// ใช้ autoincrement ที่เราเขียน plugins ให้เอง
VaccineSchema.plugin(AutoIncrement, { id: 'vaccines_seq', inc_field: '_id' })

// ส่ง Schema ที่เรากำหนดเข้าไปใน Model ของ MongoDB โดย Model จะรับ parameter ชื่อของ Database และ Schema ที่เรากำหนดขึ้นมา
const VaccineModel = model('vaccines', VaccineSchema)

module.exports = VaccineModel
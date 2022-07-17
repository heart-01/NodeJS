const StatusEnum = require('../../../common/status.enum.js')
const VaccineDocument = require('../models/vaccine.schema.js')

const VaccineService = {
    // function create จะรับข้อมูล payload แล้วบันทึกลง DB
    create(payload) {
        // รับข้อมูล payload แล้วส่งเข้า model เพื่อเช็ค schema แล้ว save ข้อมูล
        return new VaccineDocument(payload).save()
    },
    getAll(query){
        // ค้นหาโดยดึงค่าทั้งหมด ถ้าในกรณีที่มี parameter query เข้ามาด้วยก็จะค้นหาโดยใช้เงื่อนไขตาม query และ ให้ status เป็นค่า active
        return VaccineDocument.find({ ...query, status: StatusEnum.ACTIVE })
    },
    getOneById(id) {
        // ค้นหาข้อมูล 1 ตัว ตามเงื่อนไขให้ key _id ตรงกับ parameter id ที่เข้ามา
        return VaccineDocument.findOne({ _id: id })
    },
    updateById(id, payload) {
        return VaccineDocument.findOneAndUpdate({ _id: id }, payload)
    },
    deleteById(id) {
        return VaccineDocument.findOneAndUpdate({ _id: id }, { status: StatusEnum.DELETED })
    }
}

module.exports = VaccineService
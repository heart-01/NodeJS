const humps = require('humps')
const VaccineService = require('../services/vaccine.service')

const vaccineController = {
    async getVaccines (req, res) {
        const { quantity, quality } = humps.camelizeKeys(req.query)
        const query = {
            // $gt ย่อมาจาก greater คือ มากกว่า
            // $lt ย่อมาจาก greater คือ น้อยกว่า
            // $gte ย่อมาจาก greater equal คือ มากกว่าเท่ากับ
            // $ne ย่อมาจาก not equal คือ ไม่เท่ากับ null
            quality: quality || { $ne: null }, 
            quantity: quantity || { $ne: null },
        }
        const found = await VaccineService.getAll(query)
        res.json({
            success: true,
            data: found
        }).status(200)
    },

    async getVaccineById (req, res) {
        const { id } = req.params
        const found = await VaccineService.getOneById(id)
        res.json({
            success: true,
            data: found
        }).status(200)
    },

    async createVaccine (req, res) {
        const { name, quantity, quality } = humps.camelizeKeys(req.body)
        const created = await VaccineService.create({ name, quantity, quality }) // ส่ง object data เข้าไปที่ function create

        res.json({
            success: true,
            data: created
        }).status(201)
    },

    async updateVaccine (req, res) {
        const { id } = req.params
        const { name, quantity, quality } = humps.camelizeKeys(req.body)
        const updated = await VaccineService.updateById(id, { name, quantity, quality })
        const found = await VaccineService.getOneById(id)
    
        res.json({
          succes: true,
          data: found
        }).status(200)
    },

    async deleteVaccine (req, res) {
        const { id } = req.params
        const deleted = await VaccineService.deleteById(id)
        const found = await VaccineService.getOneById(id)
        
        res.json({
            succes: true,
            data: found
        }).status(200)
    }
}

module.exports = vaccineController
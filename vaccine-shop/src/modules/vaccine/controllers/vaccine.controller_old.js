const humps = require('humps')

const vacines = [
    { id: '001', name: 'Sinovac', responsibility: 30 },
    { id: '002', name: 'Aztrazeneca', responsibility: 45 },
    { id: '003', name: 'Moderna', responsibility: 90 },
    { id: '004', name: 'Sinopharm', responsibility: 70 },
    { id: '005', name: 'Pfizer', responsibility: 95 }
]

const vaccineController = {
    // วิธีแยกว่าจะส่งค่าโดยใช้ params หรือ query
    // query เราจะใช้งานเมื่อ fillter การกรองหมวดหมู่ หรือ สถานะอะไรเข้ามาแสดง
    // params เราจะใช้ในการ identify หรือเจาะจงข้อมูลนั้น เช่น ดึงข้อมูลชื่อ ดึงข้อมูลไอดี

    getVaccine(req, res) {
        // res.send(vacines) // ส่งข้อมูลแบบ plaintext
        // res.json(vacines) // ส่งข้อมูลแบบ json โดยที่จะทำงานโดยแปลงข้อมูล javascript object ไปเป็น json object

        // req.query?.responsibility คือ การเช็คว่ามี query request เข้ามาไหมถ้ามีก็ให้ไปดึงที่ตำแหน่ง responsibility ใน query request ถ้าไม่มีกำหนดให้เป็น 0 แทน
        const responsibility = req?.query?.responsibilityVaccine || 0
        const found = vacines.filter((vaccine) => vaccine.responsibility >= +responsibility)

        res.json({
            success: true,
            data: found
        }).status(200)
    },

    getVaccineById (req, res) {
        const { id } = humps.camelizeKeys(req.params)
        const found = vacines.find((vaccine) => vaccine.id === id)
        res.json({
            success: true,
            data: found
        }).status(200)
    },

    createVaccine(req, res) {
        const { id, name, responsibility } = req.body
        vacines.push({ id, name, responsibility })

        res.json({
            success: true,
            data: vacines
        }).status(201)
    }
}

module.exports = vaccineController
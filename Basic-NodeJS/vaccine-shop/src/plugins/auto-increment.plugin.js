const mongoose = require('mongoose')

const CounterSchema = mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
})

const counter = mongoose.model('counter', CounterSchema)

const AutoIncrement = (schema, options) => {
    // schema.pre('save' คือ ก่อนที่จะเกิด event save ให้ทำส่วนนี้ก่อน
    schema.pre('save', async function autoIncrement (next) {
        const doc = this
        try {
            if (doc[options.inc_field] === 0) {
                // ให้หาตัว id ล่าสุดก่อนแล้วนำมาบวกเก็บไว้ใน database
                const result = await counter.findByIdAndUpdate(
                    { _id: options.id },
                    { $inc: { seq: 1 } },
                    { new: true, upsert: true }
                )
                doc[options.inc_field] = options.custom
                ? options.custom(result.seq)
                : result.seq.toString()
            }
            next()
        }catch(e) {
            next(e)
        }
    })
}

module.exports = AutoIncrement
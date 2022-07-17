import mongoose from 'mongoose'

const CounterSchema = mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
})

const counter = mongoose.model('counter', CounterSchema)

const AutoIncrement = (schema, options) => {
  schema.pre('save', async function autoIncrement (next) {
    const doc = this
    try {
      if (doc[options.inc_field] === 0) {
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
    } catch (e) {
      next(e)
    }
  })
}

export default AutoIncrement

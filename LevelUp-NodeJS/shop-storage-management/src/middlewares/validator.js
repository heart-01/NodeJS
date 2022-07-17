import { validationResult } from "express-validator"

// แสดง Error แบบทีเดียว
export const MiddlewaresValidate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(400).json({ errors: errors.array() })
  }
}
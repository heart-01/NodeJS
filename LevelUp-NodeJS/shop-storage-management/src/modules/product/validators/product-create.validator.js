import { checkSchema } from "express-validator"

export const createValidator = checkSchema({
    name: {
        in: ['body'],
        errorMessage: 'name is required',
        isString: true
    },
    categories: {
        in: ['body'],
        errorMessage: 'categories must be array of string',
        // custom validate array
        custom: {
            options: (value, { req, location, path }) => {
                if (!Array.isArray(value)){ // หมวดหมู่ต้องเป็น Array 
                    throw new Error(`Categories must be Array, but got ${typeof value}`)
                }

                // loop ค่าที่อยู่ใน array มาดูว่าเป็น string ไหม
                if (value.some((each) => typeof each !== 'string')){
                    throw new Error(`Element of Categories must be String, but got ${each}`)
                }

                // ถ้าผ่านการ validate
                return true 
            }
        }
    },
    price: {
        in: ['body'],
        errorMessage: 'price must be a number',
        custom: {
            options: (value) => {
                if (typeof value !== 'number'){ // หมวดหมู่ต้องเป็น Array 
                    throw new Error(`Price must be Number, but got ${typeof value}`)
                }

                // ถ้าผ่านการ validate
                return true 
            }
        }
    }
})
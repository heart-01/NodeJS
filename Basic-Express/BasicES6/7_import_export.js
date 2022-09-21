// Import วิธีที่ 1
import { sayHi, sayBye } from './say.js'

// Import แบบทั้งหมด
import * as say from './say.js'

// การ Import จาก Class ที่เป็นแบบ Export default
import User from './user.js'

// สร้าง Object
const obj = new User('Johny')
console.log(obj.name)
obj.sayHi()

sayHi('Samit')
sayBye('Samit')

say.sayHi('Wichai')
say.sayBye('Wicahi')

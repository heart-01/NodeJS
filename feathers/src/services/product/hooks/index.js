const { iff, disallow } = require('feathers-hooks-common')
const errors = require('@feathersjs/errors')

const checkHook = (context) => {
  // return false
  return true
}

const hook1 = (context) => {
    const x = context.data // จะได้ data ของใน form หรือ params และ อื่น ๆ
    console.log('hook1')
    
    if (false) {
      const newError = new errors.GeneralError("test error")
      throw newError
    }

    return context
}

const hooka = (context) => {
    context.data.price += 1;
    return context;
}

const hookb = (context) => {
  context.data.price += 2;
  return context; 
}

const hook2 = (context) => {
    const x = context.data

    console.log('hook2')

    return context
}

module.exports = {
    before: {
      all: [],
      find: [
        //   http://localhost:3030/product/1
        //   http://localhost:3030/product?name=test&price=200
        iff(checkHook, hook1).else(hook2),  // iff จะเช็คการ return ของ checkHook
      ],
      get: [
        // http://localhost:3030/product/
        hook1,
      ],
      create: [
        hooka,
        hookb
      ],
      patch: [],
      remove: [
        disallow('external') // ใช้งาน method remove ได้แค่ภายในหมายถึงการ call method ภายใน function hook
        /* ตัวอย่าง code hook ที่ใช้ call api จากภายใน
        const externalUsersDelete = await context.app.service('external-users').find(
            {
              query: {
                'authentication.clientId': clientId,
              },
            },
            { external: context.params.external }
        )
        */
      ],
    },
    after: {
      all: [],
      find: [],
      get: [],
      create: [],
      patch: [],
      remove: [],
    },
    error: {},
  };
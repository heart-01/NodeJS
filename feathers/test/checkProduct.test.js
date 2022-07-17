// const Cube = require("../modules/cude").Cube
const app = require('../src/app.js')
const chai = require('chai')
const chaiHttp = require('chai-http')
const { expect } = chai
chai.use(chaiHttp)

describe("Testing the Product Functions", () => {

  let requester

  before(async () => {
    server = app.listen(30436)
    requester = chai.request(server).keepOpen()
  })

  describe('Testing the Product already plan', () => {
    it('[create] create Product', (done) => {
      const data = {
        "name": "coffee100",
        "price": 100
      }

      requester.post('/product')
      .send(data)
      .end(function(err, res) {
        expect(res).to.have.status(201) // เช็คว่า response กลับมามี status 201
        done()
      })
    })
  })
  
})

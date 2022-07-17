const humps = require('humps')
const { updateUser } = require('../services/user.service')
const userService = require('../services/user.service')

const userController = {
  async getUsers (req, res) {
    try {
      const users = await userService.getUsers()

      res.json({
        success: true,
        data: users
      }).status(200)
    } catch (error) {
      console.error(`[ERROR ON GET USER] -> ${error.message}`)
      res.json({
        success: false,
        message: `[ERROR ON GET USER] -> ${error.message}`
      }).status(500)
    }
  },
  async createUser (req, res) {
    try {
      const { firstName, lastName, age} = humps.camelizeKeys(req.body)
      const created = await userService.createUser({ firstName, lastName, age })

      res.json({
        success: true,
        data: created
      }).status(201)
    } catch (error) {
      console.error(`[ERROR ON CREATE USER] -> ${error.message}`)
      res.json({
        success: false,
        message: `[ERROR ON CREATE USER] -> ${error.message}`
      }).status(500)
    }
  },
  async updateUser(req, res) {
    try {
      const { id } = humps.camelizeKeys(req.params)
      const { firstName, lastName, age} = humps.camelizeKeys(req.body)
      const updated = await userService.updateUser(id, { firstName, lastName, age })

      res.json({
        success: true,
        data: updated
      }).status(200)
    } catch (error) {
      console.error(`[ERROR ON UPDATE USER] -> ${error.message}`)
      res.json({
        success: false,
        message: `[ERROR ON UPDATE USER] -> ${error.message}`
      }).status(500)
    }
  },
  async deleteUser(req, res) {
    try {
      const { id } = humps.camelizeKeys(req.params)
      const deleted = await userService.deleteUser(id)

      res.json({
        success: true,
        data: deleted
      }).status(200)
    } catch (error) {
      console.error(`[ERROR ON DELETE USER] -> ${error.message}`)
      res.json({
        success: false,
        message: `[ERROR ON DELETE USER] -> ${error.message}`
      }).status(500)
    }
  }
}

module.exports = userController
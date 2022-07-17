const UserDocument = require('../models/user.schema')
const StatusEnum = require('../../../common/status.enum')

const userService = {
  createUser(user) {
    return new UserDocument(user).save()
  },
  getUsers() {
    return UserDocument.find({status: StatusEnum.ACTIVE})
  },
  updateUser(id, user) {
    return UserDocument.findOneAndUpdate({_id: id}, user)
  },
  deleteUser(id) {
    return UserDocument.findOneAndUpdate({_id: id}, {status: StatusEnum.DELETED})
  }
}

module.exports = userService
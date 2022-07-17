"use strict"
const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Account.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      // setting sequelize
      sequelize,
      modelName: 'Accounts', // ชื่อ Model ไว้เรียกใช้งาน
      freezeTableName: true, // กำหนดชื่อ table Products ให้ตรงกับชื่อ Model เลย
      underscored: true,  // สามารถใช้ underscored มาเป็นชื่อ column ใน table ได้
      underscoreAll: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  )
  return Account
}

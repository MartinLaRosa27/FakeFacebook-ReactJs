const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const database = require("../config/database.js");
const Publication = require("./Publication");

const User = database.define("user", {
  _id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  username: {
    type: Sequelize.STRING(90),
    allowNull: false,
    validate: {
      len: [3, 90],
      notContains: " ",
      notEmpty: true,
    },
    unique: true,
  },

  email: {
    type: Sequelize.STRING(90),
    allowNull: false,
    validate: {
      len: [5, 90],
      notContains: " ",
      notEmpty: true,
    },
    unique: true,
  },

  password: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      len: [8, 25],
      notContains: " ",
      notEmpty: true,
    },
  },
});

User.afterValidate(async (user) => {
  const password = await bcrypt.hash(user.password, 10);
  user.password = password;
});

User.hasMany(Publication);

module.exports = User;

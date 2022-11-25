const Sequelize = require("sequelize");
const database = require("../config/database.js");

const Publication = database.define("publication", {
  _id: {
    type: Sequelize.INTEGER(11),
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },

  text: {
    type: Sequelize.STRING(144),
    allowNull: false,
    validate: {
      len: [5, 144],
      notEmpty: true,
    },
  },
});

module.exports = Publication;

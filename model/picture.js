const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite:./db.sqlite');

  module.exports = {

    Picture : sequelize.define('pictures', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: Sequelize.STRING,
      mimetype : Sequelize.STRING,
      filename: Sequelize.STRING,
      file:  Sequelize.STRING,
  })

};

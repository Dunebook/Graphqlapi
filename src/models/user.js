'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      
     
    },
    email: {
      type: DataTypes.STRING,
     
    },
    password: {
      type: DataTypes.STRING,
     
    }
  }, {});

  return User;
};
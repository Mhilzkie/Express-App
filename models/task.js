'use strict';
const {DataTypes, Sequelize} =  require('sequelize');
const instance   = require('../dbconnection');
const task = instance.sequelize.define('tasks',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncerment: true
  },
  task:{
    type: DataTypes.STRING
  },
  userId:{
    type:DataTypes.INTEGER
  }
  },
  {
  createdAt:  true,
  updatedAt:  true,
  deletedAt:  true,
  tableName:  'tasks'
  }
)
exports.model = task;
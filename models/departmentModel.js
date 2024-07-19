const { Sequelize, DataTypes } = require('sequelize');
const dbConnection = require('../db/dbConnection');
const moment = require('moment');

const Department  = dbConnection.define('departments',{
    id : {
        type : DataTypes.INTEGER(11),
        primaryKey : true,
        autoIncrement : true,        
    },
    department_id : {
        type : DataTypes.STRING(255),
        allowNull : false,
        unique : true
    },
    name : {
        type : DataTypes.STRING(255),
        allowNull : false
    },
    creation_date : {
        type : DataTypes.DATE(),
        defaultValue : moment.utc(moment().format('YYYY-MM-DD HH:MM:ss'))
    }
},{
    tableName : 'departments',
    timestamps : false
});


module.exports = Department;
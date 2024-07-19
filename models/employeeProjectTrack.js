const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConnection');
const Employee = require('./employeeModel'); 
const Project = require('./projectModel'); 

const EmployeeProjectTrack = sequelize.define('employeeProjectTrack', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    project_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        references: {
            model: Project,
            key: 'project_id'
        }
    },
    employee_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        references: {
            model: Employee,
            key: 'employee_id'
        }
    },
    joined: {
        type: DataTypes.DATEONLY, 
        allowNull: false
    },
    exit: {
        type: DataTypes.DATEONLY,
        allowNull: true 
    }
}, {
    tableName: 'employee_project_track',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['project_id', 'employee_id']
        }
    ]
});

// Associations
EmployeeProjectTrack.belongsTo(Employee, { foreignKey: 'employee_id', targetKey : 'employee_id' , as: 'employee' });
EmployeeProjectTrack.belongsTo(Project, { foreignKey: 'project_id', targetKey : 'project_id', as: 'project' });
Employee.hasMany(EmployeeProjectTrack, { foreignKey: 'employee_id', sourceKey : 'employee_id',as: 'employeeProjectTracks' });
Project.hasMany(EmployeeProjectTrack, { foreignKey: 'project_id', sourceKey : 'project_id', as: 'projectEmployeeTracks' });

module.exports = EmployeeProjectTrack;

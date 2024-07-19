const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConnection');
const Employee = require('./employeeModel');

const Project = sequelize.define('project', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    project_id: {
        type: DataTypes.STRING(10),
        unique: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    startedOn: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'projects',
    timestamps: false
});


const getProjectId = async () => {
    const lastProject = await Project.findOne({
        order: [['projectId', 'DESC']],
        attributes: ['projectId']
    });

    if (!lastProject) {
        return 'PROJ001';
    }

    const lastId = lastProject.project_id;
    const lastNumber = parseInt(lastId.slice(4), 10);
    const newNumber = lastNumber + 1;
    const newId = `PROJ${newNumber.toString().padStart(3, '0')}`;

    return newId;
}
// Project.beforeCreate(async (project) => {
//     if (!project.projectId) {
//         project.projectId = await getProjectId();
//     }
// });

module.exports = Project;

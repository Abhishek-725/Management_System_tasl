const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConnection');
const Department = require('./departmentModel');

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    employee_id: {
        type: DataTypes.STRING(10),
        unique: true,
    },
    first_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
            model : Department,
            key : 'id'
        }
    },
    onboard_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_deleted : {
        type: DataTypes.ENUM(['0','1']),
        defaultValue : '0'
    }
}, {
    tableName: 'employees', 
    timestamps: false 
});

Employee.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
Department.hasMany(Employee, { foreignKey: 'department_id', as: 'employees' });
Employee.beforeCreate(async (employee) => {
    employee.employee_id = await getEmployeeId();
})

const getEmployeeId = async () => {
    const lastEmployee = await Employee.findOne({
        order: [['employee_id', 'DESC']],
        attributes: ['employee_id']
    });

    if (!lastEmployee) {
        return 'EMP001';
    }

    const lastId = lastEmployee.employee_id;
    const lastNumber = parseInt(lastId.slice(3), 10);
    const newNumber = lastNumber + 1;
    const newId = `EMP${newNumber.toString().padStart(3, '0')}`;

    return newId;
}
module.exports = Employee;

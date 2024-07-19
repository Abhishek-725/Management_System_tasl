const Employee = require("../models/employeeModel");


exports.getEmployeeId = async () => {
try {
    const lastEmployee = await Employee.findOne({
        order: [['employee_id', 'DESC']],
        attributes: ['employee_id']
    });

    if (!lastEmployee) {
        return 'EMP001';
    }

    const lastId = lastEmployee.employeeId;
    const lastNumber = parseInt(lastId.slice(3), 10);
    const newNumber = lastNumber + 1;
    const newId = `EMP${newNumber.toString().padStart(3, '0')}`;

    return newId;
} catch (error) {
    throw error;
}
}
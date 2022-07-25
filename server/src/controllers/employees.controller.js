const employeeCtrl = {}
const Employee = require('../models/Employee')

// Create employee
employeeCtrl.createEmployee = async (req, res) => {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.send({message: 'Employee Created'})
}

// Get all employees
employeeCtrl.getEmployees = async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
}

// Get one employee
employeeCtrl.getEmployee = async (req, res) => {
    // console.log(req.params);
    // const employee = await Employee.findOne({_id: req.params.id})
    const employee = await Employee.findById(req.params.id)
    res.send(employee)
}

// Edit employee
employeeCtrl.editEmployee = async (req, res) => {
    await Employee.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: `Employee ID ${req.params.id} updated`
    })
}

// Delete employee
employeeCtrl.deleteEmployee = async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({
        status: `Employee ID ${req.params.id} deleted`
    })
}


module.exports = employeeCtrl;

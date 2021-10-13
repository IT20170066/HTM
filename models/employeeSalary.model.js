const mongoose = require("mongoose");

const EmployeeSalarykSchema = mongoose.Schema({
  empId: {
    type: String,
    require: true,
    unique: true,
  },
  empJoinDate: {
    type: String,
    require: true,
  },

  salary: {
    type: Number,
    require: true,
  },
  otherAllowances: {
    type:  Number,
    require: true,
  },
  netSalary: {
    type: Number,
    require: true,
  },

  apitDeduction: {
    type: Number,
    require: true,
  },
  EPFDuduction: {
    type: Number,
    require: true,
  },
  EPFContribution: {
    type: Number,
    require: true,
  },
  ETFContribution: {
    type: Number,
    require: true,
  },
  MonthlySalaryPayable: {
    type: Number,
    require: true,
  },
  image_url: {
    type: String,
    default: "https://images.unsplash.com/photo-1610271340738-726e199f0258?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
  },
});

module.exports = mongoose.model("Employee_salary", EmployeeSalarykSchema);

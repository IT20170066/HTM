const EmpSalary = require("../models/employeeSalary.model");
const cloudinary = require("../utils/cloudinary");

const EmpSalaryControllers = {
  addEmplyeeSalary: async (req, res) => {
    // const result = await cloudinary.uploader.upload(req.file.path, {
    //   folder: "EmpSalaryList",
    // });

    try {
      const {
        empId,
        empJoinDate,
        salary,
        otherAllowances,
        netSalary,
        apitDeduction,
        EPFDuduction,
        EPFContribution,
        ETFContribution,
        MonthlySalaryPayable,
      } = req.body;

      if (
        !empId ||
        !empJoinDate ||
        !salary ||
        !otherAllowances ||
        !netSalary ||
        !apitDeduction ||
        !EPFDuduction ||
        !EPFContribution ||
        !ETFContribution ||
        !MonthlySalaryPayable
      ) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "All details must be filled.",
        });
      }

      const empID = await EmpSalary.findOne({ empId });
      if (empID) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: `This ${empID.empId} id already registered.`,
        });
      }

      const newEmpSalary = new EmpSalary({
        empId,
        empJoinDate,
        salary,
        otherAllowances,
        netSalary,
        apitDeduction,
        EPFDuduction,
        EPFContribution,
        ETFContribution,
        MonthlySalaryPayable,
      });

      await newEmpSalary.save();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        EmpSalaryDetails: newEmpSalary,
        message: "Salary details are successfully updated.",
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  getAllEmpSalarys: async (req, res) => {
    try {
      const allEmpSalarys = await EmpSalary.find();

      if (!allEmpSalarys) {
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          EmpSalaryList: allEmpSalarys,
          message: "EmpSalary list not found.",
        });
      } else {
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          EmpSalaryList: allEmpSalarys,
          message: "All EmpSalary list recieved.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  getEmpSalaryById: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const EmpSalaryDetails = await EmpSalary.findById(req.params.id);

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          EmpSalaryDetails: EmpSalaryDetails,
          message: `Employee salary details recieved.`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  uploadImage: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "EmployeeList",
      });
      if (req.params && req.params.id) {
        await EmpSalary.findByIdAndUpdate(req.params.id, {
          image_url: result.secure_url,
        });

        const uploadImage = await EmpSalary.findById(req.params.id);

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          UpdateEmployee: uploadImage,
          message: "Image upload successfully.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  updateEmpSalaryDetails: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const {
          empId,
          empJoinDate,
          salary,
          otherAllowances,
          netSalary,
          apitDeduction,
          EPFDuduction,
          EPFContribution,
          ETFContribution,
          MonthlySalaryPayable,
        } = req.body;

        const updateEmpSalary = await EmpSalary.findById(req.params.id);

        await EmpSalary.findByIdAndUpdate(req.params.id, {
          empId,
          empJoinDate,
          salary,
          otherAllowances,
          netSalary,
          apitDeduction,
          EPFDuduction,
          EPFContribution,
          ETFContribution,
          MonthlySalaryPayable,
        });

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          UpdateEmpSalary: updateEmpSalary,
          message: "Employee salary is updated successfully.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  deleteEmpSalary: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const EmpSalaryID = await EmpSalary.findByIdAndDelete(req.params.id);
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          EmpSalaryDetails: EmpSalaryID,
          message: "Employee Salary is deleted successfully.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  
};
module.exports = EmpSalaryControllers;

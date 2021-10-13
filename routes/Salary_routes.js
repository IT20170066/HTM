const express = require("express");
const upload = require("../utils/multer");
const EmpSalaryControllers = require("../controllers/Salary_controller");

const router = express.Router();

router.get("/:id", EmpSalaryControllers.getEmpSalaryById);
router.get("/", EmpSalaryControllers.getAllEmpSalarys);
router.post("/", EmpSalaryControllers.addEmplyeeSalary);
router.put("/upload_image/:id", upload.single("image"), EmpSalaryControllers.uploadImage);
router.put("/update/:id", EmpSalaryControllers.updateEmpSalaryDetails);
router.delete("/delete/:id", EmpSalaryControllers.deleteEmpSalary);

module.exports = router;

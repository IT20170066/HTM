import axios from "axios";
import React, { useEffect, useState } from "react";
import StockTable from "./SalaryTable";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./supplierStyles.css";

const ViewSalary = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [empSal, setEmpSal] = useState([]);
  const [baseData, setBaseData] = useState([]);
  const [deleted, setDeleted] = useState(0);
  const doc = new jsPDF("landscape");

  const downloadReport = () => {
    doc.text("Hotel Ops - Monthly Salary report", 30, 10);

    let array = [];
    empSal.map((item, index) => {
      let row = [];
      row.push(index + 1);
      row.push(item.empId);
      row.push(item.empJoinDate);
      row.push(item.salary);
      row.push(item.otherAllowances);
      row.push(item.netSalary);
      row.push(item.apitDeduction);
      row.push(item.EPFDuduction);
      row.push(item.EPFContribution);
      row.push(item.ETFContribution);
      row.push(item.MonthlySalaryPayable);
      array.push(row);
      return row;
    });

    doc.autoTable({
      head: [
        [
          "#",
          "Emp ID",
          "Join Date",
          "Basic Salary",
          "Other Allowances",
          "Net Salary(LKR)",
          "APIT Deduction",
          "EPF Deductible",
          "EPF Contribution",
          "ETF Contribution",
          "Monthly Salary Payable",
        ],
      ],

      body: array,
    });

    doc.save("emp_salary.pdf");
  };

  useEffect(() => {
    async function gedData() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/empSalary`
        );
        if (response.status === 200) {
          setEmpSal(response.data.EmpSalaryList);
          setBaseData(response.data.EmpSalaryList);
        }
      } catch (error) {
        toast(error.response.data.message, { type: toast.TYPE.ERROR });
      }
      setIsLoading(false);
    }
    gedData();
  }, [deleted]);

  const search = (inp) => {
    if (!inp.target.value) {
      setEmpSal(baseData);
    } else {
      // if(inputvalue === supplierID || inputvalue === supplierName)
      let searchList = baseData.filter(
        (data) =>
          data.empId.toLowerCase().includes(inp.target.value.toLowerCase())
        // ||
        // data.itemName.toLowerCase().includes(inp.target.value.toLowerCase())
      );
      setEmpSal(searchList);
    }
  };

  return (
    <>
      <div className="container containerTop">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col position-relative link">
                <p>Employee Salary Management</p>
              </div>
            </div>
            <div className="row">
              <div className="col-9 position-relative">
                <h1 className="display-5 fw-bold">Payroll dashboard</h1>
                <ToastContainer />
              </div>
              <hr className="hr" style={{ height: "2px", color: "#0a90e8" }} />
            </div>
            <div className="row">
              <div className="col-2 buttons">
                <Link
                  to="/add_new_employee_salary"
                  type="button"
                  class="btn button_add"
                >
                  <i class="fal fa-plus-circle"></i>&nbsp;&nbsp;Add Salary
                </Link>
                <br />
                <br />
              </div>

              <div className="col-4 buttons2">
                <Link onClick={downloadReport} class="button_pdf">
                  <i class="fas fa-download"></i>&nbsp;&nbsp;Download Monthly Salary Report
                </Link>
                <br />
                <br />
              </div>
              <div className="col-2" />
              <div
                className="col-3 search position-relative"
                style={{ marginTop: "20px" }}
              >
                <i className="fa fa-search"></i>{" "}
                <input
                  className="form-control"
                  type="Search"
                  placeholder="Search a employee id"
                  name="searchQuery"
                  onChange={search}
                />
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="container text-center py-5">
            <Loader type="Oval" color="#0d6efd" height={30} width={30} />
          </div>
        ) : empSal.length > 0 ? (
          <>
            <StockTable
              empSal={empSal}
              setDeleted={setDeleted}
              deleted={deleted}
            />
          </>
        ) : (
          <div className="container text-center py-5">
            <h3>No Salary found</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewSalary;

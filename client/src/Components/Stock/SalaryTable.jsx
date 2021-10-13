import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swl from "sweetalert";
import { toast } from "react-toastify";

class SalaryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EmpSalaryList: [],
    };
    this.onDelete = this.onDelete.bind(this);
  }

  async componentDidMount() {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/empSalary/`)
      .then((response) => {
        this.setState({ EmpSalaryList: response.data.EmpSalaryList });
        console.log("EmpSalaryList =>", this.state.EmpSalaryList);
      });
  }

  onDelete(e, id) {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/api/empSalary/delete/${id}`)
      .then((res) => {
        console.log("res", res);
        if (res.data.code === 200) {
          toast.success(res.data.message);
          window.location.reload();
        } else {
          toast.error(res.data.message);
        }
      });
  }

  render() {
    return (
      <div className="container">
        <div className="shadowBox">
          <div className="row">
            <div className="col-12">
              <table class="table table-hover">
                <thead className="table-primary">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Emp ID</th>
                    <th scope="col">Join Date</th>
                    <th scope="col">Basic Salary</th>
                    <th scope="col">Other Allowances</th>
                    <th scope="col">Net Salary(LKR)</th>
                    <th scope="col">APIT Deduction</th>
                    <th scope="col">EPF Deductible</th>
                    <th scope="col">EPF Contribution</th>
                    <th scope="col">ETF Contribution</th>
                    <th scope="col">Monthly Salary Payable</th>
                    <th scope="col">Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.EmpSalaryList.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <th scope="row">
                          <img
                            src={item.image_url}
                            alt=""
                            style={{ width: 150, height: 150 }}
                          />
                        </th>
                        <td>{"EMP"+item.empId}</td>
                        <td>{item.empJoinDate}</td>
                        <td>{item.salary}</td>
                        <td>{item.otherAllowances}</td>
                        <td>{item.netSalary}</td>
                        <td>{item.apitDeduction}</td>
                        <td>{item.EPFDuduction}</td>
                        <td>{item.EPFContribution}</td>
                        <td>{item.ETFContribution}</td>
                        <td>{item.MonthlySalaryPayable}</td>
                        <td>
                          <Link
                            to={`/update_salary/${item._id}`}
                            type="button"
                            class="btn btn-warning"
                            style={{ width: "95px", margin: "2px" }}
                          >
                            <i class="far fa-edit"></i>&nbsp;Edit
                          </Link>
                          &nbsp;&nbsp;
                          <Link
                            className="btn btn-danger"
                            onClick={(e) => {
                              if (
                                window.confirm(
                                  "Are you sure about removing the selected payroll detail? If yes, all payroll details related to the employee will be permanently removed!"
                                )
                              )
                                this.onDelete(e, item._id);
                            }}
                            style={{ width: "95px", margin: "2px" }}
                          >
                            <i class="fa fa-trash-o"></i>&nbsp;Delete
                          </Link>
                          &nbsp;&nbsp;
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SalaryTable;

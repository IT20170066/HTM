import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../NavBar/Button";
import "./supplierStyles.css";

const initialState = {
  empId: "",
  empJoinDate: "",
  salary: "",
  otherAllowances: "",
  netSalary: "",
  apitDeduction: "",
  EPFDuduction: "",
  EPFContribution: "",
  ETFContribution: "",
  MonthlySalaryPayable: "",
  image: null,
  previewImage: null,
};

class EditSalary extends Component {
  constructor(props) {
    super(props);
    this.state = { initialState, empSalaryList: [] };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onuploadImage = this.onuploadImage.bind(this);
    //this.onFileChange = this.onFileChange.bind(this);
    //this.onCalculate = this.onCalculate.bind(this);
  }

  onFileChange = (event) => {
    this.setState({ image: event.target.files[0] });
    this.setState({ previewImage: URL.createObjectURL(event.target.files[0]) });
  };

  async componentDidMount() {
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/empSalary/${this.props.match.params.id}`
      )
      .then((res) => {
        this.setState({ empSalaryList: res.data.EmpSalaryDetails });
        console.log("empSalaryList", this.state.empSalaryList);

        this.setState({
          empId: this.state.empSalaryList.empId,
        });
        this.setState({
          empJoinDate: this.state.empSalaryList.empJoinDate,
        });
        this.setState({
          salary: this.state.empSalaryList.salary,
        });
        this.setState({
          otherAllowances: this.state.empSalaryList.otherAllowances,
        });
        this.setState({
          netSalary: this.state.empSalaryList.netSalary,
        });
        this.setState({
          apitDeduction: this.state.empSalaryList.apitDeduction,
        });
        this.setState({
          EPFDuduction: this.state.empSalaryList.EPFDuduction,
        });
        this.setState({
          EPFContribution: this.state.empSalaryList.EPFContribution,
        });
        this.setState({
          ETFContribution: this.state.empSalaryList.ETFContribution,
        });
        this.setState({
          apit: this.state.empSalaryList.MonthlySalaryPayable,
        });
        this.setState({
          previewImage: this.state.empSalaryList.image_url,
        });
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async onuploadImage(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("image", this.state.image);

    await axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/api/empSalary/upload_image/${this.props.match.params.id}`,
        formData
      )
      .then((res) => {
        console.log("res", res);

        if (res.data.code === 200) {
          window.location.reload();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      });
  }

  async onSubmit(event) {
    event.preventDefault();

    let empSalary = {
      empId: this.state.empId,
      empJoinDate: this.state.empJoinDate,
      salary: this.state.salary,
      otherAllowances: this.state.otherAllowances,
      netSalary: this.state.netSalary,
      apitDeduction: this.state.apitDeduction,
      EPFDuduction: this.state.EPFDuduction,
      EPFContribution: this.state.EPFContribution,
      ETFContribution: this.state.ETFContribution,
      MonthlySalaryPayable: this.state.MonthlySalaryPayable,
    };

    await axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/api/empSalary/update/${this.props.match.params.id}`,
        empSalary
      )
      .then((res) => {
        console.log("res", res);

        if (res.data.code === 200) {
          window.location.reload();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      });
  }

  render() {
    return (
      <div className="container containerTop">
        <div className="row">
          <div className="col position-relative link">
            <p>
              <Link to="/employee_salary">Employee Salary Management</Link>{" "}
              {">"} Edit Employee Salary Details
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-9 position-relative">
            <h1 className="display-5 fw-bold">Edit Employee Salary Details</h1>
            <ToastContainer />
          </div>
          <hr className="hr" style={{ height: "2px", color: "#0a90e8" }} />
        </div>

        <div>
          <div className="row">
            <div className="col-6">
              <center>
                <img
                  src={this.state.previewImage}
                  alt=""
                  style={{ width: 400, height: 400, margin: 45 }}
                />

                <div className="d-grid gap-0 col-6" style={{ marginTop: -40 }}>
                  <input
                    type="file"
                    className="form-control"
                    minLength="5"
                    maxLength="10"
                    name="image"
                    accept="image/*"
                    required
                    onChange={this.onFileChange}
                  />
                </div>
              </center>
              <center>
                <div class="d-grid gap-2 col-6 mx-auto  ">
                  <button
                    type="submit"
                    className="btn btn-primary sub_btn"
                    onClick={this.onuploadImage}
                  >
                    <i class="far fa-save"></i>&nbsp;&nbsp; Update Employee
                    Profile
                  </button>
                </div>
              </center>
            </div>

            <div className="col-6">
              <form method="POST" onSubmit={this.onSubmit}>
                <div className="row ">
                  <div className="shadowBox">
                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>Employee ID</label>
                      <input
                        type="text"
                        className="form-control"
                        name="empId"
                        minLength="3"
                        maxLength="3"
                        value={"EMP"+this.state.empId}
                        onChange={this.onChange}
                        readOnly
                      />
                    </div>

                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>
                        Employee Joining Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="empJoinDate"
                        value={this.state.empJoinDate}
                        readOnly
                      />
                    </div>

                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>
                        Basic Salary
                      </label>
                      <input
                        type="number"
                        className={"form-control"}
                        name="salary"
                        value={this.state.salary}
                        onChange={this.onChange}
                      />
                    </div>

                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>
                        Other Allowances
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="otherAllowances"
                        value={this.state.otherAllowances}
                        onChange={this.onChange}
                      />
                    </div>

                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>Net Salary</label>
                      <input
                        type="number"
                        className="form-control"
                        name="netSalary"
                        value={this.state.otherAllowances+this.state.salary}
                        readOnly
                      />
                    </div>

                    <div
                    className="form-group"
                    style={{ marginBottom: "15px" }}
                  >
                    <label style={{ marginBottom: "5px" }}>
                      Liable for APIT:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                    <label class='radiolabel'><input type="radio"  name="apitLiability" value="Yes" onclick="apitcalculate()"/>Yes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <label class='radiolabel'><input type="radio"  name="apitLiability" value="No" onclick="apitcalculate()"/>No</label><br/>
                  </div>

                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>
                        APIT Deduction
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="apitDeduction"
                        value={this.state.apitDeduction}
                        onChange={this.onChange}
                      />
                    </div>

                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>
                        EPF Deductible
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="EPFDuduction"
                        value={this.state.salary * 0.08}
                        readOnly
                      />
                    </div>

                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>
                        EPF Contribution
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="EPFContribution"
                        value={this.state.salary *.12}
                        readOnly
                      />
                    </div>

                    <div
                      className="form-group"
                      style={{ marginBottom: "15px" }}
                    >
                      <label style={{ marginBottom: "5px" }}>
                        ETF Contribution
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="ETFContribution"
                        value={this.state.salary *.03}
                        readOnly
                      />
                    </div>

                    <div
                    className="form-group"
                    style={{ marginBottom: "15px" }}
                  >
                    <label style={{ marginBottom: "5px" }}>
                      Monthly salary payable
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="MonthlySalaryPayable"
                      value={this.state.netSalary- this.state.apitDeduction - this.state.EPFDuduction}
                      readOnly
                    />
                  </div>

                    <center>
                      <div class="d-grid gap-2 col-6 mx-auto  ">
                        <button
                          type="submit"
                          className="btn btn-primary sub_btn"
                          onClick={this.onSubmit}
                        >
                          <i class="far fa-save"></i>&nbsp;&nbsp; Update Salary
                          Details
                        </button>
                      </div>
                    </center>
                  </div>
                  <div className="col-3" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default EditSalary;

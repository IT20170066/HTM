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
  apit: "",
  apitDeduction: "",
  EPFDuduction: "",
  EPFContribution: "",
  ETFContribution: "",
  image: null,
  previewImage: null,
};

class AddSalary extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onCalculate = this.onCalculate.bind(this);
  }

  onFileChange = (event) => {
    this.setState({ image: event.target.files[0] });
    this.setState({ previewImage: URL.createObjectURL(event.target.files[0]) });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(event) {
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

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/empSalary/`, empSalary)
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

  // onCalculate(event) {
  //   this.setState({
  //     totalPrice: this.state.itemQnty * this.state.itemPrice,
  //   });
  // }

  render() {
    return (
      <div className="container containerTop">
        <div className="row">
          <div className="col position-relative link">
            <p>
              <Link to="/employee_salary">Employee Salary Management</Link>{" "}
              {">"} Add New Employee Salary
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-9 position-relative">
            <h1 className="display-5 fw-bold">Add New Employee Salary</h1>
            <ToastContainer />
          </div>
          <hr className="hr" style={{ height: "2px", color: "#0a90e8" }} />
        </div>

        <div style={{ marginLeft: 50 }} >
          <form method="POST" onSubmit={this.onSubmit}>
            <div className="col-6">
              <div className="row ">
                <div className="shadowBox">
                  <div
                    className="form-group"
                    style={{ marginBottom: "15px" }}
                  >
                    <label style={{ marginBottom: "5px" }}>Employee ID</label>
                    <input
                      type="number"
                      className="form-control"
                      name="empId"
                      minLength="3"
                      maxLength="3"
                      value={this.state.empId}
                      onChange={this.onChange}
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
                      onChange={this.onChange}
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
                      className="form-control"
                      name="salary"
                      placeholder = 'salary'
                      value={this.state.salary}
                      onChange={this.onChange}
                      required
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
                      placeholder = 'otherAllowance'
                      value={this.state.otherAllowances}
                      onChange={this.onChange}
                      required
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
                      placeholder = 'netSalary'
                      value={this.state.salary + this.state.otherAllowances}
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
                      EPF Deduction
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="EPFDuduction"
                      value={this.state.EPFDuduction}
                      onChange={this.onChange}
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
                      type="text"
                      className="form-control"
                      name="EPFContribution"
                      value={this.state.EPFContribution}
                      onChange={this.onChange}
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
                      value={this.state.ETFContribution}
                      onChange={this.onChange}
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
                      type="text"
                      className="form-control"
                      name="MonthlySalaryPayable"
                      value={this.state.MonthlySalaryPayable}
                      onChange={this.onChange}
                    />
                  </div>

                  <center>
                    <div class="d-grid gap-2 col-6 mx-auto  ">
                      <button
                        type="submit"
                        className="btn btn-primary sub_btn"
                        onClick={this.onSubmit}
                      >
                        <i class="far fa-save"></i>&nbsp;&nbsp; Save Salary
                        Details
                      </button>
                    </div>
                  </center>
                </div>
                <div className="col-3" />
              </div>
            </div>

          </form>
        </div>
      </div>

      // <div>
      //   <div className="container containerTop">
      //     <div className="row">
      //       <div className="col position-relative link">
      //         <p>
      //           <Link to="/products">Stock Management</Link> {">"} Add New
      //           Supplier
      //         </p>
      //       </div>
      //     </div>
      //     <div className="row">
      //       <div className="col-9 position-relative">
      //         <h1 className="display-5 fw-bold">Add New Item To Stock</h1>
      //         <ToastContainer />
      //       </div>
      //       <hr className="hr" style={{ height: "2px", color: "#0a90e8" }} />
      //     </div>
      //   </div>
      //   <div className="row">
      //     <div className="col-2" />
      //     <div className="col-8 shadowBox">
      //       <form onSubmit={this.onSubmit}>
      //         <div className="row">
      //           <div className="col-6">
      //             <div className="form-group">
      //               <label htmlFor="name">Item ID</label>
      //               <input
      //                 type="text"
      //                 className="form-control"
      //                 name="itemId"
      //                 value={this.state.itemId}
      //                 onChange={this.onChange}
      //                 required
      //                 placeholder="SI-000"
      //               />
      //             </div>
      //           </div>

      //           <div className="col-3">
      //             <div className="form-group ">
      //               <label htmlFor="supplierId">Total Price</label>
      //               <input
      //                 type="text"
      //                 className="form-control"
      //                 name="totalPrice"
      //                 value={this.state.totalPrice}
      //                 onChange={this.onChange}
      //                 readOnly
      //               />
      //             </div>
      //           </div>

      //           <div className="col-3">
      //             <div className="form-group ">
      //               <button
      //                 type="button"
      //                 className="btn btn-primary sub_btn"
      //                 style={{ marginTop: 20 }}
      //                 onClick={this.onCalculate}
      //               >
      //                 Calculate Total
      //               </button>
      //             </div>
      //           </div>
      //         </div>
      //         <br />

      //         <div className="row">
      //           <div className="col-6">
      //             <div className="form-group">
      //               <label htmlFor="email">Item Name </label>
      //               <input
      //                 type="text"
      //                 className="form-control"
      //                 name="itemName"
      //                 value={this.state.itemName}
      //                 onChange={this.onChange}
      //                 required
      //               />
      //             </div>
      //           </div>
      //           <div className="col-6">
      //             <div className="form-group">
      //               <label htmlFor="br_number">Images</label>
      //               <input
      //                 type="file"
      //                 className="form-control"
      //                 name="image"
      //                 accept="image/*"
      //                 onChange={this.onFileChange}
      //                 required
      //               />
      //             </div>
      //           </div>
      //         </div>
      //         <br />

      //         <div className="row">
      //           <div className="col-6">
      //             <div className="form-group">
      //               <label htmlFor="address">Supplier Id</label>
      //               <input
      //                 type="text"
      //                 className="form-control"
      //                 name="supplierId"
      //                 value={this.state.supplierId}
      //                 onChange={this.onChange}
      //                 required
      //               />
      //             </div>
      //           </div>

      //           <div className="col-6">
      //             <div className="form-group">
      //               <label htmlFor="br_number">Preview</label>
      //               <img
      //                 src={this.state.previewImage}
      //                 alt=""
      //                 style={{ height: 150, width: 150, marginLeft: 20 }}
      //               />
      //             </div>
      //           </div>
      //         </div>
      //         <br />

      //         <div className="row">
      //           <div className="col-6">
      //             <div className="form-group">
      //               <label htmlFor="product_name">Item Price </label>
      //               <input
      //                 type="text"
      //                 className="form-control"
      //                 name="itemPrice"
      //                 value={this.state.itemPrice}
      //                 onChange={this.onChange}
      //                 required
      //               />
      //             </div>
      //           </div>
      //         </div>
      //         <br />
      //         <div className="row">
      //           <div className="col-6">
      //             <div className="form-group">
      //               <label htmlFor="product_name">Item Quantity </label>
      //               <input
      //                 type="number"
      //                 className="form-control"
      //                 name="itemQnty"
      //                 value={this.state.itemQnty}
      //                 onChange={this.onChange}
      //                 required
      //               />
      //             </div>
      //           </div>
      //           <div className="col-6">
      //             <div className="form-group">
      //               <label htmlFor="product_price">
      //                 Pick Date (Item Arrived){" "}
      //               </label>
      //               <input
      //                 type="date"
      //                 className="form-control"
      //                 name="pickDate"
      //                 value={this.state.pickDate}
      //                 onChange={this.onChange}
      //                 required
      //               />
      //             </div>
      //           </div>
      //         </div>
      //         <br />

      //         <div className="row">
      //           <div className="col-4" />
      //           <div className="col-4">
      //             <button type="submit" className="btn btn-primary sub_btn">
      //               Add Item To Stock
      //             </button>
      //           </div>
      //           <div className="col-4" />
      //         </div>
      //       </form>
      //     </div>
      //     <div className="col-2" />
      //   </div>
      // </div>
    );
  }
}
export default AddSalary;

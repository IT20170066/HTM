import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../NavBar/Button";
import "./supplierStyles.css";

const initialState = {
  itemId: "",
  itemName: "",
  supplierId: "",
  itemQnty: "",
  itemPrice: "",
  totalPrice: "",
  pickDate: "",
  image: null,
  previewImage: null,
};

class UpdateStockItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialState,
      itemList: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onCalculate = this.onCalculate.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onFileChange = (event) => {
    this.setState({ image: event.target.files[0] });
    this.setState({ previewImage: URL.createObjectURL(event.target.files[0]) });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async componentDidMount() {
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/stock_itmes/${this.props.match.params.id}`
      )
      .then((res) => {
        this.setState({ itemList: res.data.Stocks });
        console.log("itemList", this.state.itemList);

        this.setState({
          itemId: this.state.itemList.itemId,
        });
        this.setState({
          itemName: this.state.itemList.itemName,
        });
        this.setState({
          supplierId: this.state.itemList.supplierId,
        });
        this.setState({
          itemQnty: this.state.itemList.itemQnty,
        });
        this.setState({
          itemPrice: this.state.itemList.itemPrice,
        });
        this.setState({
          totalPrice: this.state.itemList.totalPrice,
        });
        this.setState({
          pickDate: this.state.itemList.pickDate,
        });
        this.setState({
          previewImage: this.state.itemList.image_url,
        });
      });
  }

  onSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("image", this.state.image);
    formData.append("itemId", this.state.itemId);
    formData.append("itemName", this.state.itemName);
    formData.append("supplierId", this.state.supplierId);
    formData.append("itemQnty", this.state.itemQnty);
    formData.append("itemPrice", this.state.itemPrice);
    formData.append("totalPrice", this.state.totalPrice);
    formData.append("pickDate", this.state.pickDate);

    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/api/stock_itmes/update/${this.props.match.params.id}`,
        formData
      )
      .then((res) => {
        console.log("res", res);

        if (res.data.code === 200) {
          window.location = "/products";
          toast(res.data.message, { type: toast.TYPE.SUCCESS });

          console.log("suc", res);
        } else {
          window.location = "/products";
          toast(res.data.message, { type: toast.TYPE.ERROR });
        }
      });
  }

  onCalculate(event) {
    this.setState({
      totalPrice: this.state.itemQnty * this.state.itemPrice,
    });
  }

  onDelete(event) {
    event.preventDefault();

    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/stock_itmes/delete/${this.props.match.params.id}`
      )
      .then((res) => {
        console.log("res", res);
        if (res.data.code === 200) {
          toast.success(res.data.message);
          this.props.history.push("/products");
        } else {
          toast.error(res.data.message);
          window.location = "/products";
        }
      });
  }

  render() {
    return (
      <div>
        <div className="container containerTop">
          <div className="row">
            <div className="col position-relative link">
              <p>
                <Link to="/products">Stock Management</Link> {">"} Update
                Existing Item
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-9 position-relative">
              <h1 className="display-5 fw-bold">
                Update Existing Item of Stock
              </h1>
              <ToastContainer />
            </div>
            <hr className="hr" style={{ height: "2px", color: "#0a90e8" }} />
          </div>
        </div>
        <div className="row">
          <div className="col-2" />
          <div className="col-8 shadowBox">
            <form onSubmit={this.onSubmit}>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="name">Item ID</label>
                    <input
                      type="text"
                      className="form-control"
                      name="itemId"
                      value={this.state.itemId}
                      onChange={this.onChange}
                      required
                      readOnly
                    />
                  </div>
                </div>

                <div className="col-3">
                  <div className="form-group ">
                    <label htmlFor="supplierId">Total Price</label>
                    <input
                      type="text"
                      className="form-control"
                      name="totalPrice"
                      value={this.state.totalPrice}
                      onChange={this.onChange}
                      readOnly
                    />
                  </div>
                </div>

                <div className="col-3">
                  <div className="form-group ">
                    <button
                      type="button"
                      className="btn btn-primary sub_btn"
                      style={{ marginTop: 20 }}
                      onClick={this.onCalculate}
                    >
                      Calculate Total
                    </button>
                  </div>
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="email">Item Name </label>
                    <input
                      type="text"
                      className="form-control"
                      name="itemName"
                      value={this.state.itemName}
                      onChange={this.onChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="br_number">Images</label>
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      accept="image/*"
                      onChange={this.onFileChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="address">Supplier Id</label>
                    <input
                      type="text"
                      className="form-control"
                      name="supplierId"
                      value={this.state.supplierId}
                      onChange={this.onChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="br_number">Preview</label>
                    <img
                      src={this.state.previewImage}
                      alt=""
                      style={{ height: 150, width: 150, marginLeft: 20 }}
                    />
                  </div>
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="product_name">Item Price </label>
                    <input
                      type="text"
                      className="form-control"
                      name="itemPrice"
                      value={this.state.itemPrice}
                      onChange={this.onChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="product_name">Item Quantity </label>
                    <input
                      type="number"
                      className="form-control"
                      name="itemQnty"
                      value={this.state.itemQnty}
                      onChange={this.onChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="product_price">
                      Pick Date (Item Arrived){" "}
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="pickDate"
                      value={this.state.pickDate}
                      onChange={this.onChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-4" />
                <div className="col-4">
                  <button type="submit" className="btn btn-primary sub_btn">
                    Update Item
                  </button>
                </div>
                <div className="col-4" />
              </div>
            </form>

            <div className="row">
              <div className="col-4" />
              <div className="col-4">
                <button
                  type="submit"
                  className="btn btn-primary sub_btn"
                  onClick={this.onDelete}
                >
                  Delete Item
                </button>
              </div>
              <div className="col-4" />
            </div>
          </div>
          <div className="col-2" />
        </div>
      </div>
    );
  }
}
export default UpdateStockItem;

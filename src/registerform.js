import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

class Addrecipies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: props.updateditem || {},
      errors: {},
      value: '',
      itemname: '',
      itemdescription: '',
      count: null,
      updatingname: this.props.updateditem ? this.props.updateditem.name : null,
      updatingprice: this.props.updateditem
        ? this.props.updateditem.price
        : null,
      updatingdescription: this.props.updateditem
        ? this.props.updateditem.description
        : null,
    };
    this.submituserRegistrationForm =
      this.submituserRegistrationForm.bind(this);
  }
  onchangefields = (e) => {
    if (e.target.id == 'description') {
      if (!this.props.updateditem) {
        if (e.target.value.length <= 3000) {
          this.setState({ count: e.target.maxLength - e.target.value.length });
        } else {
          this.setState({ count: 0 });
        }
        const re = /^[a-zA-z0-9 "".(),.\/\s\.'-]+$/;
        if (e.target.value === '' || re.test(e.target.value))
          this.setState({ itemdescription: e.target.value });
      } else {
        if (e.target.value.length <= 3000) {
          this.setState({ count: e.target.maxLength - e.target.value.length });
        } else {
          this.setState({ count: 0 });
        }
        const re = /^[a-zA-z0-9 "".(),.\/\s\.'-]+$/;
        if (e.target.value === '' || re.test(e.target.value))
          this.setState({ updatingdescription: e.target.value });
      }
    }
    if (e.target.id == 'price') {
      if (!this.props.updateditem) {
        const re = /^[0-9]/;
        if (e.target.value === '' || re.test(e.target.value))
          this.setState({ value: e.target.value });
      } else {
        const re = /^[0-9]+$/;
        if (e.target.value === '' || re.test(e.target.value))
          this.setState({ updatingprice: e.target.value });
      }
    }

    if (e.target.id == 'name') {
      if (!this.props.updateditem) {
        const re = /^[a-zA-Z0-9]+$/;
        if (e.target.value === '' || re.test(e.target.value))
          this.setState({ itemname: e.target.value });
      } else {
        const re = /^[a-zA-Z0-9]+$/;
        if (e.target.value === '' || re.test(e.target.value))
          this.setState({ updatingname: e.target.value });
      }
    }
  };
  submituserRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      if (this.props.updateditem) {
        this.submitUpdateRecipes();
      }
      if (!this.props.updateditem) {
        this.submitAddRecipes();
      }
    }
  }
  submitUpdateRecipes() {
    this.props.upitem(this.state.fields);
  }
  submitAddRecipes() {
    this.props.onAddRecipe(this.state.fields);
  }

  handleFileRead = async (event) => {
    if (!this.props.updateditem) {
      const file = event.target.files[0];
      const img = await this.convertBase64(file);
      this.setState({ fields: { ...this.state.fields, img: img } });
    } else {
      const file = event.target.files[0];
      const img = await this.convertBase64(file);
      this.setState({ fields: { ...this.state.fields, img: img } });
    }
  };
  convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  validateForm() {
    let fields = this.state.fields;
    if (!this.props.updateditem) {
      fields['description'] = this.state.itemdescription;
      this.setState({ fields });
      fields['price'] = this.state.value;
      this.setState({ fields });
      fields['name'] = this.state.itemname;
      this.setState({ fields });
    }
    if (this.props.updateditem) {
      fields['description'] = this.state.updatingdescription;
      this.setState({ fields });
      fields['price'] = this.state.updatingprice;
      this.setState({ fields });
      fields['name'] = this.state.updatingname;
      this.setState({ fields });
    }

    let errors = {};
    let formIsValid = true;
    if (!fields['img']) {
      formIsValid = false;
      errors['img'] = '*Please Choose the file.';
    }
    if (!fields['name']) {
      formIsValid = false;
      errors['name'] = '*Please enter Recipe name.';
    }
    if (!fields['price']) {
      formIsValid = false;
      errors['price'] = '*Please enter the price';
    }
    if (!fields['description']) {
      formIsValid = false;
      errors['description'] = '*Please enter the Description';
    }
    this.setState({
      errors: errors,
    });
    return formIsValid;
  }
  render() {
    const {
      value,
      itemname,
      itemdescription,
      updatingname,
      updatingprice,
      updatingdescription,
    } = this.state;
    return (
      <form method="post" name="userRegistrationForm">
        <div className="container" id="register"></div>
        {/* IMAGE */}
        <div
          className="row mt-5"
          style={{ height: '50px', padding: '5px', marginTop: '20px' }}
        >
          <div className="col-md-1"></div>
          <div className="col-md-2">
            <label>IMAGE</label>
          </div>
          <div className="col-md-2">
            <label>-</label>
          </div>
          <div className="col-md-2">
            {!this.props.updateditem && (
              <input
                type="file"
                accept="image/jpeg, image/png"
                name="img"
                defaultValue={this.state.fields.img}
                onChange={(e) => this.handleFileRead(e)}
              />
            )}
            {this.props.updateditem && (
              <input
                type="file"
                accept="image/jpeg, image/png"
                name="img"
                defaultValue={''}
                onChange={(e) => this.handleFileRead(e)}
              />
            )}
            <div className="errorMsg" style={{ color: 'red', width: '250px' }}>
              {this.state.errors.img}
            </div>
            <br />
          </div>

          <div className="col-md-2"></div>

          <div
            className="col-sm-2"
            style={{ padding: '0px', border: '1px rgb(15, 15, 15) solid' }}
          >
            <div
              className="short-div"
              style={{ position: 'relative', zIndex: '1' }}
            >
              {this.props.updateditem && (
                <img
                  src={this.state.fields.img}
                  className="card-img-top"
                  style={{
                    height: '200px',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${this.props.updateditem.img})`,
                    zIndex: '2',
                  }}
                  id="bimage"
                />
              )}
              {!this.props.updateditem && (
                <img
                  src={this.state.fields.img}
                  className="card-img-top"
                  style={{ height: '200px' }}
                  id="bimage"
                />
              )}
            </div>
          </div>
        </div>
        {/* NAME */}

        <div
          className="row mt-5"
          style={{
            padding: '0px 0px 0px 0px',
            height: '50px',
            marginTop: '35px',
          }}
        >
          <div className="col-md-1"></div>
          <div className="col-md-2">
            <label>NAME</label>
          </div>
          <div className="col-md-2">
            <label>-</label>
          </div>
          <div className="col-md-3">
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              value={this.props.updateditem ? updatingname : itemname}
              onChange={this.onchangefields}
              placeholder="Enter the Recipe Name"
            />
            <div className="errorMsg" style={{ color: 'red', width: '250px' }}>
              {this.state.errors.name}
            </div>
            <br />
          </div>
          <div className="col-md-2"></div>
          <div className="col-sm-2"></div>
          <div className="col-md-2"></div>
        </div>
        {/* PRICE */}

        <div
          className="row mt-3"
          style={{
            padding: '0px 0px 0px 0px',
            height: '50px',
            marginTop: '35px',
          }}
        >
          <div className="col-md-1"></div>
          <div className="col-md-2">
            <label>PRICE</label>
          </div>
          <div className="col-md-2">
            <label>-</label>
          </div>
          <div className="col-md-3">
            <input
              type="text"
              id="price"
              name="price"
              autoComplete="off"
              value={this.props.updateditem ? updatingprice : value}
              onChange={this.onchangefields}
              placeholder="Enter the Price"
            />
            <div className="errorMsg" style={{ color: 'red', width: '250px' }}>
              {this.state.errors.price}
            </div>
            <br />
          </div>
          <div className="col-md-2"></div>
          <div className="col-sm-2"></div>
          <div className="col-md-2"></div>
        </div>
        {/* DESCRIPTION */}
        <div
          className="row mt-3"
          style={{
            padding: '0px 0px 0px 0px',
            height: '50px',
            marginTop: '35px',
          }}
        >
          <div className="col-md-1"></div>
          <div className="col-md-2">
            <label>DESCRIPTION</label>
          </div>
          <div className="col-md-2">
            <label>-</label>
          </div>
          <div className="col-md-3">
            <textarea
              id="description"
              rows="4"
              cols="30"
              maxLength="3000"
              name="description"
              autoComplete="off"
              value={
                this.props.updateditem ? updatingdescription : itemdescription
              }
              onChange={this.onchangefields}
              placeholder="Enter the Description"
              style={{ overflow: 'auto' }}
            />
            {this.props.updateditem && (
              <div style={{ width: '350px', fontSize: '12px' }}>
                Maximum letters to be entered:
                {this.state.count
                  ? this.state.count
                  : this.props.updateditem.description.length}
                /3000
              </div>
            )}
            {!this.props.updateditem && (
              <div style={{ width: '350px', fontSize: '12px' }}>
                Maximum letters to be entered:
                {this.state.count ? this.state.count : 0}/3000
              </div>
            )}
            <div className="errorMsg" style={{ color: 'red', width: '250px' }}>
              {this.state.errors.description}
            </div>
            <br />
          </div>
          <div className="col-md-2"></div>
          <div className="col-sm-2"></div>
          <div className="col-md-2"></div>
        </div>
        <br />
        <br />
        <br />
        <div className="container-1" id="form">
          <div className="row mt-5">
            <div className="col-md-2"></div>
            <div className="col-md-2"></div>
            <div className="col-md-3">
              {this.props.updateditem && (
                <button
                  type="button"
                  className="btn btn-primary float-right mb-2"
                  style={{ float: 'right' }}
                  onClick={this.submituserRegistrationForm}
                >
                  Update
                </button>
              )}
              {!this.props.updateditem && (
                <button
                  type="button"
                  className="btn btn-primary float-right mb-2"
                  style={{ float: 'right' }}
                  onClick={this.submituserRegistrationForm}
                >
                  Submit
                </button>
              )}
            </div>
            <div className="col-md-2"></div>
            <div className="col-sm-2"></div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </form>
    );
  }
}
export default Addrecipies;

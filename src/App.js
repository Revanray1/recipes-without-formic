import 'bootstrap/dist/css/bootstrap.min.css';
import Addrecipies from './registerform';
// import data from './itemslist/items.json'
import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import { ModalHeader } from 'react-bootstrap';
import Addmodel from './';
import axios from 'axios';

class Modals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCarosal: true,
      item: [],
      updatemodal: false,
      updateditem: null,
      itemid: null,
      fields: {},
    };
  }
  componentDidMount = async () => {
    const Allitems = await fetchitems();
    this.setState({ item: Allitems });
  };
  onAddRecipe = async (e) => {
    const newitem = await addnewitem(e);
    console.log(newitem);
    this.state.item.push(newitem);
    this.setState({ item: this.state.item, showCarosal: false });
    this.updateCarosal();
  };
  Update = (newitem, index) => {
    this.setState({
      itemid: index,
      updatemodal: true,
      updateditem: newitem,
      showCarosal: false,
    });
    this.updateCarosal();
  };
  delete = async (e, index) => {
    if (window.confirm('Are you sure! You want to delete ITEM : -' + e.name)) {
      const delitem = await deleteitem(e);
      console.log(delitem);
      this.state.item.splice(index, 1);
      this.setState({ item: this.state.item });
      console.log('Deleted');
      this.updateCarosal();
    }
  };
  upitem = async (e) => {
    console.log(e.id);
    const upditem = await updateitem(e);
    console.log(upditem);
    this.state.item.splice(this.state.itemid, 1, upditem);

    this.setState({
      updatemodal: !this.state.updatemodal,
      item: this.state.item,
      showCarosal: false,
    });
    this.updateCarosal();
  };
  updateCarosal = () => {
    setTimeout(() => {
      this.setState({ showCarosal: true });
    });
  };
  render() {
    const { showCarosal } = this.state;
    let DisplayData = this.state.item.map((item, index) => {
      return (
        <>
          <div className="card" key={index} style={{ marginRight: '10px' }}>
            <img
              className="card w-100"
              src={item.img}
              style={{ height: '200px' }}
            />
            <div className="card-body">
              <h4 className="card-title">{item.name}</h4>
              <h5 className="card-text">Rs:- {item.price}</h5>
            </div>
            <div>
              <input
                type={'text'}
                style={{
                  width: '350px',
                  marginLeft: '5px',
                  textOverflow: 'ellipsis',
                }}
                disabled
                value={item.description}
              />
            </div>
            <br></br>
            <div>
              <button
                className="btn btn-danger"
                onClick={(e) => this.delete(item, index)}
                style={{
                  float: 'right',
                  marginRight: '10px',
                  marginBottom: '5px',
                }}
              >
                DELETE
              </button>
              <button
                className="btn btn-info"
                onClick={() => this.Update(item, index)}
                style={{
                  float: 'right',
                  marginRight: '10px',
                  marginBottom: '5px',
                }}
              >
                UPDATE
              </button>
            </div>
          </div>
        </>
      );
    });
    return (
      <>
        {this.state.updatemodal && (
          <Modal
            size="lg"
            isOpen={this.state.updatemodal}
            toggle={() =>
              this.setState({ updatemodal: !this.state.updatemodal })
            }
          >
            <ModalHeader>
              <div
                style={{
                  justifyContent: 'center',
                  width: '600px',
                  marginLeft: '300px',
                }}
              >
                {' '}
                <b>UPDATE RECIPIES</b>
              </div>

              <button
                className="btn btn-danger"
                style={{ marginBottom: '5px' }}
                onClick={() =>
                  this.setState({ updatemodal: !this.state.updatemodal })
                }
              >
                X
              </button>
            </ModalHeader>
            <Addrecipies
              updateditem={this.state.updateditem}
              upitem={(e) => this.upitem(e)}
            />
          </Modal>
        )}
        <div className="container ">
          <div className="row mb-5">
            <Addmodel onAddRecipe={(e) => this.onAddRecipe(e)} />
          </div>
          {showCarosal && <OwlCarousel>{DisplayData}</OwlCarousel>}
        </div>
      </>
    );
  }
}
export default Modals;

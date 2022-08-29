import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Addrecipies from './registerform.js';
import { ModalHeader } from 'react-bootstrap';
class Addmodel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });
  onAddRecipe(e) {
    this.props.onAddRecipe(e);
    this.closeModal(e);
  }
  render() {
    return (
      <>
        <div>
          <p
            className="text-center bg-success float-left"
            style={{ color: 'azure', fontSize: '30px' }}
          >
            Food Recipies
          </p>
          <Button
            color="primary"
            style={{ float: 'right' }}
            onClick={this.openModal}
          >
            Add Recipes
          </Button>
          <Modal size="lg" show={this.state.isOpen} onHide={this.closeModal}>
            <ModalHeader>
              <div
                style={{
                  justifyContent: 'center',
                  width: '600px',
                  marginLeft: '300px',
                }}
              >
                {' '}
                <b>ADD RECIPIES</b>
              </div>

              <button
                className="btn btn-danger"
                style={{ marginBottom: '5px' }}
                onClick={this.closeModal}
              >
                X
              </button>
            </ModalHeader>

            <Addrecipies onAddRecipe={(e) => this.onAddRecipe(e)} />
          </Modal>
        </div>
      </>
    );
  }
}
export default Addmodel;

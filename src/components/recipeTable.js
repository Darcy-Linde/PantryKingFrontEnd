import React, { Component } from "react";

class RecipeTable extends Component {
  state = {
    title: "",
    image: "",
    cooking_minutes: 0,
    modalOpen: false,
    user_id: localStorage.user_id
  };

  modalClose = () => {
    this.setState({ modalOpen: false });
  };

  handleSubmit = () => {
    console.log("submitting...");
  };

  render() {
    return (
      <Fragment>
        <Modal
          closeIcon
          size="tiny"
          open={this.state.modalOpen}
          onClose={this.modalClose}
        >
          <Modal.Header>{this.state.title}</Modal.Header>
          <Modal.Content image>
            <Image wrapped size="medium" src={this.state.image} />
          </Modal.Content>
        </Modal>
      </Fragment>
    );
  }
}

let mapStateToProps = state => {
  return {
    recipeFormValue: state.recipe.formValue
  };
};

export default connect(mapStateToProps)(RecipeTable);

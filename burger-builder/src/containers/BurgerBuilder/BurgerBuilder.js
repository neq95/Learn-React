import React from "react";
import {connect} from "react-redux";

import BurgerPreview from "../../components/BurgerPreview/BurgerPreview";
import BurgerControls from "../../components/BurgerPreview/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary"
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions";
import ordersAjax from "../../utils/ajax-requests/orders-ajax";
import withError from "../../hoc/withError";

class BurgerBuilder extends React.Component {
  state = {
    showModal: false,
    loading: false
  }

  componentDidMount() {
    this.props.fetchIngredients();
  }

  changeModalHandler = () => {
    this.setState(state => ({showModal: !state.showModal}));
  }

  toTheCardHandler = () => {
    this.props.history.push("/checkout");
  }

  render() {
    let {ingredients, totalPrice, error} = this.props;
    let {loading, showModal} = this.state;

    if(error) {
      return <p>Can't get data from server. Reload the page later</p>
    }

    if(Object.keys(ingredients).length === 0) {
      return <Spinner />
    }

    let orderSummary = <Spinner />;
    if(!loading) {
     orderSummary = <OrderSummary 
                      ingredients={ingredients}
                      cancel={this.changeModalHandler}
                      price={totalPrice}
                      submit={this.toTheCardHandler} 
                    />
    }

    return (
      <React.Fragment>
        <Modal 
          showModal={showModal}
          clicked={this.changeModalHandler}>
          {orderSummary}
        </Modal>
        <BurgerPreview ingredients={ingredients} />
        <BurgerControls 
          addIngredient={this.props.addIngredientHandler}
          removeIngredient={this.props.removeIngredientHandler}
          ingredients={ingredients}
          disabled={this.props.disabledButtons}
          price={totalPrice}
          purchasable={this.props.purchasable}
          addModal={this.changeModalHandler}/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    disabledButtons: state.disabledButtons,
    purchasable: state.purchaseState,
    error: state.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredientHandler: (ingredientType) => dispatch(actions.addIngredient(ingredientType)),
    removeIngredientHandler: (ingredientType) => dispatch(actions.removeIngredient(ingredientType)),
    fetchIngredients: () => dispatch(actions.fetchIngredients())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withError(BurgerBuilder, ordersAjax));
import React from "react";
import {connect} from "react-redux";

import BurgerPreview from "../../components/BurgerPreview/BurgerPreview";
import BurgerControls from "../../components/BurgerPreview/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/BurgerPreview/OrderSummary/OrderSummary"
import Spinner from "../../components/UI/Spinner/Spinner";
import ordersAjax from "../../utils/ajax-requests/orders-ajax";
import withError from "../../hoc/withError";
import * as actions from "../../store/actions/actions";

class BurgerBuilder extends React.Component {
  state = {
    showModal: false,
    loading: false,
    error: false
  }

  // componentDidMount() {
  //   ordersAjax.getData("/ingredients.json")
  //     .then(data => {
  //       this.setState({
  //         ingredients: data
  //       })
  //     }).catch(() => {
  //       this.setState({error: true})
  //     });
  // }

  checkPurchaseState = () => {
    let result = Object.values(this.props.ingredients).reduce((sum, value) => sum + value);
    return result > 0;
  }

  changeModalHandler = () => {
    this.setState(state => ({showModal: !state.showModal}));
  }

  toTheCardHandler = () => {
    this.props.history.push("/checkout");
  }

  render() {
    let {ingredients, totalPrice} = this.props;
    let {loading, showModal, error} = this.state;

    if(error) {
      return <p>Can't get data from server. Reload the page later</p>
    }

    if(Object.keys(ingredients).length === 0) {
      return <Spinner />
    }

    let disabledButtons = {...ingredients};

    for(let element in disabledButtons) {
      disabledButtons[element] = disabledButtons[element] <= 0;
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
          disabled={disabledButtons}
          price={totalPrice}
          purchasable={this.checkPurchaseState()}
          addModal={this.changeModalHandler}/>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredientHandler: (ingredientType) => dispatch({
      type: actions.ADD_INGREDIENT, 
      payload: {ingredientType}
    }),
    removeIngredientHandler: (ingredientType) => dispatch({
      type: actions.REMOVE_INGREDIENT,
      payload: {ingredientType}
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withError(BurgerBuilder, ordersAjax));
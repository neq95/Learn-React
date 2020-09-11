import React from "react";

import BurgerPreview from "../../components/BurgerPreview/BurgerPreview";
import BurgerControls from "../../components/BurgerPreview/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/BurgerPreview/OrderSummary/OrderSummary"
import Spinner from "../../components/UI/Spinner/Spinner";
import ordersAjax from "../../utils/ajax-requests/orders-ajax";
import withError from "../../hoc/withError";

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {},
    totalPrice: 2.1,
    purchaseState: false,
    showModal: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    ordersAjax.getData("/ingredients.json")
      .then(data => {
        this.setState({
          ingredients: data
        })
      }).catch(() => {
        this.setState({error: true})
      });
  }

  checkPurchaseState = ingredients => {
    let result = Object.values(ingredients).reduce((sum, value) => sum + value);
    return result > 0;
  }

  addIngredientHandler = type => {
    let ingredients = { ...this.state.ingredients};
    ingredients[type]++;

    let totalPrice = this.state.totalPrice;
    totalPrice += this.props.ingredientCost[type];

    let purchaseState = this.checkPurchaseState(ingredients);
  
    this.setState({ingredients, 
      totalPrice: Math.round(totalPrice * 100) / 100, 
      purchaseState})
  }

  removeIngredientHandler = type => {
    let ingredients = {...this.state.ingredients};
    if(ingredients[type] === 0) return;

    let totalPrice = this.state.totalPrice;
    ingredients[type]--;
    totalPrice -= this.props.ingredientCost[type];

    let purchaseState = this.checkPurchaseState(ingredients);

    this.setState({ingredients, 
      totalPrice: Math.round(totalPrice * 100) / 100,
      purchaseState});
  }

  changeModalHandler = () => {
    this.setState(state => ({showModal: !state.showModal}));
  }

  toTheCardHandler = () => {
    let queryParams = [];

    for(let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push("price=" + this.state.totalPrice);

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryParams.join("&"),
    });

    // this.setState({loading: true});

    // let body = {
    //   ingredients: this.state.ingredients, 
    //   price: this.state.totalPrice.toFixed(2),
    //   customer: {
    //     name: "Tanuha",
    //     address: {
    //       country: "Russia",
    //       city: "Voronezh",
    //       street: "Lizukova",
    //       house: 8
    //     },
    //     email: "tanuha@test.ru"
    //   },
    //   deliveryMethod: "fastest"
    // }

    // ordersAjax.postData("/orders.json", body)
    //   .then(data => console.log(data))
    //   .finally(() => this.setState({loading: false, showModal: false}));
  }

  render() {
    let {ingredients, loading, totalPrice, showModal, purchaseState, error} = this.state;

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
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          ingredients={ingredients}
          disabled={disabledButtons}
          price={totalPrice}
          purchasable={purchaseState}
          addModal={this.changeModalHandler}/>
      </React.Fragment>
    )
  }
}

export default withError(BurgerBuilder, ordersAjax);
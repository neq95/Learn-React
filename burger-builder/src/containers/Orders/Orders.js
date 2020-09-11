import React from "react";

import Order from "../../components/Order/Order";
import ordersAjax from "../../utils/ajax-requests/orders-ajax";
import Spinner from "../../components/UI/Spinner/Spinner";
import withError from "../../hoc/withError";
import "./Orders.css";

class Orders extends React.Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    ordersAjax.getData("/orders.json")
      .then(data => {
        let orders = [];
        for(let el in data) {
          orders.push({
            ...data[el],
            id: el
          });
        }
        this.setState({orders})
      }).finally(() => this.setState({loading: false}));
  }

  orderDeleteHandler = (id) => {
    let prevOrders = [...this.state.orders];
    let orders = prevOrders.filter(el => el.id !== id);

    ordersAjax.deleteData(`/orders/${id}.json`);

    this.setState({orders});
  }

  render() {
    let {orders, loading} = this.state;
    let renderedOrders = orders.map(el => <Order key={el.id} order={el} onDelete={this.orderDeleteHandler}/>)

    return (
      <div className="orders">
        {loading ? <Spinner /> : renderedOrders}
      </div>
    )
  }
}

export default withError(Orders, ordersAjax);
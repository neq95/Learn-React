import React from "react";

import Button from "../../UI/Button/Button";

import styles from "./OrderSummary.module.css";

const OrderSummary = props => {
  let order = Object.entries(props.ingredients)
      .map(el => <li 
                    key={el[0]} 
                    className={styles["list-item"]}><span>{el[0]}</span> : {el[1]}
                  </li>);
  return (
    <React.Fragment>
      <h2 className={styles.title}>Order Summary</h2>
      <p className={styles.subtitle}>Your delicious burger consists of:</p>
      <div className={styles["main-box"]}>
        <ul className={styles.list}>
          {order}
        </ul>
        <div className={styles.price}>
          <p>Total price:</p>
          <span>{props.price} $</span>
        </div>
      </div>
      <div className={styles["buttons-box"]}>
        <Button 
          clicked={props.cancel} 
          className="button button--cancel"
          label="Continue purchasing"
        />
        <Button 
          clicked={props.submit} 
          className="button button--submit"
          label="Checkout"
        />
      </div>
    </React.Fragment>
  )
}

export default OrderSummary;
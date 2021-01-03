import React from "react";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";
import FlipMove from 'react-flip-move'

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
          className="checkout__add"
        />
        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your shopping basket</h2>
        </div>

        {basket.map((item) => (
          <FlipMove>
          <CheckoutProduct
            id={item.id}
            title={item.title}
            image={item.image}
            rating={item.rating}
            price={item.price}
          />
          </FlipMove>
        ))}
      </div>
      <div className="checkout__right">
        <h2 className="">The subtatal will go here</h2>
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;

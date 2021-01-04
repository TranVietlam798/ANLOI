import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "./axios";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link, useHistory } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { getBasketTotal } from "./reducer";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";
import firebase from 'firebase'

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  // useEffect(() => {
  //   const getClientSecret = async () => {
  //     const res = await axios({
  //       method: "post",
  //       url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
  //     });
  //     setClientSecret(res.data.clientSecret);
  //   };
  //   getClientSecret();
  // }, [basket]);

  // console.log("THE SECRET IS >>>", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();
    db.collection("users")
      .doc(user?.uid)
      .collection("orders")
      .add({
        basket: basket,
        amount: getBasketTotal(basket) * 100,
        timestamps: firebase.firestore.FieldValue.serverTimestamp(),
      });

    // setProcessing(true);
    // const payLoad = await stripe
    //   .confirmCardPayment(clientSecret, {
    //     payment_method: {
    //       card: elements.getElement(CardElement),
    //     },
    //   })
    //   .then(({ paymentIntent }) => {
    //     db.collection("users")
    //       .doc(user?.uid)
    //       .collection("orders")
    //       .doc(paymentIntent.id)
    //       .set({
    //         basket: basket,
    //         amount: paymentIntent.amount,
    //         created: paymentIntent.created,
    //       });
    //     setSucceeded(true);
    //     setError(null);
    //     setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
    //   });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>checkout{<Link to="/checkout">({basket?.length} item)</Link>}</h1>
        {/* payment section --deliver address  */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery address</h3>
          </div>
          <div className="payment__address">
            <p className="">{user?.email} </p>
            <p className="">789 react land</p>
            <p className="">Tan phu, HCM</p>
          </div>
        </div>

        {/* payment section --review item  */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review item an delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* payment section --payment menthor  */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Menthor</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceCOntainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Oder Tatal: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Proccessing</p> : "Buy Now"}</span>
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

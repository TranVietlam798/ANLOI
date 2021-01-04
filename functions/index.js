// const functions = require("firebase-functions");
// const express = require("express");

// const cors = require("cors");
// const { default: Stripe } = require("stripe");

// const stripe = require("stripe")(
//   "sk_test_51I5XiWFR264hoqGuZYy6mV4RRkBBRvmOVoXADtuCVk3bBvTbFF04XeJdv4g3h2QaLo0mrzQfstuMXUEL36A1nXjA00NDjHjECV"
// );

// //app config
// const app = express();

// //MiddleWares
// app.use(cors({ origin: true }));
// app.use(express.json());

// //api Routes
// app.get("/", (req, res) => {
//   res.status(200).send("Hello ");
// });

// app.post("/payments/create", async (req, res) => {
//   const total = req.query.total;

//   console.log("Payment req recieved Boom!!", total);

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: total,
//     currency: "usd",
//   });

//   res.status(201).send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

// exports.api = functions.https.onRequest(app);

// // http://localhost:5001/anloi-challenge/us-central1/api


const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51I5XiWFR264hoqGuZYy6mV4RRkBBRvmOVoXADtuCVk3bBvTbFF04XeJdv4g3h2QaLo0mrzQfstuMXUEL36A1nXjA00NDjHjECV"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);
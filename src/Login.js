import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import "./Login.css";
function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  const redister = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <Link to="/">
        <img src="AnLoilogo.png" alt="" className="login__logo" />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <form action="">
          <h5>E-mail</h5>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />

          <h5>Password</h5>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />

          <button
            type="submit"
            onClick={SignIn}
            className="login__signInButton"
          >
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the AnLoi Conditions of Use & Sale. Please
          see our Privacy Notice, our Cookies Notice and our Interest-Based Ads
          Notice.
        </p>

        <button onClick={redister} className="login__redisterButton">
          Creacte your AnLoi Accout
        </button>
      </div>
    </div>
  );
}

export default Login;

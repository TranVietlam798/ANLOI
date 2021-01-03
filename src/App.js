import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { useEffect } from "react";

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type:"SET_USER",
          user:authUser
        })
      } else {
        dispatch({
          type:"SET_USER",
          user:null
        })
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />
        {/* header  */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          {/* home  */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

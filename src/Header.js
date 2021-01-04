import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handelAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src="AnLoilogo.png" alt="header" />
      </Link>

      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link to={!user && "login"}>
          <div onClick={handelAuthenticaton} className="header__option">
            <span className="header__optinLoneOne">
              {user ? user.email : "Hello Guest"}{" "}
            </span>
            <span className="header__optinLoneTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to="/orders">
          <div className="header__option">
            <span className="header__optinLoneOne">Return</span>
            <span className="header__optinLoneTwo">Order</span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optinLoneOne">Your</span>
          <span className="header__optinLoneTwo">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optinLoneTwo headerBasketCount">
              {" "}
              {basket?.length}{" "}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;

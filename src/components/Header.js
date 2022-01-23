import React, { useState } from "react";
import logo from "../images/logo.png";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import SignIn from "./Formik/SignIn";

const Header = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <header className="header">
      <a href="/">
        <img className="header__logo" src={logo}></img>
      </a>
      <form action="#" class="search">
        <input type="text" class="search__input" placeholder="Search Items" />
        <button class="search__button">
          <svg
            class="search__icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>magnifying-glass</title>
            <path d="M17.545 15.467l-3.779-3.779c0.57-0.935 0.898-2.035 0.898-3.21 0-3.417-2.961-6.377-6.378-6.377s-6.186 2.769-6.186 6.186c0 3.416 2.961 6.377 6.377 6.377 1.137 0 2.2-0.309 3.115-0.844l3.799 3.801c0.372 0.371 0.975 0.371 1.346 0l0.943-0.943c0.371-0.371 0.236-0.84-0.135-1.211zM4.004 8.287c0-2.366 1.917-4.283 4.282-4.283s4.474 2.107 4.474 4.474c0 2.365-1.918 4.283-4.283 4.283s-4.473-2.109-4.473-4.474z"></path>
          </svg>
        </button>
      </form>
      <a
        href="#signinpopup"
        className="header__signin btn btn--light u-margin-right-small"
      >
        Sign In
      </a>
      <div id="signinpopup" className="popup">
        <form className="popup__signin">
          <a
            href="#"
            className="btn btn--light u-margin-left-auto u-margin-top-small u-margin-right-small"
          >
            close
          </a>
          <SignIn />
        </form>
      </div>
    </header>
  );
};

export default Header;
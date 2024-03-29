import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import SignIn from "./Formik/SignIn";
import SignUp from "./Formik/SignUp";
import useUser from "../hooks/useUser";

const Header = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [signUpVisible, setSignUpVisible] = useState(false);
  const navigate = useNavigate();
  const user = useUser();
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <header className="header">
      <a href="/">
        <img className="header__logo" src={logo}></img>
      </a>
      <form action="/browse" class="search">
        <input type="hidden" name="searchWord" value={searchWord} />
        <input
          onChange={(event) => setSearchWord(event.target.value)}
          type="text"
          class="search__input"
          placeholder="Search Items"
        />
        <button
          href={`/browse?searchWord=${searchWord}`}
          type="submit"
          class="search__button"
        >
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
      <div className="header__buttons-box">
        <a
          href="/sell"
          className="header__sell btn btn--light u-margin-right-small"
        >
          Sell Items
        </a>
        {!user && (
          <a
            href="#signinpopup"
            className="header__signin btn btn--light u-margin-right-small"
          >
            Sign In
          </a>
        )}
        {user && (
          <a
            href="/"
            className="header__signin btn btn--light u-margin-right-small"
            onClick={() => {
              localStorage.removeItem("loggedInMarketPlaceUser");
            }}
          >
            Sign Out
          </a>
        )}
      </div>
      <div id="signinpopup" className="popup">
        <form className="popup__signin">
          <a
            href="#"
            className="btn btn--light u-margin-left-auto u-margin-top-small u-margin-right-small"
          >
            close
          </a>
          {!signUpVisible && <SignIn setSignUpVisible={setSignUpVisible} />}
          {signUpVisible && <SignUp setSignUpVisible={setSignUpVisible} />}
        </form>
      </div>
    </header>
  );
};

export default Header;

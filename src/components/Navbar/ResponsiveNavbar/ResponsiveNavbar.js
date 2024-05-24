import { useState, React, useEffect } from "react";
import responsiveNabar from "../../../images/responsive menu icon.png";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import { UserExistCheck } from "../../../services/FirebaseService";
import { avatarFetch } from "../../../services/UserService";

import "./ResponsiveNavbar.css";
import "../Navbar.css";
const ResponsiveNavbar = (props) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const showCategories = () => {
    setOpenMenu(!openMenu);
  };


  return (
    <div className="responsive-navbar-container">
      {props.userInfo ? (
        <div className="user-info-section">
          <img
            className="user-img"
            src={avatarFetch(props.userInfo.avatar)}
          ></img>
          <p className="user-name"> Hello {props?.userInfo.firstName}</p>
        </div>
      ) : null}
      <div className="responsive-menu-container">
        <img
          src={responsiveNabar}
          onClick={() => showCategories()}
          className="menu-img"
        ></img>
        {openMenu ? (
          <div
            className={`responsive-navbar-categories ${openMenu ? "show" : ""}`}
          >
            <ul className="categories-list">
              <li>
                <Link
                  className="category"
                  to="/Movies"
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  className="category"
                  to="/Series"
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  Series
                </Link>
              </li>
              <li>
                <Link
                  className="category"
                  to="/About"
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  About
                </Link>
              </li>
              {!props.user ? (
                <>
                  <li>
                    <Link
                      className="category"
                      to="/Login"
                      onClick={() => setOpenMenu(!openMenu)}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="category"
                      to="/SignUp"
                      onClick={() => setOpenMenu(!openMenu)}
                    >
                      SignUp
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                  <Link
                    className="category"
                    to="/Favourites"
                    onClick={() => setOpenMenu(!openMenu)}
                  >
                    Favourites
                  </Link>
                </li>
                <li>
                    <Link to="/Movies" onClick={props.handleSignOut} className="
                    category" >
                    Logout
                    </Link>
                </li>
                </>
              
              )}
            </ul>
          </div>
        ) : null}
      </div>
      {openMenu && (
        <div
          className="transparent-div"
          onClick={() => setOpenMenu(!openMenu)}
        ></div>
      )}
    </div>
  );
};

export { ResponsiveNavbar };

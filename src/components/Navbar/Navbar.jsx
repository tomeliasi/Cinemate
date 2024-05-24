import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import NavbarMainLogo from "../../images/cinemate-logo.png";
import "./Navbar.css";
import { Badge } from "@mui/material";
import { SearchBox } from "../SearchBox";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import {
  db,
  getUserDetails,
  removeUserFromLocalStorage,
  removeFavouritesFromLocalStorage,
} from "../../services/FirebaseService";
import { signOut, getAuth } from "firebase/auth";
import { avatarFetch } from "../../services/UserService";
import { UserDialog } from "../UserDialog/UserDialog";
import { ResponsiveNavbar } from "./ResponsiveNavbar";

const Navbar = ({ user }) => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate("");
  const [searchInput, setSearchInput] = useState("");
  const [userShowModal, setUserShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1100);

  const openModal = () => {
    setUserShowModal(true);
  };

  const closeModal = () => {
    setUserShowModal(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user && user.uid) {
          const userData = await getUserDetails(user.uid);
          // Set the user info state with firstName and lastName
          setUserInfo({
            firstName: userData.firstName,
            lastName: userData.lastName,
            avatar: userData.avatar,
            email: userData.email,
            registerDate: userData.registerDate,
          });
        } else {
          console.log("User document does not exist");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, [user]);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        removeUserFromLocalStorage(user.uid);
        removeFavouritesFromLocalStorage();
        navigate("/Login");
        setUserInfo(null);
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
      });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 930);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <nav className="nav-container">
      <img className="nav-logo" src={NavbarMainLogo} alt="logo" />
      {isMobile ? (
        <ResponsiveNavbar user={user} userInfo={userInfo} handleSignOut={handleSignOut} />
      ) : (
        <>
          <div className="nav-categories">
            <Link to="/Movies" className="category">
              Movies
            </Link>
            <Link to="/Series" className="category">
              Series
            </Link>
            <Link to="/About" className="category">
              About
            </Link>
            {user ? <Link to="/Favourites" className="category">Favourites</Link> : null}
          </div>
          <div className="search-section">
            <SearchBox searchValue={searchInput} setSearchValue={setSearchInput} />
          </div>
          <div className="login-categories">
            {userInfo ? (
              <div className="user-info" onClick={openModal}>
                <img
                  className="avatar-user"
                  src={avatarFetch(userInfo.avatar)}
                ></img>
                <p className="username-display">
                  Hello {userInfo.firstName} {userInfo.lastName}
                </p>
                <button
                  className="user-button logout-button"
                  onClick={handleSignOut}
                >
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <Link to="/Login" className="user-button">
                  Login
                </Link>
                <Link to="/Signup" className="user-button">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </>
      )}
      {userShowModal && userInfo && (
        <UserDialog
          showModal={userShowModal}
          handleClose={closeModal}
          user={userInfo}
        />
      )}
    </nav>
  );
};

export { Navbar };

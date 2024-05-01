import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Movies from "./Pages/Movies";
import About from "./Pages/About";
import Series from "./Pages/Series";
import { SearchPage } from "./Pages/SearchPage";
import FavouritesPage from "./Pages/FavouritesPage";
import { FavouritesProvider } from "./services/FavouritesContext";
import { Navbar } from "./components/Navbar";
import { LoginPage } from "./Login/LoginPage";
import { SignUpPage } from "./Login/SignUpPage";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  app,
  db,
  getUserDetails,
  addUserToLocalStorage,
  getCurrentUser,
} from "./services/FirebaseService";
import { getDoc, doc } from "firebase/firestore";

const fetchUser = async (uid) => {
  await addUserToLocalStorage(uid);
  // const user = getCurrentUser();
  // if(user)
  // console.log(user.Favourites);
};
const App = () => {
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user && user?.uid) {
      fetchUser(user?.uid);
    }
  }, [user]);

  return (
    <FavouritesProvider>
      <Router>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Navigate to="/Movies" />} />
          <Route path="/Movies" element={<Movies />} />
          <Route path="/About" element={<About />} />
          <Route path="/Series" element={<Series />} />
          <Route path="/Search/:query" element={<SearchPage />} />
          <Route path="/Favourites" element={<FavouritesPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    </FavouritesProvider>
  );
};

export default App;

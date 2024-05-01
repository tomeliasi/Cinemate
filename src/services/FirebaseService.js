// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  collection,
  FieldValue,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getElementById } from "./MultiService";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV48R6SJaq1esPggFCepfwO_q5wCnInZk",
  authDomain: "cinemate-data.firebaseapp.com",
  projectId: "cinemate-data",
  storageBucket: "cinemate-data.appspot.com",
  messagingSenderId: "660340794381",
  appId: "1:660340794381:web:0c1e42be1a5abad04be144",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const getUserDetails = async (uid) => {
  if (!db) {
    console.error("Firestore database is not initialized.");
    return null;
  }

  if (!uid) {
    console.error("UID is not provided.");
    return null;
  }

  const userDocRef = doc(db, "users", uid);
  try {
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      return userData;
    } else {
      console.error("User document does not exist for UID:", uid);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

const addUserToLocalStorage = async (uid) => {
  const user = await getUserDetails(uid);
  localStorage.setItem("user", JSON.stringify(user));
  console.log("user add to Local Storage succsessfuly");
  addFavouritesToLocalStorage(user);
};
const addFavouritesToLocalStorage = async (user) => {
  const favouritesMovies = Array.isArray(user.FavouritesMovies)
    ? user.FavouritesMovies
    : [];
  const favouritesTVShows = Array.isArray(user.FavouritesTVShows)
    ? user.FavouritesTVShows
    : [];
  localStorage.setItem("FavouritesMovies", JSON.stringify(favouritesMovies));
  console.log(
    "FavouritesMovies from Local Storage : ",
    localStorage.getItem("FavouritesMovies")
  );

  localStorage.setItem("FavouritesTVShows", JSON.stringify(favouritesTVShows));
  console.log(
    "FavouritesTVShows from Local Storage : ",
    localStorage.getItem("FavouritesTVShows")
  );
};

const removeUserFromLocalStorage = async (uid) => {
  localStorage.removeItem("user");
  console.log("user Remove from Local Storage succsessfuly");
};

const removeFavouritesFromLocalStorage = () => {
  localStorage.removeItem("FavouritesMovies");
};

const getCurrentUser = () => JSON.parse(localStorage.getItem("user"));

const UserExistCheck = () => {
  const [user] = useAuthState(auth);

  return user ? true : false;
};
const addElementToFavourites = async (elementID, ElementType) => {
  const user = auth.currentUser;
  console.log("elementType = ", ElementType);

  if (user && user.uid) {
    try {
      const userDocRef = doc(db, "users", user.uid);

      let FavouritesType = "";
      let updateObj = {};
      if (ElementType === "movie") {
        updateObj = { FavouritesMovies: arrayUnion(elementID) };
        console.log("Movie added to favorites successfully!");
        FavouritesType = "FavouritesMovies";
      } else {
        updateObj = { FavouritesTVShows: arrayUnion(elementID) };
        console.log("TvShow added to favorites successfully!");
        FavouritesType = "FavouritesTVShows";
      }
      await updateDoc(userDocRef, updateObj);
      let favouritesFromLocalStorage = localStorage.getItem(FavouritesType);
      favouritesFromLocalStorage = JSON.parse(favouritesFromLocalStorage);
      favouritesFromLocalStorage.push(elementID);
    } catch (error) {
      console.error("Error adding element to favorites: ", error);
    }
  } else {
    console.error("User not authenticated.");
  }
};

const deleteElementFromFavourites = async (elementID,ElementType) => {
  const user = auth.currentUser;
if (user && user.uid) {
    try {
      const userDocRef = doc(db, "users", user.uid);

      let FavouritesType = "";
      let updateObj = {};
      if (ElementType === "movie") {
        updateObj = { FavouritesMovies: arrayRemove(elementID) };
        console.log("Movie removed from favorites successfully!");
        FavouritesType = "FavouritesMovies";
      } else {
        updateObj = { FavouritesTVShows: arrayRemove(elementID) };
        console.log("TvShow removed from favorites successfully!");
        FavouritesType = "FavouritesTVShows";
      }
      await updateDoc(userDocRef, updateObj);
      let favouritesFromLocalStorage = localStorage.getItem(FavouritesType);
      favouritesFromLocalStorage = JSON.parse(favouritesFromLocalStorage);
      favouritesFromLocalStorage.remove(elementID);
    } catch (error) {
      console.error("Error removing element to favorites: ", error);
    }
  } else {
    console.error("User not authenticated.");
  }
};

export {
  app,
  auth,
  db,
  getUserDetails,
  addElementToFavourites,
  deleteElementFromFavourites,
  getCurrentUser,
  addUserToLocalStorage,
  UserExistCheck,
  removeUserFromLocalStorage,
  removeFavouritesFromLocalStorage,
  addFavouritesToLocalStorage,
};

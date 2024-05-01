
import React, { useState,useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "./Signup.css";
import { auth, app, db } from "../services/FirebaseService";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, addDoc, collection, getDoc } from "firebase/firestore";
import { avatar1, avatar2, avatar3, avatar4, avatar5 } from "../images/avatars";
const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInMassage, setSignInMassage] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState();
  const [errors,setErrors] = useState([]);
  const navigate = useNavigate("");

 const emptyInputErrors = {
  firstNameError: "Please enter First-Name",
  lastNameError: "Please enter Last-Name",
  emailError: "Please Enter Email",
  passwordError: "Enter a password",
  avatarError: "Choose an Avatar",
};

const errorsCheck = (firstName, lastName, password, email, avatar) => {
  const errors = [];

  if (!firstName) {
    errors.push(emptyInputErrors.firstNameError);
  }

  if (!lastName) {
    errors.push(emptyInputErrors.lastNameError);
  }

  if (!email) {
    errors.push(emptyInputErrors.emailError);
  }

  if (!password) {
    errors.push(emptyInputErrors.passwordError);
  }

  if (!avatar) {
    errors.push(emptyInputErrors.avatarError);
  }

  return errors;
};
const signUp = async (e) => {
  e.preventDefault();

   console.log("errors : ", errors);

  if (errors.length === 0) {
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Add user details to Firestore
      const userDocRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userDocRef, {
        uid: userCredential.user.uid,
        firstName: firstName,
        lastName: lastName,
        email: email,
        registerDate: userCredential.user.metadata.creationTime,
        avatar: avatar,
         Favourites: [],
         FavouritesMovies:[],
         FavouritesTVShows:[],
      });

      
      //  const userCollectionRef = collection(userDocRef, "Favourites"); // "newCollection" is the name of your new collection
      // await addDoc(userCollectionRef, {
   
      // });
      // See the unique id (UID)
      console.log("User and details added successfully to Firestore!", userCredential.user.uid);

      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User details:", userData);
      } else {
        console.error("User document not found in Firestore.");
      }
      setSignInMassage(true);
      navigate("/Movies");
    } catch (error) {
      console.error("Error signing up:", error.message);
      setSignInMassage(false);
    }
  } else {
    // Handle errors, if any
  }
};

  return (
    <div className="background-login-page main-page">
      <form className="login-section" onSubmit={signUp}>
        <div className="login-header">
          <h3 className="login-title">Sign up</h3>
          <p>
            Already a user?
            <span>
              <a className="login-option" href="/Login">
                {" "}
                Log in
              </a>
            </span>{" "}
          </p>
        </div>
        <div className="inputs-section">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="login-inputbox"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login-inputbox"
          />

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="login-inputbox"
          />

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="login-inputbox"
          />

          <div className="signup-avatar-choose ">
            <p className="avatar-choosing ">Choose an Avatar</p>
            <div className="avatars-section">
              <img className="avatar-img" onClick={() => setAvatar(1)} src={avatar1}></img>
              <img className="avatar-img" onClick={() => setAvatar(2)} src={avatar2}></img>
              <img className="avatar-img" onClick={() => setAvatar(3)} src={avatar3}></img>
              <img className="avatar-img" onClick={() => setAvatar(4)} src={avatar4}></img>
              <img className="avatar-img" onClick={() => setAvatar(5)} src={avatar5}></img>
            </div>
          </div>
          <div className="signup-status">
  {errors.length > 0 && (
    <div className="error-messages">
      {errors.map((error, index) => (
        <p key={index} className="error-message">
          {error}
        </p>
      ))}
    </div>
  )}
  {signInMassage && <p className="signup-massage"> Signup successfully! </p>}
</div>

          
        </div>
        <div className="login-button-section">
          <button className="login-button" type="submit" onClick={ () => setErrors(errorsCheck(firstName, lastName, password, email, avatar))}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export { SignUpPage };

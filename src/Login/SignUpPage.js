import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Signup.css";
import { auth, db } from "../services/FirebaseService";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { avatar1, avatar2, avatar3, avatar4, avatar5 } from "../images/avatars";
const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInMassage, setSignInMassage] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState();
  const [errors, setErrors] = useState({
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    passwordError: false,
    avatarError: false,
  });
  const navigate = useNavigate("");
  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];
  const emptyInputCheck = () => {
    let newErrors = { ...errors };
    let errorsNumber = 0;

    if (!avatar) {
      newErrors.avatarError = true;
      errorsNumber++;
    }
    if (firstName === "") {
      newErrors.firstNameError = true;
      errorsNumber++;
    }

    if (lastName === "") {
      newErrors.lastNameError = true;
      errorsNumber++;
    }

    if (email === "") {
      newErrors.emailError = true;
      errorsNumber++;
    }

    if (password === "") {
      newErrors.passwordError = true;
      errorsNumber++;
    }
    setErrors(newErrors);

    return errorsNumber;
  };

  const clearErrors = () => {
    setErrors(false);
  };

  const signUp = async (e) => {
    e.preventDefault();
    if (emptyInputCheck() == 0) {
      try {
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

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
          FavouritesMovies: [],
          FavouritesTVShows: [],
        });
        // See the unique id (UID)
        console.log(
          "User and details added successfully to Firestore!",
          userCredential.user.uid
        );

        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          // console.log("User details:", userData);
        } else {
          console.error("User document not found in Firestore.");
        }
        setSignInMassage(true);
        navigate("/Movies");
      } catch (error) {
        console.error("Error signing up:", error.message);
        setSignInMassage(false);
      }
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
              <Link to={"/Login"} className="login-option">
                Log In
              </Link>
            </span>
          </p>
        </div>
        <div className="inputs-section">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={`login-inputbox ${
              errors.emailError ? "empty-input" : ""
            }`}
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`login-inputbox ${
              errors.passwordError ? "empty-input" : ""
            }`}
          />

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className={`login-inputbox ${
              errors.firstNameError ? "empty-input" : ""
            }`}
          />

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className={`login-inputbox ${
              errors.lastNameError ? "empty-input" : ""
            }`}
          />

          <div className="signup-avatar-choose ">
            <p className="avatar-choosing ">Choose an Avatar</p>
            <div className="avatars-section">
              {avatars.map((currAvatar, index) => (
                <img
                  className={`avatar-img ${
                    index + 1 === avatar && "selected-avatar"
                  }`}
                  alt={currAvatar}
                  onClick={() => setAvatar(index + 1)}
                  src={currAvatar}
                ></img>
              ))}
            </div>
          </div>
          <p className="error-message">
            {errors.avatarError ? "Please choose an avatar" : ""}
          </p>
          <div className="signup-status">
            {signInMassage && (
              <p className="signup-massage"> Signup successfully! </p>
            )}
          </div>
        </div>
        <div className="login-button-section">
          <button
            className="login-button"
            type="submit"
            onClick={() => clearErrors()}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export { SignUpPage };

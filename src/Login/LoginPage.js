import { React, useState } from "react";
import PropTypes from "prop-types";
import { auth, app,db,getUserDetails,addUserToLocalStorage } from "../services/FirebaseService";
import "./LoginPage.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate,Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");
  const [loginError, setLoginError] = useState(false);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const userdetails = getUserDetails(userCredential.user.uid);
        addUserToLocalStorage(userCredential.user.uid); 
        navigate("/Movies");
        setLoginError(true);
      })
      .catch((error) => {
        console.log(error);
        setLoginError(true);
      });
  };

  return (
    <div className="background-login-page main-page">
      <form className="login-section" onSubmit={signIn}>
        <div className="login-header">
          <h3>Login</h3>
        <p>
          New user?
          <span>
           <Link to={"/SignUp"} className="login-option"> SignUp</Link>
          </span>
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
          {loginError && (
            <div className="login-error">Email or Password is invalid</div>
          )}
        </div>
        <div className="login-button-section">
          <button type="submit" className="login-button">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export { LoginPage };

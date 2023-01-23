import React, { useState, useEffect, useRef } from "react";
import { MdChevronRight } from "react-icons/md";
import { BsShieldLock } from "react-icons/bs";
import { FaShapes } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignIn = (e) => {
  const NameInputRef = useRef();
  const EmailInputRef = useRef();
  const PasswordInputRef = useRef();
  const SignInBtnRef = useRef();
  const [isNewUser, SetIsNewUser] = useState(false);

  const clickSignInBtn = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      SignInBtnRef.current.click();
    }
  };

  useEffect(() => {
    NameInputRef.current?.addEventListener("keypress", (e) =>
      clickSignInBtn(e)
    );
    EmailInputRef.current.addEventListener("keypress", (e) =>
      clickSignInBtn(e)
    );
    PasswordInputRef.current.addEventListener("keypress", (e) =>
      clickSignInBtn(e)
    );

    // EmailInputRef.current.focus();
  });

  return (
    <div className="signin-page">
      <div className="circleBg"></div>
      <div className="circleBg"></div>
      <div className="circleBg"></div>

      <div className="signin-container">
        <div className="signin-content">
          <FaShapes className="shapes-icon" />
          <div className="brand-logo">
            <div className="logo-text">
              H<span className="small">un</span>G
              <span className="small">reed</span>
            </div>
          </div>
          {isNewUser ? (
            <div className="signin-greet">
              <h1>New User?</h1>
              <p>Sign up and discover a whole new world of delicacies.</p>
            </div>
          ) : (
            <div className="signin-greet">
              <h1>Welcome Back!</h1>
              <p>Sign in for better access</p>
            </div>
          )}
          <footer>
            <hr />
            <p> Hungreed coorporation pvt. ltd.</p>
          </footer>
        </div>

        <div className="signin-main">
          <BsShieldLock className="shield-icon" />
          <div className="brand-logo">
            <div className="logo-text">
              H<span className="small">un</span>G
              <span className="small">reed</span>
            </div>
          </div>
          {isNewUser ? <h1>Create Account</h1> : <h1>Welcome Back</h1>}
          <div className="signin-options">
            {isNewUser ? (
              <h2 className="signin-heading">Sign Up</h2>
            ) : (
              <h2 className="signin-heading">Sign In</h2>
            )}
            <div className="signin-direct">
              {isNewUser && (
                <input type="text" placeholder="Name" ref={NameInputRef} />
              )}
              <input type="email" placeholder="Email" ref={EmailInputRef} />
              <input
                type="password"
                placeholder="Password"
                ref={PasswordInputRef}
              />
              <button type="submit" className="signin-btn" ref={SignInBtnRef}>
                <p>{isNewUser ? "create" : "log in"}</p>{" "}
                <MdChevronRight className="right-icon" />
              </button>
            </div>
            <div className="signin-partners">
              <div className="signin-partners-head">
                <hr />
                <p>or sign up/in using</p>
                <hr />
              </div>
              <button type="submit" className="google-signin-btn">
                <FcGoogle className="google-icon" /> google
              </button>
            </div>
            {isNewUser ? (
              <p className="signup-link">
                Already have an account?{" "}
                <span onClick={() => SetIsNewUser(false)}>Register</span>
              </p>
            ) : (
              <p className="signup-link">
                New User?{" "}
                <span onClick={() => SetIsNewUser(true)}>sign up</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

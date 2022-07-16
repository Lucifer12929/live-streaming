import React, { useState } from "react";
import { Image, Form, Button } from "antd";
import { Link, NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import { FiUser, AiFillLock } from "react-icons/all";
import { Helmet } from "react-helmet";


import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

import "./auth.css";
import { dispatchLogin } from "../../redux/actions/authAction";
import { useDispatch } from "react-redux";

import { isEmpty, isEmail } from "../../utils/validation/Validation";
const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};


const Login = () => {
  const [formDataUser, setFormDataUser] = useState(initialState);
  const dispatch = useDispatch();
  const history = useHistory();
  const { email, password, err, success } = formDataUser;
  const handleChange = (e) => {
    //place of do that onChange={(e) => setEmail(e.target.value) for each field (input) we do that
    setFormDataUser({
      ...formDataUser,
      [e.target.name]: e.target.value,
      err: "",
      success: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(email) | isEmpty(password))
      return setFormDataUser({
        ...formDataUser,
        err: "Please fill in all fields",
        success: "",
      });

    if (!isEmail(email))
      return setFormDataUser({
        ...formDataUser,
        err: "Invalid email",
        success: "",
      });
    try {
      const res = await axios.post("/user/login", { email, password });
      setFormDataUser({ ...formDataUser, err: "", success: res.data.msg }); // true
      dispatch(dispatchLogin());
      localStorage.setItem("firstLogin", true);

      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        setFormDataUser({
          ...formDataUser,
          err: err.response.data.msg,
          success: "",
        });
    }
  };

  const inputs = document.querySelectorAll(".input");

  function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }

  function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
      parent.classList.remove("focus");
    }
  }

  inputs.forEach((inputa) => {
    inputa.addEventListener("focus", addcl);
    inputa.addEventListener("blur", remcl);
  });

  return (
    <>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <div className="container_login">
        
        <div className="containerl">
          
          <div className="login-content">
            <form onSubmit={handleSubmit}>
              <Image className="login-avatar" src="https://i.pinimg.com/236x/e9/57/2a/e9572a70726980ed5445c02e1058760b.jpg" preview={false} />
              <h2 className="title">LOGIN</h2>
              {err && showErrMsg(err)}
              {success && showSuccessMsg(success)}
              <div className="input-div one">
                <div className="i">
                  <FiUser color="#0f6ab9" />
                </div>
                <div className="div">
                  <input
                    name="email"
                    value={email}
                    type="text"
                    className="input"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-div pass">
                <div className="i">
                  <AiFillLock color="#0f6ab9" />
                </div>
                <div className="div">
                  <input
                    name="password"
                    value={password}
                    type="password"
                    className="input"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn">
                Login
              </button>
              <p>
                New Visiter?{" "}
                <Link className="register" to="/register">
                  Register
                  
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
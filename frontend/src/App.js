import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import ActivationEmail from "./components/auth/Activateemail";
import Live from './Live';



import Login from "./components/auth/login";
import Register from "./components/auth/register";

import axios from "axios";
import {
  dispatchLogin,
  dispatchGetUser,
  fetchUser,
} from "./redux/actions/authAction";

import NotFound from "./utils/NotFound/NotFound";


function App() {
  //Get Acces token
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);
  const { isLogged, user, isAdmin } = auth;

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken = async () => {
        // make post request : hey db get me some data and return it to me
        const res = await axios.post("/user/refresh_token", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);
  // when refresh the token exsit but the logged change to false that's we do that

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());
        //Get user infor
        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);
  return (
    <>
      <div className="main">
        <Router>
          <>
          
            <Switch>
              <Route path="/" exact component={Live} />
              
              <Route
                exact
                path="/login"
                component={isLogged ? NotFound : Login}
              />
              <Route
                exact
                path="/register"
                component={isLogged ? NotFound : Register}
              />
              
              <Route
                exact
                path="/user/activate/:activation_token"
                component={ActivationEmail}
              />
              
              
              <Route component={NotFound} />
            </Switch>
          </>
        </Router>
        
      </div>
    </>
  );
}

export default App;
// import logo from './logo.svg';
// import './App.css';
// import Live from './Live'

// function App() {
//   return (
//     <div className="App">
//       <Live />
     
//     </div>
//   );
// }

// export default App;

import React from "react";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  const isLoggedIn = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...rest} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;

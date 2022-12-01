import React, { useEffect } from "react";
import { useDispatch, useSelector,  } from "react-redux";
import { Navigate } from "react-router-dom";

import Loader from "../layouts/Loader";
import { loadUser } from "../../actions/userActions";

const ProtectedRoute = ({ children, isAdmin }) => {
  const { 
    isAuthenticated = false,
    loading = true,
    user,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(loadUser);
    }
  }, [isAuthenticated, loading, dispatch, user]);

  if (loading) return <Loader />;

  if (!loading && isAuthenticated) {
    if (isAdmin === true && user.role !== "admin") {
        // console.log(user.role);
      return <Navigate to="/" />;
    }
    return children;
  } else {
    console.log("Nothing");
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoute;

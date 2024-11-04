import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../api/auth";

function PrivateRoute({ children }) {
    const token = getToken();
    return token ? children : <Navigate to="/" />;
}

export default PrivateRoute;

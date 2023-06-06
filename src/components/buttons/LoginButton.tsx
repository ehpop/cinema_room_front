import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/LogInButton.css";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogIn = () => {
    loginWithRedirect();
  };

  return <button onClick={handleLogIn}>Log In</button>;
};

export default LoginButton;

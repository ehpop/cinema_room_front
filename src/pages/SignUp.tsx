import React from "react";
import LoginButton from "../components/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../components/LogoutButton";
import Profile from "./Profile";
import "./styles/SingUp.css";

const SignUp = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="profilePage">
      {isAuthenticated ? (
        <div>
          <Profile></Profile>
          <LogoutButton></LogoutButton>
        </div>
      ) : (
        <LoginButton></LoginButton>
      )}
    </div>
  );
};

export default SignUp;

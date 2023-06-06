import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../styles/LogOutButton.css";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: "http://localhost:3000/signup" } })
      }
    >
      Log Out
    </button>
  );
};

export default LogoutButton;

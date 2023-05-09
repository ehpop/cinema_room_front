import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Reservations = () => {
  const { user } = useAuth0();

  return <div>Reservations</div>;
};

export default Reservations;

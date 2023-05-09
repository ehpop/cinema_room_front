import React from "react";
import "./styles/NavbarElement.css";

type Props = {
  children: React.ReactNode;
};

const NavbarElement = ({ children }: Props) => {
  return <div className="NavbarElement">{children}</div>;
};

export default NavbarElement;

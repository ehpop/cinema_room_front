import React from "react";
import "./styles/NavbarElement.css";

type Props = {
  children: React.ReactNode;
  selected?: boolean;
};

const NavbarElement = ({ children, selected }: Props) => {
  return (
    <div className={`${selected ? "selectedNavbarElement" : "NavbarElement"}`}>
      {children}
    </div>
  );
};

export default NavbarElement;

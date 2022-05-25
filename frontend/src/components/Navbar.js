import React, { useState } from "react";
import "../styles/NavbarStyle.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ alternativeStyling }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <div className={(alternativeStyling) ? "header" : "header fixed"}>
        <h1><a href="/" className={(alternativeStyling) ? "link alternative" : "link"}>ReSTATE.</a></h1>
      <ul className={click ? "Nav-menu active" : "Nav-menu"}>
        <li>   
        <a href="/" className={(alternativeStyling) ? "link alternative" : "link"}>Home</a>
        </li>
        <li>
        <a href="/LoginUser" className={(alternativeStyling) ? "link alternative" : "link"}>Login/Signup</a>        
        </li>
        <li>
        <a href="/Properties" className={(alternativeStyling) ? "link alternative" : "link"}>Properties</a>        
        </li>
        <li>
        <a href="/HouseTours" className={(alternativeStyling) ? "link alternative" : "link"}>Visites</a>        
        </li>
      </ul>
      <div className="icons" onClick={handleClick}>
        {click ? (
          <FaTimes size={30} style={{ color: "white" }} />
        ) : (
          <FaBars size={30} style={{ color: "white" }} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
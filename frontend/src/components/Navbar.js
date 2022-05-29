import React, { useState } from "react";
import "../styles/NavbarStyle.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ alternativeStyling }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const location = useLocation();
  const navigate = useNavigate();

  const navigateToHouseTours = () => {
    const fromWhere = location.state?.fromWhere?.pathname || "/HouseTours";
    navigate(fromWhere, { replace: true });
  }

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
        <a href="#" onClick={navigateToHouseTours} className={(alternativeStyling) ? "link alternative" : "link"}>Visites</a>        
        </li>
      </ul>
      <div className="icons" onClick={handleClick}>
        {click ? (
          <FaTimes size={30} style={{ color: "blue" }} />
        ) : (
          <FaBars size={30} style={{ color: "blue" }} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
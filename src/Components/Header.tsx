import { useState } from 'react';
import './Header.css'; // Optional
import {Link, NavLink} from "react-router-dom"


function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
    <nav className='nav'>
        <Link to="/" className="title" >Solidity.forum</Link>
        <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
         <ul className={menuOpen ? "open" : ""}>
            <li>
                <NavLink to="/about">About</NavLink>
            </li>
            <li>
                <NavLink to="/services">Services</NavLink>
            </li>
            <li>
                <NavLink to="/contact">Contact</NavLink>
            </li>
         </ul>
    </nav>
    </>
  );
}

export default Header;

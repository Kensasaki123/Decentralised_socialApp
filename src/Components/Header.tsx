import { useState, useEffect } from 'react';
import './Header.css';
import { Link, NavLink } from "react-router-dom"

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (menuOpen && !(e.target as Element).closest('.menu') && !(e.target as Element).closest('ul')) {
        setMenuOpen(false);
      }
    };
    
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [menuOpen]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav className='nav'>
        <Link to="/" className="title">
          <span className="neon-text">Solidity</span>
          <span className="forum-text">.forum</span>
        </Link>
        
        <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`menu-line ${menuOpen ? 'open' : ''}`}></span>
          <span className={`menu-line ${menuOpen ? 'open' : ''}`}></span>
          <span className={`menu-line ${menuOpen ? 'open' : ''}`}></span>
        </div>
         
         <ul className={menuOpen ? "open" : ""}>
            <li>
                <NavLink to="/about" className={({isActive}) => isActive ? "active" : ""}>
                  <span>About</span>
                </NavLink>
            </li>
            
            <li>
                <NavLink to="/contact" className={({isActive}) => isActive ? "active" : ""}>
                  <span>Contact</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/feed" className="cta-link">
                  <span>Admin Mode</span>
                </NavLink>
            </li>
         </ul>
      </nav>
    </header>
  );
}

export default Header;
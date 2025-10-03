import React from 'react';
import { Link } from 'react-scroll';
import './Navbar.css'; // Assuming you have a CSS file for styling

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">My Portfolio</h1>
        <ul className="nav-menu">
          <li>
            <Link to="home" smooth={true} duration={500}>Home</Link>
          </li>
          <li>
            <Link to="about" smooth={true} duration={500}>About</Link>
          </li>
          <li>
            <Link to="skills" smooth={true} duration={500}>Skills</Link>
          </li>
          <li>
            <Link to="projects" smooth={true} duration={500}>Projects</Link>
          </li>
          <li>
            <Link to="research" smooth={true} duration={500}>Research</Link>
          </li>
          <li>
            <Link to="timeline" smooth={true} duration={500}>Timeline</Link>
          </li>
          <li>
            <Link to="contact" smooth={true} duration={500}>Contact</Link>
          </li>
        </ul>
        <div className="mobile-menu-icon">
          {/* Icon for mobile menu */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

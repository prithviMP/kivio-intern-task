import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Social Welfare Program</h1>
      </div>
      <div className="navbar-right">
        <a href="#about">About</a>
        <a href="#donate">Donate</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;

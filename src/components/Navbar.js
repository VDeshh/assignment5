import React from 'react';
import './Navbar.css';

const Navbar = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <nav className="navbar">
         <ul className="navbar-links">
        <li>
          <a href="/" onClick={handleRefresh}>
            Home
          </a>
        </li>
      </ul>
      <div className="navbar-title">VDESH Inventory Management</div>
      <ul className="navbar-links">
        <li>
          <a href="/" onClick={handleRefresh}>
            AboutUs
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // We will create this file in the next step

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">My Happy Helper</Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/usecase" className="nav-link">Use Case</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
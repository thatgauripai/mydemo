import React from 'react'; 
// Importing React library to define and use React components

import { Link } from 'react-router-dom'; 
// Importing 'Link' component for client-side navigation without page reload

import './Navbar.css'; 
// Importing external CSS file to style this component

function Navbar() { 
  // Defining a functional component (stateless) in React
  return (
    <nav className="navbar"> 
      {/* 'nav' semantic HTML tag represents navigation links */}
      
      <Link to="/" className="navbar-brand">
        {/* 'Link' from react-router-dom for SPA navigation to home page */}
        My Happy Helper
      </Link>

      <ul className="navbar-nav">
        {/* 'ul' (unordered list) to group navigation items */}
        
        <li className="nav-item">
          {/* 'li' (list item) containing a navigation link */}
          <Link to="/" className="nav-link">
            {/* 'Link' navigates to root path '/' */}
            Home
          </Link>
        </li>

        <li className="nav-item">
          {/* Another navigation item */}
          <Link to="/usecase" className="nav-link">
            {/* Navigates to '/usecase' page without reloading */}
            Use Case
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar; 
// Exporting the component so it can be imported and used in other files

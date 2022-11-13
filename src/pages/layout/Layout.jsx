import React from 'react';
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout">
      <div className="header">
        <div className="logo"></div>
        <div className="nav-links">
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/admin">Profile</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
      <div className="container">
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout
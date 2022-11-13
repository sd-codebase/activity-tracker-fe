import React from 'react';
import { Outlet, Link } from "react-router-dom";
import Logout from '../../../components/logout/Logout';


const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <div className="side-nav">
        <div className="nav-links">
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/settings">Settings</Link>
          <Logout/>
        </div>
        <div className="container">
            <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
import React from 'react';
import { Outlet, Link, useRoute } from "react-router-dom";
import Logout from '../../../components/logout/Logout';
import { StorageService } from '../../../services/storage.service';


const userLayout = () => {
  
  return (
    <div className="user-layout">
      <div className="side-nav">
        <div className="nav-links">
          <Link to="/user">Dashboard</Link>
          <Link to="/user/add-activity">Add Activity</Link>
          <Link to="/user/activities">See Activities</Link>
          <Link to="/user/settings">Settings</Link>
          <Logout/>
        </div>
        <div className="container">
            <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default userLayout
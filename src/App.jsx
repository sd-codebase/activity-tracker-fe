import 'semantic-ui-css/semantic.min.css'
import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import NotFound from "./pages/not-found/NotFound";
import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import AdminLayout from "./pages/admin/layout/AdminLayout";
import AdminDashboard from "./pages/admin/dashboard/Dashboard";
import AdminSettings from "./pages/admin/settings/Settings";
import Uom from './pages/admin/uoms/Uom';
import Options from './pages/admin/options/Options';
import Forms from './pages/admin/forms/Forms';

import UserLayout from "./pages/user/layout/UserLayout";
import UserDashboard from "./pages/user/dashboard/UserDashboard";
import RecordActivity from "./pages/user/record-activity/RecordActivity";
import SeeActivities from "./pages/user/see-activities/SeeActivities";
import ViewActivity from "./pages/user/view-activity/ViewActivity";
import UserSettings from "./pages/user/settings/UserSettings";


function getToken() {
  const token = localStorage.getItem('token');
  return token || false;
}

function getIsAdmin() {
  const isAdmin = localStorage.getItem('isAdmin');
  return isAdmin || false;
}


function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsAuthorized(token ? true : false);

    const isAdmin = getIsAdmin();
    setIsAdmin(isAdmin ? true : false);
  }, [])
  

  if (!isAuthorized) {
    return (<Login setIsAuthorized={setIsAuthorized} setIsAdmin={setIsAdmin}/>);
  }
  return (
    <Router>
      <Routes>
        <Route path='/' element={!isAdmin ? <Navigate to="/user" replace={true} /> : <Navigate to="/admin" replace={true} />}></Route>
        <Route path="/user" element={!isAdmin ? <UserLayout /> : <Navigate to="/admin" replace={true} />}>
          <Route index element={<UserDashboard />} />
          <Route path='/user/add-activity' element={<RecordActivity />} />
          <Route path='/user/activities' element={<SeeActivities />} />
          <Route path='/user/settings' element={<UserSettings />} />
          <Route path='/user/activity' element={<ViewActivity />} />
          <Route path='/user/*' element={<NotFound/>}></Route>
        </Route>
        <Route path="/admin" element={isAdmin ? <AdminLayout /> : <Navigate to="/user" replace={true} />}>
          <Route index element={<AdminDashboard />} />
          <Route path='/admin/uoms' element={<Uom />} />
          <Route path='/admin/options' element={<Options />} />
          <Route path='/admin/forms' element={<Forms />} />
          <Route path='/admin/settings' element={<AdminSettings />} />
          <Route path='/admin/*' element={<NotFound/>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

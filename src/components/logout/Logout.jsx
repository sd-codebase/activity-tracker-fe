import React from 'react'
import { StorageService } from '../../services/storage.service';
import { useNavigate } from "react-router-dom";

const Logout = ({children}) => {
    const navigate = useNavigate();
  const exitApp = () => {
    StorageService.removeItem('token');
    StorageService.removeItem('isAdmin');
    window.location.reload(false);
  }
  return (
    <>
        <div onClick={exitApp}>
          {children}
        </div>
    </>
  )
};

export default Logout
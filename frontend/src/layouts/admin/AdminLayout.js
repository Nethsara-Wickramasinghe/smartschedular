import React from 'react';
import { Outlet } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Sidebar from '../../components/admin/Sidebar';
import TopBar from '../../components/admin/TopBar';

const drawerWidth = 240;

const AdminLayout = () => {
  return (
    <div>
      <CssBaseline />
      <TopBar />
      <Sidebar />
      <main style={{ marginLeft: drawerWidth, padding: '80px 20px 20px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
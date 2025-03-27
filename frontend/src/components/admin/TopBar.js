import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const TopBar = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: 1201, backgroundColor: '#1976d2' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Smart Scheduler Admin
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Dashboard, Schedule, Grade, Group, Person, Room, Book, People } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/admin' },
    { text: 'View Timetable', icon: <Schedule />, path: '/admin/view-timetable' },
    { text: 'Add Grade', icon: <Grade />, path: '/admin/add-grade' },
    { text: 'View Grade', icon: <Grade />, path: '/admin/view-grade' },
    { text: 'Add Batch', icon: <Group />, path: '/admin/add-batch' },
    { text: 'View Batch', icon: <Group />, path: '/admin/view-batch' },
    { text: 'Add Teacher', icon: <Person />, path: '/admin/add-teacher' },
    { text: 'View Teacher', icon: <Person />, path: '/admin/view-teacher' },
    { text: 'Add Venue', icon: <Room />, path: '/admin/add-venue' },
    { text: 'View Venue', icon: <Room />, path: '/admin/view-venue' },
    { text: 'Add Course', icon: <Book />, path: '/admin/add-course' },
    { text: 'View Course', icon: <Book />, path: '/admin/view-course' },
    { text: 'View Student', icon: <People />, path: '/admin/view-student' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#1976d2', color: '#fff' },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path} sx={{ '&:hover': { backgroundColor: '#1565c0' } }}>
            <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
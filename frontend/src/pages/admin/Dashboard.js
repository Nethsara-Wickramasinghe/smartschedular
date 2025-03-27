import React from 'react';
import { Typography, Grid, Card, CardContent, CardHeader } from '@mui/material';
import { School, People, Room, Book } from '@mui/icons-material';

const Dashboard = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>Dashboard Overview</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#e3f2fd' }}>
            <CardHeader title="Grades" avatar={<School />} />
            <CardContent>
              <Typography variant="h5">12</Typography>
              <Typography>Total Grades</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#f1f8e9' }}>
            <CardHeader title="Teachers" avatar={<People />} />
            <CardContent>
              <Typography variant="h5">25</Typography>
              <Typography>Total Teachers</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#ffebee' }}>
            <CardHeader title="Venues" avatar={<Room />} />
            <CardContent>
              <Typography variant="h5">8</Typography>
              <Typography>Total Venues</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#e0f7fa' }}>
            <CardHeader title="Courses" avatar={<Book />} />
            <CardContent>
              <Typography variant="h5">15</Typography>
              <Typography>Total Courses</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
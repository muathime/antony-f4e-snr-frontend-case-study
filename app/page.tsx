import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import StudentListPage from './src/pages/StudentListPage';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <Grid container alignItems="center" spacing={4}>
        <Grid item xs={8}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', marginLeft: '10px' }}>
            Students
          </Typography>
        </Grid>
        <Grid item xs={4} container justifyContent="flex-end">
          <img src="/logo.png" alt="logo" style={{ width: '150px', marginRight: '10px'}} />
        </Grid>
      </Grid>
      <StudentListPage />
    </div>
  );
};

export default Home;

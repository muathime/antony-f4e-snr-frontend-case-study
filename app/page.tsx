"use client";

import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import StudentListPage from "./src/pages/StudentListPage";
import Footer from "./src/components/Footer";
import Loader from "./src/components/Loader";

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <Grid container alignItems="center" spacing={4}>
        <Grid item xs={8}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: "bold", marginLeft: "10px" }}
          >
            Students Listing
          </Typography>
        </Grid>
        <Grid item xs={4} container justifyContent="flex-end">
          <img
            src="/logo.png"
            alt="logo"
            style={{ width: "150px", marginRight: "10px" }}
          />
        </Grid>
      </Grid>
      {loading ? <Loader /> : <StudentListPage />}
      <Footer />
    </div>
  );
};

export default Home;

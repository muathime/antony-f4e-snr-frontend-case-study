"use client";

import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "black",
        color: "white",
        py: 2,
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        right: 0,
        left: 0,
      }}
    >
      <Typography variant="body2" sx={{ color: "#ff6900" }}>
        {" "}
        Antony &copy; {currentYear} - Senior Frontend Engineer Case Study.
      </Typography>
    </Box>
  );
};

export default Footer;

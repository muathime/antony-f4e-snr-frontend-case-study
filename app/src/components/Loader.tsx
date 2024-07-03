import React from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "transparent",
        flexDirection: "column",
      }}
    >
      <Image src="/loader.png" alt="loader" width={100} height={100} />
      <CircularProgress sx={{ color: "#ff6900", mt: 2 }} />
    </Box>
  );
};

export default Loader;

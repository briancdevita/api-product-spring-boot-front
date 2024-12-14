"use client";

import { Box, Typography } from "@mui/material";
import { Navbar } from "@/components/Navbar";
import { ProductManagement } from "@/components/ProductManagement";
import { homeStyles } from "@/styles/HomeStyles";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Box sx={homeStyles.mainContainer}>
        <Typography variant="h4" sx={homeStyles.title}>
          Gestión de Productos
        </Typography>
        <ProductManagement />
      </Box>
    </>
  );
}
